import { useState } from "react";
import { Cross2Icon } from "@modulz/radix-icons";
import Tooltip from "./tooltip";
import { User } from "../types/common";
import { getByUsername, publishUser } from "../utils/exports";
import { deleteValue } from "../utils/supabase";

interface IProps {
  stat: keyof User;
  user: User;
  hidden: any[];
  setHidden: any;
}

function Hide({ stat, user, hidden, setHidden }: IProps) {
  // Toggle hide
  function toggleHide() {
    // Add stat to hidden array
    setHidden([...hidden, stat]);

    // Check if user's data is already written to Supabase
    let checkUser = getByUsername(user.username);
    if (checkUser) {
      // Retake screenshot for link preview
      //publishUser(user);
      deleteValue("users", stat, user.username);
    }
  }

  return (
    <div>
      <Tooltip content="Hide">
        <button
          className="p-2 hover:bg-gray-800/90 text-gray-100 rounded focus:outline-none"
          onClick={toggleHide}
        >
          <Cross2Icon />
        </button>
      </Tooltip>
    </div>
  );
}

export default Hide;
