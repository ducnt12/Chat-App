import { Dispatch, SetStateAction } from "react";

// User
export interface StateAction<T> {
  set: Dispatch<SetStateAction<T>>;
}

export interface User {
  username: string | null;
  avatar?: string;
}

//Chat
export interface Chat {
  msg: string;
  sender: User;
}
