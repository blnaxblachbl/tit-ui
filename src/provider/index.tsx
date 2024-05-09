import React, {
  createContext,
  useReducer,
  useContext,
  useCallback,
  Reducer,
} from "react";

import { functions } from "./functions";
import { ProviderProps, Partial, Action } from "./types";

const Context = createContext({});

export * from "./types";

export const Provider = <TState extends object, TAction = Action>({
  initValue,
  children,
  customReducer,
}: ProviderProps<TState, TAction>) => {
  const reducer = useReducer<Reducer<TState, TAction>>(
    (state, action) => {
      if (
        (action as Action).type === "TIT_UI_SET_DESCRIBED_STATE" ||
        (action as Action).type === "TIT_UI_SET_STATE"
      ) {
        return functions(state, action as Action);
      }
      if (customReducer) {
        return customReducer(state, action);
      }
      return state;
    },
    initValue ? initValue : ({} as TState)
  );

  return <Context.Provider value={reducer}>{children}</Context.Provider>;
};

export const useCustomDispatch = useCallback(<T,>(type: string) => {
  const [_, dispatch] = useContext<any>(Context);
  const callDispathcFuncion = (data: T) => {
    dispatch({
      type,
      data,
    });
  };
  return callDispathcFuncion;
}, []);

export const useStateValue = useCallback(<T,>(): [
  T,
  (data: Partial<T> | T) => void
] => {
  const [state, dispatch] = useContext<any>(Context);

  const setState = (value: Partial<T>): void => {
    dispatch({
      type: "TIT_UI_SET_STATE",
      data: value,
    });
  };

  return [state, setState];
}, []);
