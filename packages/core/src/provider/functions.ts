import { Action } from "./types";

export const functions = (state: any, action: Action) => {
  switch (action.type) {
    case "TIT_UI_SET_STATE": {
      return {
        ...(state || {}),
        ...(action.data || {}),
      };
    }
    default:
      return state;
  }
};
