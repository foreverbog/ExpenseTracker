import {
  useState,
  createContext,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { ExpenseType } from "../components/ExpensesGrid";
import useFetch from "../hooks/useFetch";
import { AuthContext } from "./AuthContext";

type TripType = {
  _id: string;
  image: string;
  name: string;
  roundTrip: boolean;
  roundTripCost?: number;
  startDate: string;
  endDate: string;
  description?: string;
  expenses?: ExpenseType[];
};

export type TripsContextType = {
  trips: TripType[];
  isLoading: boolean;
};

export const TripsContext = createContext<TripsContextType | undefined>(
  undefined
);

type TripsContextProviderProps = {
  children: ReactNode;
};

const TripsContextProvider: React.FC<TripsContextProviderProps> = ({
  children,
}) => {
  const [trips, setTrips] = useState<TripType[]>([]);

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useContext must be used withing AuthContextProvider");
  }
  const deployedUrl = "https://extr-backend.onrender.com";

  const { user } = authContext;

  const { apiData, isLoading } = useFetch<TripsContextType>(
    `${deployedUrl}/${user.id}`
  );

  useEffect(() => {
    if (apiData) {
      setTrips(apiData.trips);
    }
  }, [apiData]);
  // console.log(trips);

  return (
    <TripsContext.Provider value={{ trips, isLoading }}>
      {children}
    </TripsContext.Provider>
  );
};

export default TripsContextProvider;
