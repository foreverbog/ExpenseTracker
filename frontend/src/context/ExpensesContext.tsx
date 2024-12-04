import {
  useState,
  createContext,
  useEffect,
  useContext,
  ReactNode,
  useMemo,
} from "react";
import { AuthContext } from "./AuthContext";
import useFetch from "../hooks/useFetch";
import { useLocation } from "react-router-dom";
import moment from "moment";

//*Expense type
type ExpenseType = {
  _id: string;
  icon: string;
  name: string;
  date: string;
  value: number;
  type?: string;
};

//*Expense Date Type
export type ExpensQueriesType = {
  sortBy?: "value" | "date";
  type?: "" | "monthly" | "yearly";
  order?: "asc" | "desc";
  month: number;
  year: string;
};

export type ExpensesContextType = {
  expenses: ExpenseType[];
  setExpenses: React.Dispatch<React.SetStateAction<ExpenseType[]>>;
  expenseQueries: ExpensQueriesType;
  setExpenseQueries: React.Dispatch<React.SetStateAction<ExpensQueriesType>>;
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
  const API_URL: string = import.meta.env.VITE_API_SERVER;

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useContext must be used within an AuthContextProvider");
  }

  const { user } = authContext;
  const location = useLocation();
  const [expenses, setExpenses] = useState<ExpenseType[]>([]);

  const currentDate = useMemo(() => moment(), []);

  //* getting dates for the expenses

  const [expenseQueries, setExpenseQueries] = useState<ExpensQueriesType>({
    type: "",
    order: "desc",
    month: Number(currentDate.format("MM")),
    year: currentDate.format("YYYY").toString(),
    sortBy: "date",
  });

  // console.log(expenseQueries);

  const [apiUrl, setApiUrl] = useState<string | null>(null);

  //*Reset the month/year back to today's month/year when user login/logout
  useEffect(() => {
    if (user) {
      setExpenseQueries((prev) => ({
        ...prev,
        type: "",
        month: Number(currentDate.format("MM")),
        year: currentDate.format("YYYY").toString(),
      }));
    }
  }, [user, currentDate]);

  useEffect(() => {
    if (user && location.pathname === "/menu/expenses") {
      if (expenseQueries.type === "monthly") {
        if (
          expenseQueries.sortBy === "value" ||
          expenseQueries.sortBy === "date"
        ) {
          setApiUrl(
            `${API_URL}/${user.id}/expenses?sortBy=${expenseQueries.sortBy}&type=${expenseQueries.type}&order=${expenseQueries.order}&year=${expenseQueries.year}`
          );
        } else
          setApiUrl(
            `${API_URL}/${user.id}/expenses?type=${expenseQueries.type}&order=${expenseQueries.order}&year=${expenseQueries.year}`
          );
      } else if (expenseQueries.type === "yearly") {
        setApiUrl(
          `${API_URL}/${user.id}/expenses?sortBy=${expenseQueries.sortBy}&type=${expenseQueries.type}&order=${expenseQueries.order}&year=${expenseQueries.year}`
        );
      } else if (expenseQueries.sortBy === "value") {
        setApiUrl(
          `${API_URL}/${user.id}/expenses?sortBy=${expenseQueries.sortBy}&type=${expenseQueries.type}&order=${expenseQueries.order}&year=${expenseQueries.year}&month=${expenseQueries.month}`
        );
      } else
        setApiUrl(
          `${API_URL}/${user.id}/expenses?sortBy=${expenseQueries.sortBy}&type=${expenseQueries.type}&order=${expenseQueries.order}&year=${expenseQueries.year}&month=${expenseQueries.month}`
        );
    }
  }, [user, location.pathname, expenseQueries, API_URL]);

  //*use the custom hook to get the data
  const { apiData, isLoading } = useFetch<ExpenseType[]>(apiUrl && apiUrl);
  //*Set the expenses
  useEffect(() => {
    if (apiData && user) {
      setExpenses(apiData);
    }
  }, [apiData, user]);

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        setExpenses,
        expenseQueries,
        setExpenseQueries,
        isLoading,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContextProvider;
