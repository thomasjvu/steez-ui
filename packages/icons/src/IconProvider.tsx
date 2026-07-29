import React, { createContext, useContext } from "react";

interface IconProviderValue {
  size: number;
  strokeWidth: number;
}

const DEFAULT_VALUE: IconProviderValue = {
  size: 16,
  strokeWidth: 2,
};

const IconProviderContext = createContext<IconProviderValue>(DEFAULT_VALUE);

export interface SteezIconProviderProps {
  size?: number;
  strokeWidth?: number;
  children: React.ReactNode;
}

export function SteezIconProvider({
  size = DEFAULT_VALUE.size,
  strokeWidth = DEFAULT_VALUE.strokeWidth,
  children,
}: SteezIconProviderProps) {
  return (
    <IconProviderContext.Provider value={{ size, strokeWidth }}>
      {children}
    </IconProviderContext.Provider>
  );
}

export function useSteezIconDefaults() {
  return useContext(IconProviderContext);
}

