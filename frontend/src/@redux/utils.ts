import { REHYDRATE } from "redux-persist";
import type { RootState } from "./store";
import type { Action } from "@reduxjs/toolkit";

const isHydrateAction = (
  action: Action,
): action is Action<typeof REHYDRATE> & {
  key: string;
  payload: RootState;
  err: unknown;
} => {
  return action.type === REHYDRATE;
};

export { isHydrateAction };
