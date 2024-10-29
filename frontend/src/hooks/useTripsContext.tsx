import { useContext } from "react";
import { TripsContext, TripsContextType } from "../context/TripsContext";

const useTripsContext = (): TripsContextType => {
  const tripsContext = useContext(TripsContext);
  if (!tripsContext) {
    throw new Error("useContext must be used withing TripsContextProvider");
  }
  return tripsContext;
};

export default useTripsContext;
