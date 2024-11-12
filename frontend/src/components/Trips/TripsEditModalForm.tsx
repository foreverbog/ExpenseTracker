import { useContext } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { TripType } from "./TripsContainer";
import useTripsContext from "../../hooks/useTripsContext";
import usePut from "../../hooks/usePut";
import useMediaQuery from "../../hooks/useMediaQuery";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../Loading/Loading";

type TripsEditModalForm = {
  trip: TripType | undefined;
  setTrip: React.Dispatch<React.SetStateAction<TripType | undefined>>;
  formRef: React.RefObject<HTMLFormElement>;
  setIsTripExpenseOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const TripsEditModalForm: React.FC<TripsEditModalForm> = ({
  trip,
  setTrip,
  formRef,
  setIsTripExpenseOpen,
}) => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useContext must be used withing AuthContextProvider");
  }
  const { user } = authContext;

  const { t } = useTranslation("global");
  const isSmallScreen = useMediaQuery("(max-width: 767px)");

  const { reFetchTrips } = useTripsContext();

  const { isLoading, serverError, setServerError, handlePut } = usePut({
    url: `http://localhost:8080/${user.id}/trips/${trip?.id}`,
    formData: {
      image: trip?.image || null,
      name: trip?.name || null,
      startDate: `${trip?.startYear}-${trip?.startMonth}-${trip?.startDay}`,
      endDate: `${trip?.endYear}-${trip?.endMonth}-${trip?.endDay}`,
      description: trip?.description || null,
    },
    successMessage: "update",
  });

  //*Function for error Checking, if all Checking pass, make the put Request, refetch the trips and set the tripID to null to close the modal
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!trip?.name) {
      setServerError(t("trips.errors.name"));
    } else if (
      !trip?.startDay ||
      !trip?.startMonth ||
      !trip?.startYear ||
      !trip?.endDay ||
      !trip?.endMonth ||
      !trip?.endYear
    ) {
      setServerError(t("trips.errors.date"));
    } else {
      handlePut(e);
      reFetchTrips();
      setTrip((prev) => prev && { ...prev, id: null });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTrip((prev) => prev && { ...prev, [name]: value });
  };
  return (
    <motion.form
      onSubmit={handleFormSubmit}
      ref={formRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 100 }}
      transition={{ duration: 1, delay: 0.2 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      className={`flex flex-col justify-center items-center text-sm gap-2 `}
    >
      {isLoading && <Loading text={t("loading")} />}
      {serverError && (
        <p className="text-red-500 font-semibold text-balance text-center md:text-sm lg:text-normal">
          {serverError}
        </p>
      )}

      {/* //*NAME INPUT */}
      <input
        onChange={handleChange}
        value={trip?.name}
        name="name"
        type="text"
        className={`inputStyle bg-transparent text-center w-full md:w-2/3 ${
          serverError === t("trips.errors.name") &&
          "border-b-red-500 animate-[wiggle_0.3s_ease-in-out]"
        }`}
        placeholder={t("placeholders.tripName")}
      />

      <div className="flex flex-col justify-center items-center  lg:w-1/2">
        <p>{t("placeholders.startDate")}</p>
        <div className="flex justify-center items-center">
          <input
            onChange={handleChange}
            value={trip?.startDay}
            name="startDay"
            type="number"
            placeholder={t("placeholders.DD")}
            className={`inputStyle bg-transparent w-1/4 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
              serverError === t("trips.errors.date") &&
              "border-b-red-500 animate-[wiggle_0.3s_ease-in-out]"
            } `}
          />
          <span>/</span>
          <input
            onChange={handleChange}
            value={trip?.startMonth}
            name="startMonth"
            type="number"
            placeholder={t("placeholders.MM")}
            className={`inputStyle bg-transparent w-1/4 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
              serverError === t("trips.errors.date") &&
              "border-b-red-500 animate-[wiggle_0.3s_ease-in-out]"
            } `}
          />
          <span>/</span>
          <input
            onChange={handleChange}
            value={trip?.startYear}
            name="startYear"
            type="number"
            placeholder={t("placeholders.YYYY")}
            className={`inputStyle bg-transparent w-1/4 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
              serverError === t("trips.errors.date") &&
              "border-b-red-500 animate-[wiggle_0.3s_ease-in-out]"
            } `}
          />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center  lg:w-1/2">
        {/* //*END DATE */}
        <p>{t("placeholders.endDate")}</p>
        <div className="flex justify-center items-center">
          <input
            onChange={handleChange}
            value={trip?.endDay}
            name="endDay"
            type="number"
            placeholder={t("placeholders.DD")}
            className={`inputStyle bg-transparent w-1/4 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
              serverError === t("trips.errors.date") &&
              "border-b-red-500 animate-[wiggle_0.3s_ease-in-out]"
            } `}
          />
          <span>/</span>
          <input
            onChange={handleChange}
            value={trip?.endMonth}
            name="endMonth"
            type="number"
            placeholder={t("placeholders.MM")}
            className={`inputStyle bg-transparent w-1/4 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
              serverError === t("trips.errors.date") &&
              "border-b-red-500 animate-[wiggle_0.3s_ease-in-out]"
            } `}
          />
          <span>/</span>
          <input
            onChange={handleChange}
            value={trip?.endYear}
            name="endYear"
            type="number"
            placeholder={t("placeholders.YYYY")}
            className={`inputStyle bg-transparent w-1/4 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
              serverError === t("trips.errors.date") &&
              "border-b-red-500 animate-[wiggle_0.3s_ease-in-out]"
            } `}
          />
        </div>
      </div>
      {/* //*DESCRIPTION FIELD */}
      <textarea
        onChange={handleChange}
        value={trip?.description}
        name="description"
        placeholder={t("placeholders.description")}
        className="inputStyle placeholder:text-center bg-transparent border-2 appearance-none resize-none rounded-md  w-full  placeholder:absolute placeholder:top-1/2 placeholder:left-1/2 placeholder:-translate-x-1/2 placeholder:-translate-y-1/2 placeholder:text-normal"
        rows={isSmallScreen ? 4 : 6}
      />

      {/* //*BTN THAT REDIRECT TO THE SPECIFIC TRIP EXPENSES */}
      <button
        onClick={() => {
          setIsTripExpenseOpen(true);
        }}
        className="bg-primary text-primary-text px-4 py-2 rounded-md w-2/3  text-xs"
      >
        {`Manage Trip Exepnses`}
      </button>
    </motion.form>
  );
};

export default TripsEditModalForm;
