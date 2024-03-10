export const functions = (state: any, action: any) => {
  if (action.type === "setState" && action.data) {
    return {
      ...state,
      ...action.data,
    };
  }
  return state;
};
