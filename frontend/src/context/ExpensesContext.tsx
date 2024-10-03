import {
  useState,
  createContext,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { AuthContext } from "./AuthContext";
import useFetch from "../hooks/useFetch";
import { useLocation } from "react-router-dom";

type ExpenseType = {
  _id: string;
  icon: string;
  name: string;
  date: string;
  value: number;
  type?: string;
};

export type ExpensesContextType = {
  expenses: ExpenseType[];
  setExpenses: React.Dispatch<React.SetStateAction<ExpenseType[]>>;
  isLoading: boolean;
};

export const ExpenseContext = createContext<ExpensesContextType | undefined>(
  undefined
);

type ExpensesContextProviderType = {
  children: ReactNode;
};

const ExpenseContextProvider: React.FC<ExpensesContextProviderType> = ({
  children,
}) => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useContext must be used within an AuthContextProvider");
  }
  const { user } = authContext;
  const location = useLocation();
  const [expenses, setExpenses] = useState<ExpenseType[]>([]);
  const [apiUrl, setApiUrl] = useState<string | null>(null);

  useEffect(() => {
    if (user && location.pathname === "/menu/expenses") {
      setApiUrl(`http://localhost:8080/${user.id}/expenses?year=2024&month=05`);
    }
  }, [user, location.pathname]);

  //*use the custom hook to get the data
  const { apiData, isLoading } = useFetch<ExpenseType[]>(apiUrl && apiUrl);
  //*Set the expenses
  useEffect(() => {
    if (apiData) {
      setExpenses(apiData);
    }
  }, [apiData]);

  return (
    <ExpenseContext.Provider value={{ expenses, setExpenses, isLoading }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContextProvider;
