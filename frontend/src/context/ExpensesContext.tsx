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
export type ExpensDateType = {
  month: number;
  year: string;
};

export type ExpensesContextType = {
  expenses: ExpenseType[];
  setExpenses: React.Dispatch<React.SetStateAction<ExpenseType[]>>;
  expenseDate: ExpensDateType;
  setExpenseDate: React.Dispatch<React.SetStateAction<ExpensDateType>>;
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

  //* getting dates for the expenses
  const date = moment();
  const [expenseDate, setExpenseDate] = useState<ExpensDateType>({
    month: Number(date.format("MM")),
    year: date.format("YYYY"),
  });
  console.log(expenseDate);

  const [apiUrl, setApiUrl] = useState<string | null>(null);

  //*Reset the month/year back to today's month/year when user login/logout
  useEffect(() => {
    if (user) {
      const currentDate = moment();
      setExpenseDate({
        month: Number(currentDate.format("MM")),
        year: currentDate.format("YYYY"),
      });
    }
  }, [user]);

  useEffect(() => {
    if (user && location.pathname === "/menu/expenses") {
      setApiUrl(
        `http://localhost:8080/${user.id}/expenses?order=desc&year=${expenseDate.year}&month=${expenseDate.month}`
      );
    }
  }, [user, location.pathname, expenseDate]);

  //*use the custom hook to get the data
  const { apiData, isLoading } = useFetch<ExpenseType[]>(apiUrl && apiUrl);
  //*Set the expenses
  useEffect(() => {
    if (apiData) {
      setExpenses(apiData);
    }
  }, [apiData]);

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        setExpenses,
        expenseDate,
        setExpenseDate,
        isLoading,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContextProvider;
