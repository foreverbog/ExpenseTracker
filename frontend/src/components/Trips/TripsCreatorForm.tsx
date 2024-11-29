import { useContext, useEffect, useState } from "react";
import useMediaQuery from "../../hooks/useMediaQuery";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import moment from "moment";
import Loading from "../Loading/Loading";
import { useTranslation } from "react-i18next";
import usePost from "../../hooks/usePost";
import { AuthContext } from "../../context/AuthContext";
import useTripsContext from "../../hooks/useTripsContext";

type TripFormDataType = {
  image:
    | "Business"
    | "Citybreak"
    | "Hiking"
    | "Nature"
    | "Socialevent"
    | "Summer"
    | "Wellness"
    | "Winter";
  tripName: string;
  roundTrip: boolean;
  roundTripCost?: number | "";
  travelCost?: number | "";
  accomodationCost?: number | "";

  startDay: string;
  startMonth: string;
  startYear: string;

  endDay: string;
  endMonth: string;
  endYear: string;

  description?: string;
};

type TripsCreatorFormProps = {
  tripImage:
    | "Business"
    | "Citybreak"
    | "Hiking"
    | "Nature"
    | "Socialevent"
    | "Summer"
    | "Wellness"
    | "Winter";
  setIsTripCreatorOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const TripsCreatorForm: React.FC<TripsCreatorFormProps> = ({
  tripImage,
  setIsTripCreatorOpen,
}) => {
  const API_URL: string = import.meta.env.VITE_API_SERVER;
  const { t } = useTranslation("global");
  const isSmallScreen = useMediaQuery("(max-width: 767px)");
  // console.log(tripImage);

  // *Function to retrigger the fetch
  const { reFetchTrips } = useTripsContext();

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useContext must be used within AuthContextProvider");
  }

  const { user } = authContext;

  // *UseEffect for updating the image in the form
  useEffect(() => {
    setTripFormData((prev) => ({ ...prev, image: tripImage }));
  }, [tripImage]);

  // *TRIP FORM STATE
  const [tripFormData, setTripFormData] = useState<TripFormDataType>({
    image: tripImage,
    tripName: "",
    roundTrip: true,
    roundTripCost: "",
    travelCost: "",
    accomodationCost: "",

    startDay: "",
    startMonth: "",
    startYear: moment().year().toString(),

    endDay: "",
    endMonth: "",
    endYear: moment().year().toString(),

    description: "",
  });

  //*Handle Change for inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTripFormData((prev) => ({ ...prev, [name]: value }));
  };

  // console.log(tripFormData);

  const { isLoading, handlePost, serverError, setServerError } = usePost({
    url: `${API_URL}/${user.id}/trips`,
    formData: {
      image: tripFormData.image,
      name: tripFormData.tripName,
      roundTrip: tripFormData.roundTrip,
      roundTripCost: tripFormData.roundTrip
        ? Number(tripFormData.roundTripCost)
        : Number(tripFormData.travelCost) +
          Number(tripFormData.accomodationCost),
      startDate: `${tripFormData.startYear}-
        ${tripFormData.startMonth}-
        ${tripFormData.startDay}`,
      endDate: `${tripFormData.endYear}-
        ${tripFormData.endMonth}-
        ${tripFormData.endDay}`,
      description: tripFormData?.description || "",
    },
    successMessage: t("toasters.create", { feature: t("trip") }),
    setIsModalOpen: setIsTripCreatorOpen,
  });

  // console.log(tripFormData.roundTripCost);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!tripFormData.tripName) {
      setServerError(t("trips.errors.name"));
    } else if (tripFormData.roundTrip && !tripFormData.roundTripCost) {
      setServerError(t("trips.errors.price"));
    } else if (
      !tripFormData.roundTrip &&
      (!tripFormData.travelCost || !tripFormData.accomodationCost)
    ) {
      setServerError(t("trips.errors.priceForTravel/Accomodation"));
    } else if (
      !tripFormData.startDay ||
      !tripFormData.startMonth ||
      !tripFormData.startYear ||
      !tripFormData.endDay ||
      !tripFormData.endMonth ||
      !tripFormData.endYear
    ) {
      setServerError(t("trips.errors.date"));
    } else {
      await handlePost(e);
      await reFetchTrips();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 flex flex-col justify-center items-center text-sm gap-2"
    >
      {isLoading && <Loading text={t("loading")} />}
      {/* //*NAME INPUT */}
      {serverError && (
        <p className="text-red-500 font-semibold text-balance text-center md:text-sm lg:text-normal">
          {serverError}
        </p>
      )}
      <input
        onChange={handleChange}
        value={tripFormData.tripName}
        name="tripName"
        type="text"
        className={`inputStyle bg-transparent text-center w-full md:w-2/3 ${
          serverError === t("trips.errors.name") &&
          "border-b-red-500 animate-[wiggle_0.3s_ease-in-out]"
        }`}
        placeholder={t("placeholders.tripName")}
      />
      {/* //*ROUND TRIP */}
      <div className="flex justify-between items-center gap-1 group ">
        <div className="flex gap-1 justify-center items-center">
          <input
            onChange={() =>
              setTripFormData((prev) => ({
                ...prev,
                roundTrip: !prev.roundTrip,
              }))
            }
            checked={tripFormData.roundTrip}
            name="roundTrip"
            type="checkbox"
            className="appearance-none border border-base-300 p-2 rounded-md bg-base-200 checked:bg-primary checked:border-primary-darker group-hover:cursor-pointer"
          />
          <p>{t("placeholders.roundTrip")}</p>
        </div>
        <input
          onChange={handleChange}
          value={tripFormData.roundTrip ? tripFormData.roundTripCost : ""}
          name="roundTripCost"
          disabled={!tripFormData.roundTrip}
          type="number"
          className={`inputStyle bg-transparent text-center w-1/3 disabled:opacity-20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
            serverError === t("trips.errors.price") &&
            "border-b-red-500 animate-[wiggle_0.3s_ease-in-out]"
          }`}
          placeholder={t("placeholders.price")}
        />
      </div>
      {/* //*TRANSPORT AND ACCOMODATION */}
      <AnimatePresence>
        {!tripFormData.roundTrip && (
          <div className="md:flex md:w-full md:justify-center">
            <motion.input
              initial={{ translateY: "-10px", opacity: 0 }}
              animate={{ translateY: "0px", opacity: 100 }}
              transition={{ duration: "0.5" }}
              exit={{ translateY: "-10px", opacity: 0 }}
              onChange={handleChange}
              value={!tripFormData.roundTrip ? tripFormData.travelCost : ""}
              name="travelCost"
              type="number"
              className={`inputStyle bg-transparent text-center  md:w-1/2 lg:w-1/3 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                serverError === t("trips.errors.priceForTravel/Accomodation") &&
                "border-b-red-500 animate-[wiggle_0.3s_ease-in-out]"
              }`}
              placeholder={t("placeholders.travelPrice")}
            />
            <motion.input
              initial={{ translateY: "-10px", opacity: 0 }}
              animate={{ translateY: "0px", opacity: 100 }}
              transition={{ duration: "0.5" }}
              exit={{ translateY: "-10px", opacity: 0 }}
              onChange={handleChange}
              value={
                !tripFormData.roundTrip ? tripFormData.accomodationCost : ""
              }
              name="accomodationCost"
              type="number"
              className={`inputStyle bg-transparent text-center  md:w-1/2 lg:w-1/3 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                serverError === t("trips.errors.priceForTravel/Accomodation") &&
                "border-b-red-500 animate-[wiggle_0.3s_ease-in-out]"
              }`}
              placeholder={t("placeholders.accomodationPrice")}
            />
          </div>
        )}
      </AnimatePresence>
      {/* //*START-END DATE */}

      <div className="flex flex-col lg:w-1/2">
        <p>{t("placeholders.startDate")}</p>
        <div className="flex justify-center items-center">
          <input
            onChange={handleChange}
            value={tripFormData.startDay}
            name="startDay"
            type="number"
            placeholder={t("placeholders.DD")}
            className={`inputStyle bg-transparent w-1/4 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
              serverError === t("trips.errors.date") &&
              "border-b-red-500 animate-[wiggle_0.3s_ease-in-out]"
            }`}
          />
          <span>/</span>
          <input
            onChange={handleChange}
            value={tripFormData.startMonth}
            name="startMonth"
            type="number"
            placeholder={t("placeholders.MM")}
            className={`inputStyle bg-transparent w-1/4 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
              serverError === t("trips.errors.date") &&
              "border-b-red-500 animate-[wiggle_0.3s_ease-in-out]"
            }`}
          />
          <span>/</span>
          <input
            onChange={handleChange}
            value={tripFormData.startYear}
            name="startYear"
            type="number"
            placeholder={t("placeholders.YYYY")}
            className={`inputStyle bg-transparent w-1/4 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
              serverError === t("trips.errors.date") &&
              "border-b-red-500 animate-[wiggle_0.3s_ease-in-out]"
            }`}
          />
        </div>
      </div>
      <div className="flex flex-col lg:w-1/2">
        {/* //*END DATE */}
        <p>{t("placeholders.endDate")}</p>
        <div className="flex justify-center items-center">
          <input
            onChange={handleChange}
            value={tripFormData.endDay}
            name="endDay"
            type="number"
            placeholder={t("placeholders.DD")}
            className={`inputStyle bg-transparent w-1/4 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
              serverError === t("trips.errors.date") &&
              "border-b-red-500 animate-[wiggle_0.3s_ease-in-out]"
            }`}
          />
          <span>/</span>
          <input
            onChange={handleChange}
            value={tripFormData.endMonth}
            name="endMonth"
            type="number"
            placeholder={t("placeholders.MM")}
            className={`inputStyle bg-transparent w-1/4 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
              serverError === t("trips.errors.date") &&
              "border-b-red-500 animate-[wiggle_0.3s_ease-in-out]"
            }`}
          />
          <span>/</span>
          <input
            onChange={handleChange}
            value={tripFormData.endYear}
            name="endYear"
            type="number"
            placeholder={t("placeholders.YYYY")}
            className={`inputStyle bg-transparent w-1/4 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
              serverError === t("trips.errors.date") &&
              "border-b-red-500 animate-[wiggle_0.3s_ease-in-out]"
            }`}
          />
        </div>
      </div>
      {/* //*DESCRIPTION FIELD */}
      <textarea
        onChange={handleChange}
        value={tripFormData.description}
        name="description"
        placeholder={t("placeholders.description")}
        className="inputStyle placeholder:text-center bg-transparent border-2 appearance-none resize-none rounded-md  w-full  placeholder:absolute placeholder:top-1/2 placeholder:left-1/2 placeholder:-translate-x-1/2 placeholder:-translate-y-1/2 placeholder:text-normal"
        rows={isSmallScreen ? 4 : 6}
      />
      <button className="text-xs lg:text-normal lg:px-4 py-2 bg-secondary text-secondary-text rounded-md w-1/2 mt-8 font-semibold hover:scale-105 active:scale-95 transition-transform duration-300 ease-in-out drop-shadow-xl">
        {t("trips.addBtn")}
      </button>
    </form>
  );
};

export default TripsCreatorForm;
