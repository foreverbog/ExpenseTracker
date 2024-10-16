import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ExpenseType } from "./ExpensesGrid";

type ExpenseEditModalProps = {
  expense: ExpenseType;
  isEditExpenseOpen: boolean;
  setIsEditExpenseOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ExpenseEditModal: React.FC<ExpenseEditModalProps> = ({
  expense,
  isEditExpenseOpen,
  setIsEditExpenseOpen,
}) => {
  const editModal = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (editModal.current && !editModal.current.contains(e.target as Node)) {
        setIsEditExpenseOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsEditExpenseOpen]);

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black opacity-60"></div>
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 z-50 "
        initial={{ width: "40px" }}
        animate={{ width: "350px" }}
        transition={{ duration: 0.5 }}
        exit={{ width: "20px", transition: { duration: 0.5, delay: 0.4 } }}
        ref={editModal}
      >
        <motion.div
          className="flex flex-col "
          initial={{ height: "40px" }}
          animate={{ height: "400px" }}
          exit={{ height: "40px", transition: { duration: 0.3 } }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.p className="bg-green-300">{expense.icon}</motion.p>
          <motion.p className="bg-green-300">{expense.name}</motion.p>
          <motion.p className="bg-green-300">{expense.value}</motion.p>
          <motion.p className="bg-green-300">{expense.date}</motion.p>
        </motion.div>
      </motion.div>
    </>
  );
};

export default ExpenseEditModal;
