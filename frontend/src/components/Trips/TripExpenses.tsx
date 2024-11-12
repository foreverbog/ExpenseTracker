import { motion } from "framer-motion";
import { TripType } from "./TripsContainer";
import AddBtn from "../Common/AddBtn";
import { IoIosArrowBack } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { FaRegEdit } from "react-icons/fa";

type TripExpensesProps = {
  trip: TripType | undefined;
  setIsTripExpenseOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type ExpenseDetails = {
  id: string;
  name: string;
  price: "" | number;
};

const TripExpenses: React.FC<TripExpensesProps> = ({
  trip,
  setIsTripExpenseOpen,
}) => {
  const [isExpenseDetailOpen, setIsExpenseDetailOpen] = useState(false);
  const [expenseDetails, setExpenseDetails] = useState<ExpenseDetails>({
    id: "",
    name: "",
    price: "",
  });

  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef && !modalRef.current?.contains(e.target as Node)) {
        setExpenseDetails({ id: "", name: "", price: "" });
        setIsExpenseDetailOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setExpenseDetails]);

  console.log(expenseDetails);

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
      {/* <div className="self-end">Add Btn</div>
       */}
      <AddBtn
        btnText="add"
        className="self-end"
        textClassName="md:hidden"
        setIsModalOpen={setIsExpenseDetailOpen}
      />
      {/* //*GRID FOR EXPENSES */}
      <div
        style={{ scrollbarWidth: "thin" }}
        className="grid grid-cols-1 border max-h-[300px] overflow-y-scroll drop-shadow-md"
      >
        <div className="grid grid-cols-2 bg-primary-lighter text-primary-text sticky top-0 right-0 left-0  divide-x text-center w-full">
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

      {/*//*MODAL FOR EXPENSE DETAIL */}
      {isExpenseDetailOpen && (
        <>
          <div className="inset-0 bg-black opacity-20 backdrop-blur-xl fixed rounded-md "></div>
          <div
            ref={modalRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-base rounded-md border-base-300 border drop-shadow-2xl"
          >
            <p>{expenseDetails.name}</p>
            <p>{expenseDetails.price}</p>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default TripExpenses;
