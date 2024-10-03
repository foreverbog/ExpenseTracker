import { useContext } from "react";
import { ExpenseContext } from "../context/ExpensesContext";
import { ExpensesContextType } from "../context/ExpensesContext";

export const useExpensesContext = (): ExpensesContextType => {
  const expenseContext = useContext(ExpenseContext);
  if (!expenseContext) {
    throw new Error(
      "useExpensesContext must be used withing ExpenseContextProvider"
    );
  }
  return expenseContext;
};
