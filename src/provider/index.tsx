import React, { createContext, useReducer, useContext } from "react";

import { functions } from "./functions";
import { ProviderProps, Readucer, Partial } from "./types";

const Context = createContext({});

export * from "./types";

export const Provider = <T,>({ initValue, children }: ProviderProps<T>) => {
  const reducer: Readucer = useReducer(functions, initValue ? initValue : {});

  return <Context.Provider value={reducer}>{children}</Context.Provider>;
};

export const useStateValue = <T,>(): [T, (data: Partial<T>) => void] => {
  const [state, dispatch] = useContext<any>(Context);

  const setState = (data: Partial<T>): void => {
    dispatch({
      type: "setState",
      data,
    });
  };

  return [state, setState];
};
