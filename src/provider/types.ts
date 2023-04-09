import {ReactNode, Dispatch} from 'react';

export type ProviderProps<TInitValueType> = {
  initValue?: TInitValueType;
  children: ReactNode;
};

export type Readucer = [any, Dispatch<any>];

export type Partial<T> = {
  [P in keyof T]?: T[P];
};
