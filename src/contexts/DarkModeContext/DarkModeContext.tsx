import { default as React, FC, createContext } from "react";

type DarkModeContextValue = {
  isDark: boolean;
};
export const DarkModeContext = createContext({} as DarkModeContextValue);

interface DarkModeContextProviderProps {
  children?: React.ReactNode;
}
const contextValue: DarkModeContextValue = { isDark: false };

export const DarkModeContextProvider: FC<DarkModeContextProviderProps> = ({
  children,
}) => {
  return (
    <DarkModeContext.Provider value={contextValue}>
      {children}
    </DarkModeContext.Provider>
  );
};
