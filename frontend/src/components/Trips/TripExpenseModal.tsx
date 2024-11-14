import { motion } from "framer-motion";
import usePost from "../../hooks/usePost";
import { useTranslation } from "react-i18next";
import { useContext, useRef, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import useTripsContext from "../../hooks/useTripsContext";
import Loading from "../Loading/Loading";
import AddBtn from "../Common/AddBtn";
import { TripType } from "./TripsContainer";
import { ExpenseDetails } from "./TripExpenses";
import moment from "moment";
import { FaRegSave } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import usePut from "../../hooks/usePut";
import useDelete from "../../hooks/useDelete";

type TripExpenseCreatorProps = {
  trip: TripType | undefined;
  setTrip: React.Dispatch<React.SetStateAction<TripType | undefined>>;
  expenseDetails: ExpenseDetails;
  setExpenseDetails: React.Dispatch<React.SetStateAction<ExpenseDetails>>;
  setIsExpenseDetailOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAddExpense: boolean;
  setIsAddExpense: React.Dispatch<React.SetStateAction<boolean>>;
};

const TripExpenseCreator: React.FC<TripExpenseCreatorProps> = ({
  trip,
  setTrip,
  expenseDetails,
  setExpenseDetails,
  setIsExpenseDetailOpen,
  isAddExpense,
  setIsAddExpense,
}) => {
  const { t } = useTranslation("global");
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useContext must be used within an AuthContextProvider");
  }
  const { user } = authContext;
  const { reFetchTrips } = useTripsContext();

  const formRef = useRef<HTMLFormElement | null>(null);

  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef && !modalRef.current?.contains(e.target as Node)) {
        setExpenseDetails({ id: "", name: "", price: "" });
        setIsExpenseDetailOpen(false);
        setIsAddExpense(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setExpenseDetails, setIsExpenseDetailOpen, setIsAddExpense]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setExpenseDetails((prev) => ({ ...prev, [name]: value }));
  };

  const { isLoading, serverError, setServerError, handlePost } = usePost({
    url: `http://localhost:8080/${user.id}/trips/${trip?.id}`,
    formData: {
      icon: "trip",
      name: expenseDetails.name,
      value: expenseDetails.price,
      date: moment().format("YYYY-MM-DD"),
      type: "trip",
    },
    setIsModalOpen: setIsExpenseDetailOpen,
    successMessage: "ADDED",
  });

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!expenseDetails.name && !expenseDetails.price) {
      setServerError("Please provide a name and a price.");
    } else if (!expenseDetails.name) {
      setServerError("Please provide a name.");
    } else if (!expenseDetails.price) {
      setServerError("Please provide a price.");
    } else {
      await handlePost(e);
      setTrip((prev) => prev && { ...prev, id: null });
      await reFetchTrips();
    }
  };

  const { handlePut } = usePut({
    url: `http://localhost:8080/${user.id}/expenses/${expenseDetails.id}`,
    formData: {
      name: expenseDetails.name,
      value: expenseDetails.price,
    },
    successMessage: "edited",
  });

  console.log(expenseDetails);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!expenseDetails.name && !expenseDetails.price) {
      setServerError("Please provide a name and a price.");
    } else if (!expenseDetails.name) {
      setServerError("Please provide a name.");
    } else if (!expenseDetails.price) {
      setServerError("Please provide a price.");
    } else {
      await handlePut(e);
      reFetchTrips();
      setTrip((prev) => prev && { ...prev, id: null });
    }
  };

  const { handleDelete } = useDelete({
    url: `http://localhost:8080/${user.id}/expenses/${expenseDetails.id}`,
    successMessage: "Delted",
  });

  const handleDeleteExpense = async () => {
    await handleDelete();
    setTrip((prev) => prev && { ...prev, id: null });
    await reFetchTrips();
  };
  return (
    <>
      <div className="inset-0 bg-black opacity-20 backdrop-blur-xl fixed rounded-md "></div>
      <motion.div
        initial={{ width: "20px" }}
        animate={{ width: "250px" }}
        transition={{ duration: 0.5 }}
        exit={{ width: "20px", transition: { duration: 0.2 } }}
        ref={modalRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-base rounded-md border-base-300 border drop-shadow-2xl overflow-hidden flex justify-between "
      >
        <div className="flex flex-col w-full items-center p-4 gap-4">
          <motion.h1
            initial={{ translateY: "20px", opacity: 0 }}
            animate={{
              translateY: "0",
              opacity: "100%",
              transition: {
                type: "spring",
                bounce: 0.5,
                delay: 0.3,
              },
            }}
            exit={{ opacity: "0", transition: { duration: 0.1 } }}
            className={`text-lg  font-semibold text-primary-text text-center text-balance`}
          >
            {isAddExpense ? "Add New Trip Expense" : "Update Expense"}
          </motion.h1>
          {/* //*FORM */}

          <form
            ref={formRef}
            onSubmit={isAddExpense ? handleAdd : handleUpdate}
            className="flex flex-col w-full justify-between items-center gap-4"
          >
            {isLoading && <Loading text={t("loading")} />}
            {serverError && (
              <p className="text-red-500 font-semibold text-balance text-center">
                {serverError}
              </p>
            )}
            <motion.input
              initial={{ translateY: "20px", opacity: 0 }}
              animate={{
                translateY: "0",
                opacity: "100%",
                transition: {
                  type: "spring",
                  bounce: 0.5,
                  delay: 0.3,
                },
              }}
              exit={{ opacity: "0", transition: { duration: 0.1 } }}
              className={`inputStyle  w-3/4 placeholder:text-center text-center ${
                (serverError === "Please provide a name." ||
                  serverError === "Please provide a name and a price.") &&
                "border-b-red-500 animate-[wiggle_0.3s_ease-in-out]"
              }`}
              placeholder="Name"
              name="name"
              type="text"
              value={expenseDetails.name}
              onChange={handleChange}
            />

            <motion.input
              initial={{ translateY: "20px", opacity: 0 }}
              animate={{
                translateY: "0",
                opacity: "100%",
                transition: {
                  type: "spring",
                  bounce: 0.5,
                  delay: 0.3,
                },
              }}
              exit={{ opacity: "0", transition: { duration: 0.1 } }}
              className={`inputStyle w-3/4 placeholder:text-center text-center  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                (serverError === "Please provide a price." ||
                  serverError === "Please provide a name and a price.") &&
                " border-b-red-500 animate-[wiggle_0.3s_ease-in-out]"
              }`}
              placeholder="Price"
              name="price"
              type="number"
              min={0}
              step="0.001"
              value={expenseDetails.price}
              onChange={handleChange}
            />
            {isAddExpense && (
              <motion.button
                initial={{ translateY: "20px", opacity: 0 }}
                animate={{
                  translateY: "0",
                  opacity: "100%",
                  transition: {
                    type: "spring",
                    bounce: 0.5,
                    delay: 0.5,
                  },
                }}
                exit={{ opacity: "0", transition: { duration: 0.1 } }}
                className="mt-4"
              >
                <AddBtn btnText="add" />
              </motion.button>
            )}
          </form>
          {!isAddExpense && (
            <motion.div
              initial={{ translateY: "20px", opacity: 0 }}
              animate={{
                translateY: "0",
                opacity: "100%",
                transition: {
                  type: "spring",
                  bounce: 0.5,
                  delay: 0.5,
                },
              }}
              exit={{ opacity: "0", transition: { duration: 0.1 } }}
              className="flex w-full justify-between mt-4"
            >
              {/* EDIT */}
              <button
                onClick={() => {
                  formRef?.current?.requestSubmit();
                }}
                className="w-1/3  flex justify-center items-center px-4 py-2  rounded-md hover:scale-105 active:scale-95 transition-transform duration-300
                  ease-in-out drop-shadow-xl bg-secondary text-secondary-text hover:bg-secondary-darker"
              >
                <FaRegSave className="text-xl" />
              </button>
              {/* DELETE */}
              <button
                onClick={handleDeleteExpense}
                className="w-1/3  flex justify-center items-center px-4 py-2  rounded-md hover:scale-105 active:scale-95 transition-transform duration-300
                  ease-in-out drop-shadow-xl bg-red-700 hover:bg-red-800 text-base"
              >
                <MdDeleteForever className="text-2xl" />
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default TripExpenseCreator;
