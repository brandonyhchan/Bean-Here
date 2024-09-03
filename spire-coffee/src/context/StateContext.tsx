import { Level } from "@/config/FilterItems";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface StateContextType {
  noiseFilter: Level | undefined;
  setNoiseFilter: React.Dispatch<React.SetStateAction<Level | undefined>>;
  busynessFilter: Level | undefined;
  setBusynessFilter: React.Dispatch<React.SetStateAction<Level | undefined>>;
  priceFilters: Level[];
  setPriceFilters: React.Dispatch<React.SetStateAction<Level[]>>;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export const StateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [noiseFilter, setNoiseFilter] = useState<Level | undefined>();
  const [busynessFilter, setBusynessFilter] = useState<Level | undefined>();
  const [priceFilters, setPriceFilters] = useState<Level[]>([]);

  const contextValue: StateContextType = {
    noiseFilter,
    setNoiseFilter,
    busynessFilter,
    setBusynessFilter,
    priceFilters,
    setPriceFilters,
  };

  return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  );
};

export const useGlobalStateManager = (): StateContextType => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("StateContext must be used within StateProvider");
  }
  return context;
};
