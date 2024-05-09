import { ReactNode, Dispatch } from "react";

export type ProviderProps<TInitValueType, TAction> = {
  initValue?: TInitValueType;
  children: ReactNode;
  customReducer?: (state: TInitValueType, action: TAction) => TInitValueType;
};

export type Action = { type: string; data: any };

export type Readucer<T> = [T, Dispatch<Action>];

export type Partial<T> = {
  [P in keyof T]?: T[P];
};
