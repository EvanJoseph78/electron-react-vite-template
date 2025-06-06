import { createContext, useContext, useState, type ReactNode } from "react";

type StateStore = {
  [key: string]: any;
};

interface StateContextType {
  state: StateStore;
  setState: <T>(key: string, value: T) => void;
  getState: <T>(key: string) => T | undefined;
  resetState: (key: string) => void;
  clearAll: () => void;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export const StateProvider = ({ children }: { children: ReactNode }) => {
  const [state, setInternalState] = useState<StateStore>({});

  const setState = <T,>(key: string, value: T) => {
    setInternalState((prev) => ({ ...prev, [key]: value }));
  };

  const getState = <T,>(key: string): T | undefined => {
    return state[key];
  };

  const resetState = (key: string) => {
    setInternalState((prev) => {
      const { [key]: _, ...rest } = prev;
      return rest;
    });
  };

  const clearAll = () => {
    setInternalState({});
  };

  return (
    <StateContext.Provider
      value={{ state, setState, getState, resetState, clearAll }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useSharedState = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useSharedState must be used within a StateProvider");
  }
  return context;
};
