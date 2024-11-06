import { SetStateAction, useEffect, useRef, useState } from "react";
import { TripType } from "./TripsContainer";
import { motion } from "framer-motion";
import useMediaQuery from "../hooks/useMediaQuery";
import { useTranslation } from "react-i18next";
import tripsImages from "../utils/tripsImages";
import { duration } from "moment";

type TripsEditModalProps = {
  trip: TripType | undefined;
  setTrip: React.Dispatch<SetStateAction<TripType | undefined>>;
};

const TripsEditModal: React.FC<TripsEditModalProps> = ({ trip, setTrip }) => {
  const { t } = useTranslation("global");
  const isSmallScreen = useMediaQuery("(max-width: 767px)");
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [isTripExpense, setIsTripExpense] = useState(false);

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
      <div className="bg-black inset-0 absolute opacity-60 z-40"></div>
      <div
        ref={modalRef}
        className="fixed  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 flex justify-center items-center"
      >
        {/* //*DIV FOR Selecting the trip info or the trip's expenses */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 100 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className=" absolute left-1 top-0 flex flex-col h-2/5  w-4  md:w-8 overflow-hidden z-50"
        >
          <div className=" bg-base-100 border-r-2 border-r-base-300  h-12 flex justify-center items-center"></div>
          <div
            onClick={() => setIsTripExpense(false)}
            className={`${
              isTripExpense
                ? "bg-base-300 rounded-l-md border-b-2 border-b-base-100 "
                : "bg-base-100 border-l-2 border-y-2 border-y-base-300 border-l-base-300 rounded-l-md "
            }  h-1/3 flex justify-center items-center transition-colors duration-300 ease-in-out hover:cursor-pointer`}
          >
            <div className="-rotate-90">Trip</div>
          </div>
          <div
            onClick={() => setIsTripExpense(true)}
            className={`${
              isTripExpense
                ? "bg-base-100 border-l-2 border-y-2 border-y-base-300 border-l-base-300 rounded-l-md"
                : "bg-base-300 rounded-l-md border-t-2  border-t-base-100"
            }  h-1/3 flex justify-center items-center  transition-colors duration-300 ease-in-out hover:cursor-pointer`}
          >
            <div className="-rotate-90">Expenses</div>
          </div>
          <div className=" bg-base-100 border-r-2 border-r-base-300 h-12 flex justify-center items-center  "></div>
        </motion.div>
        {isTripExpense ? (
          <motion.div className="flex flex-col gap-12 p-4 overflow-hidden z-40 bg-base-100 rounded-md min-w-[300px] relative h-[500px]">
            hey
          </motion.div>
        ) : (
          <motion.div layoutId={trip?.id || undefined}>
            <motion.div
              className="flex flex-col gap-12 p-4 overflow-hidden z-40 bg-base-100 rounded-md min-w-[300px] relative"
              exit={{ height: "40px", transition: { duration: 0.1 } }}
            >
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
                        setTrip((prev) => prev && { ...prev, image: imageTrip })
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 100 }}
                transition={{ duration: 1, delay: 0.2 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                // onSubmit={handleSubmit}
                className="mt-4 flex flex-col justify-center items-center text-sm gap-2"
              >
                {/* {isLoading && <Loading text={t("loading")} />} */}
                {/* //*NAME INPUT */}
                {/* {serverError && (
              <p className="text-red-500 font-semibold text-balance text-center md:text-sm lg:text-normal">
                {serverError}
              </p>
            )} */}
                <input
                  onChange={handleChange}
                  value={trip?.name}
                  name="name"
                  type="text"
                  className={`inputStyle bg-transparent text-center w-full md:w-2/3 `}
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
                      className={`inputStyle bg-transparent w-1/4 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none `}
                    />
                    <span>/</span>
                    <input
                      onChange={handleChange}
                      value={trip?.startMonth}
                      name="startMonth"
                      type="number"
                      placeholder={t("placeholders.MM")}
                      className={`inputStyle bg-transparent w-1/4 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none `}
                    />
                    <span>/</span>
                    <input
                      onChange={handleChange}
                      value={trip?.startYear}
                      name="startYear"
                      type="number"
                      placeholder={t("placeholders.YYYY")}
                      className={`inputStyle bg-transparent w-1/4 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none `}
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
                      className={`inputStyle bg-transparent w-1/4 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                    />
                    <span>/</span>
                    <input
                      onChange={handleChange}
                      value={trip?.endMonth}
                      name="endMonth"
                      type="number"
                      placeholder={t("placeholders.MM")}
                      className={`inputStyle bg-transparent w-1/4 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                    />
                    <span>/</span>
                    <input
                      onChange={handleChange}
                      value={trip?.endYear}
                      name="endYear"
                      type="number"
                      placeholder={t("placeholders.YYYY")}
                      className={`inputStyle bg-transparent w-1/4 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
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
              </motion.form>

              {/* //*UPDATE AND DELETE BUTTONS */}
              <div className="flex justify-around  w-full ">
                <button
                  //   onClick={() => {
                  //     formRef.current?.requestSubmit();
                  //   }}
                  className="text-xs lg:text-normal px-4 py-2 bg-secondary
              text-secondary-text rounded-md  font-semibold
              hover:scale-105 active:scale-95 transition-transform duration-300
              ease-in-out drop-shadow-xl"
                >
                  {t("update")}
                </button>
                <button
                  //   onClick={handleDelete}
                  className="text-xs lg:text-normal px-4 py-2 
               rounded-md  font-semibold
              hover:scale-105 active:scale-95 transition-transform duration-300
              ease-in-out drop-shadow-xl bg-red-700 hover:bg-red-800 text-base"
                >
                  {t("delete")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default TripsEditModal;
