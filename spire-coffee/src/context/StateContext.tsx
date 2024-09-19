import { Level } from "@/config/FilterItems";
import { useMediaQuery, useTheme } from "@mui/material";
import React, { createContext, ReactNode, useContext, useState } from "react";
import Navbar from "../component/Navbar";
import { useAuth } from "../context/AuthContext";
import { userCoords } from "@/types/cafe";

interface StateContextType {
  noiseFilter: Level | undefined;
  setNoiseFilter: React.Dispatch<React.SetStateAction<Level | undefined>>;
  busynessFilter: Level | undefined;
  setBusynessFilter: React.Dispatch<React.SetStateAction<Level | undefined>>;
  priceFilters: Level[];
  setPriceFilters: React.Dispatch<React.SetStateAction<Level[]>>;
  showFilterSidebar: boolean;
  setShowFilterSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  isSmallScreen: boolean;
  isAuthenticated: boolean;
  userLocation: userCoords | undefined;
  setUserLocation: React.Dispatch<React.SetStateAction<userCoords | undefined>>;
  distanceFilterValue: number | undefined;
  setDistanceFilterValue: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export const StateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [noiseFilter, setNoiseFilter] = useState<Level | undefined>();
  const [busynessFilter, setBusynessFilter] = useState<Level | undefined>();
  const [priceFilters, setPriceFilters] = useState<Level[]>([]);
  const [showFilterSidebar, setShowFilterSidebar] = useState<boolean>(false);
  const [userLocation, setUserLocation] = useState<userCoords | undefined>(
    undefined
  );
  const [distanceFilterValue, setDistanceFilterValue] = useState<
    number | undefined
  >(undefined);

  const contextValue: StateContextType = {
    noiseFilter,
    setNoiseFilter,
    busynessFilter,
    setBusynessFilter,
    priceFilters,
    setPriceFilters,
    showFilterSidebar,
    setShowFilterSidebar,
    isSmallScreen,
    isAuthenticated,
    userLocation,
    setUserLocation,
    distanceFilterValue,
    setDistanceFilterValue,
  };

  return (
    <StateContext.Provider value={contextValue}>
      <Navbar isAuthenticated={isAuthenticated} />
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
