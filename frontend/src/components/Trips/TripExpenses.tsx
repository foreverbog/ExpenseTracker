import { AnimatePresence, motion } from "framer-motion";
import { TripType } from "./TripsContainer";
import AddBtn from "../Common/AddBtn";
import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";

import TripExpenseCreator from "./TripExpenseModal";

type TripExpensesProps = {
  trip: TripType | undefined;
  setTrip: React.Dispatch<React.SetStateAction<TripType | undefined>>;
  setIsTripExpenseOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type ExpenseDetails = {
  id: string;
  name: string;
  price: "" | number;
};

const TripExpenses: React.FC<TripExpensesProps> = ({
  trip,
  setTrip,
  setIsTripExpenseOpen,
}) => {
  const [isAddExpense, setIsAddExpense] = useState(false);
  const [isExpenseDetailOpen, setIsExpenseDetailOpen] = useState(false);
  const [expenseDetails, setExpenseDetails] = useState<ExpenseDetails>({
    id: "",
    name: "",
    price: "",
  });

  console.log(isAddExpense);

  return (
    <motion.div
      className="relative flex flex-col gap-4  rounded-md w-[270px] md:w-[500px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 100 }}
    >
      {/* //*Back To trip Detail BTN */}
      <div
        onClick={() => setIsTripExpenseOpen(false)}
        className="text-base-text rounded-md w-2/3 text-xs flex gap-1  items-center hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"
      >
        <IoIosArrowBack className="text-xl" />
        <p>Back To Trip Details</p>
      </div>
      <div className="text-center text-xl md:text-2xl font-semibold mt-8 truncate">
        {trip?.name} Expenses:
      </div>
      <button className="self-end" onClick={() => setIsAddExpense(true)}>
        <AddBtn
          btnText="add"
          className="self-end"
          textClassName="md:hidden"
          setIsModalOpen={setIsExpenseDetailOpen}
        />
      </button>
      {/* //*GRID FOR EXPENSES */}
      <div
        style={{ scrollbarWidth: "thin" }}
        className="grid grid-cols-1 border max-h-[300px] overflow-y-scroll drop-shadow-md"
      >
        <div className="grid grid-cols-2 bg-primary-lighter text-primary-text sticky top-0 right-0 left-0  divide-x text-center w-full z-10">
          <div className="p-1.5">Name</div>
          <div className="p-1.5">Price</div>
        </div>

        {trip?.expenses && trip.expenses.length < 1 ? (
          <div className="h-[150px] flex justify-center items-center text-xl">
            No expenses found! Start by adding
          </div>
        ) : (
          trip?.expenses?.map((expense) => (
            <div
              onClick={() =>
                setExpenseDetails({
                  id: expense._id,
                  name: expense.name,
                  price: expense.value,
                })
              }
              key={expense._id}
              className="relative grid grid-cols-2 w-full divide-x even:bg-base odd:bg-base-100 text-center text-base-text font-base group overflow-hidden"
            >
              <div
                onClick={() => {
                  setExpenseDetails({
                    id: expense._id,
                    name: expense.name,
                    price: expense.value,
                  });
                  setIsExpenseDetailOpen(true);
                }}
                className="absolute w-full h-full hover:bg-base-300  hover:cursor-pointer opacity-60 group flex justify-center items-center"
              >
                <div className="hidden group-hover:block text-xl text-primary">
                  <FaRegEdit />
                </div>
              </div>
              <div className="truncate overflow-hidden p-1.5">
                {expense.name}
              </div>
              <div className="truncate overflow-hidden p-1.5">
                {expense.value} $
              </div>
            </div>
          ))
        )}
      </div>

      {/*//*MODAL FOR Creating Expense */}
      <AnimatePresence>
        {isExpenseDetailOpen && (
          <TripExpenseCreator
            trip={trip}
            setTrip={setTrip}
            expenseDetails={expenseDetails}
            setExpenseDetails={setExpenseDetails}
            setIsExpenseDetailOpen={setIsExpenseDetailOpen}
            isAddExpense={isAddExpense}
            setIsAddExpense={setIsAddExpense}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TripExpenses;
