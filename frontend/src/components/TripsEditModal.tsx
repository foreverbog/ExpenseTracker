import { SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { TripType } from "./TripsContainer";
import { motion } from "framer-motion";
import useMediaQuery from "../hooks/useMediaQuery";
import { useTranslation } from "react-i18next";
import tripsImages from "../utils/tripsImages";
import { AuthContext } from "../context/AuthContext";
import Loading from "./Loading";
import usePut from "../hooks/usePut";
import useTripsContext from "../hooks/useTripsContext";
import useDelete from "../hooks/useDelete";

type TripsEditModalProps = {
  trip: TripType | undefined;
  setTrip: React.Dispatch<SetStateAction<TripType | undefined>>;
};

const TripsEditModal: React.FC<TripsEditModalProps> = ({ trip, setTrip }) => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useContext must be used withing AuthContextProvider");
  }
  const { user } = authContext;

  const { t } = useTranslation("global");
  const isSmallScreen = useMediaQuery("(max-width: 767px)");
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [isTripExpense, setIsTripExpense] = useState(false);

  //* Ref for submiting the form with an button that is outside the form
  const formRef = useRef<HTMLFormElement | null>(null);

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

  const { handleDelete } = useDelete({
    url: `http://localhost:8080/${user.id}/trips/${trip?.id}`,
    successMessage: "delete",
  });

  //* Delete the trip, retrigger the trips fetch, set tripId to null to close the modal
  const handleDeleteTrip = () => {
    handleDelete();
    reFetchTrips();
    setTrip((prev) => prev && { ...prev, id: null });
  };

  //*useEffect for closing the modal when clicked outside of the modal
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setTrip((prev) => (prev ? { ...prev, id: null } : undefined));
      }
    };
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setTrip]);

  //   console.log(trip?.id);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTrip((prev) => prev && { ...prev, [name]: value });
  };

  //   console.log(trip);
  //   console.log(isTripExpense);

  return (
    <>
      <div
        ref={modalRef}
        className="fixed  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 flex justify-center items-center overflow-hidden"
      >
        <motion.div layoutId={trip?.id || undefined}>
          <motion.div
            className="flex flex-col gap-12 p-4 overflow-hidden z-40 bg-base-100 rounded-md min-w-[300px] relative"
            exit={{ height: "40px", transition: { duration: 0.1 } }}
          >
            {isTripExpense ? (
              //*EXPENSES CONTAINER
              <motion.div
                className="text-8xl flex flex-col gap-4 w-[500px] rounded-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 100 }}
              >
                <div onClick={() => setIsTripExpense(false)}>Back</div>
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
              </motion.div>
            ) : (
              <>
                {/* //*IMAGES CONTAINER */}
                <motion.div
                  className="flex flex-col justify-center items-center gap-2 text-lg md:text-2xl text-center p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 100 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                >
                  <p className="mb-2 text-4xl">Edit your Trip</p>
                  <p className="mb-4">{t("placeholders.chooseTripImage")}</p>
                  <div className="grid grid-cols-4 gap-2 ">
                    {tripsImages.map((imageTrip) => (
                      <img
                        onClick={() =>
                          setTrip(
                            (prev) => prev && { ...prev, image: imageTrip }
                          )
                        }
                        key={imageTrip}
                        src={`../images/${imageTrip}.png`}
                        alt={`${imageTrip} Trip`}
                        className={` ${
                          imageTrip === trip?.image
                            ? " brightness-100 outline-offset-2 outline outline-2 outline-primary "
                            : "brightness-50"
                        } w-12 h-12 md:w-20 md:h-20 scale-105 rounded-md  `}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* //*FORM FOR EDITING  */}
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
                      setIsTripExpense(true);
                    }}
                    className="bg-primary text-primary-text px-4 py-2 rounded-md w-2/3  text-xs"
                  >
                    {`Manage Trip Exepnses`}
                  </button>
                </motion.form>

                {/* //*UPDATE AND DELETE BUTTONS */}
                <div className="flex justify-around  w-full ">
                  <button
                    onClick={() => {
                      formRef.current?.requestSubmit();
                    }}
                    className="text-xs lg:text-normal px-4 py-2 bg-secondary
              text-secondary-text rounded-md  font-semibold
              hover:scale-105 active:scale-95 transition-transform duration-300
              ease-in-out drop-shadow-xl"
                  >
                    {t("update")}
                  </button>
                  <button
                    onClick={handleDeleteTrip}
                    className="text-xs lg:text-normal px-4 py-2 
               rounded-md  font-semibold
              hover:scale-105 active:scale-95 transition-transform duration-300
              ease-in-out drop-shadow-xl bg-red-700 hover:bg-red-800 text-base"
                  >
                    {t("delete")}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default TripsEditModal;
