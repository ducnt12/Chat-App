import { Dispatch, SetStateAction } from "react";

export interface StateAction<T> {
  set: Dispatch<SetStateAction<T>>;
}
