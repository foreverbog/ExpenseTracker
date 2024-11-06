import { SetStateAction, useEffect, useRef } from "react";
import { TripType } from "./TripsContainer";
import { motion } from "framer-motion";
import useMediaQuery from "../hooks/useMediaQuery";
import { useTranslation } from "react-i18next";
import tripsImages from "../utils/tripsImages";

type TripsEditModalProps = {
  trip: TripType | undefined;
  setTrip: React.Dispatch<SetStateAction<TripType | undefined>>;
};

const TripsEditModal: React.FC<TripsEditModalProps> = ({ trip, setTrip }) => {
  const { t } = useTranslation("global");
  const isSmallScreen = useMediaQuery("(max-width: 767px)");
  const modalRef = useRef<HTMLDivElement | null>(null);

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

  return (
    <>
      <div className="bg-black inset-0 absolute opacity-60 z-40"></div>
      <div className="fixed  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 flex justify-center items-center">
        <motion.div layoutId={trip?.id || undefined} ref={modalRef}>
          <motion.div
            className="flex flex-col gap-12 p-4 overflow-hidden z-50 bg-base-100 rounded-md min-w-[300px]"
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
                //   onChange={handleChange}
                //   value={tripFormData.tripName}
                value={trip?.name}
                name="tripName"
                type="text"
                className={`inputStyle bg-transparent text-center w-full md:w-2/3 `}
                placeholder={t("placeholders.tripName")}
              />
              {/* //*ROUND TRIP */}
              <div className="flex justify-between items-center gap-1 group ">
                <div className="flex gap-1 justify-center items-center">
                  <input
                    //   onChange={() =>
                    //     setTripFormData((prev) => ({
                    //       ...prev,
                    //       roundTrip: !prev.roundTrip,
                    //     }))
                    //   }
                    checked={trip?.roundTrip}
                    name="roundTrip"
                    type="checkbox"
                    className="appearance-none border border-base-300 p-2 rounded-md bg-base-200 checked:bg-primary checked:border-primary-darker group-hover:cursor-pointer"
                  />
                  <p>{t("placeholders.roundTrip")}</p>
                </div>
                <input
                  // onChange={handleChange}
                  value={trip?.roundTripCost}
                  name="roundTripCost"
                  //   disabled={!tripFormData.roundTrip}
                  type="number"
                  className={`inputStyle bg-transparent text-center w-1/3 disabled:opacity-20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none `}
                  placeholder={t("placeholders.price")}
                />
              </div>
              {/* //*TRANSPORT AND ACCOMODATION */}
              {/* <AnimatePresence>
              {!tripFormData.roundTrip && (
                <div className="md:flex md:w-full md:justify-center">
                  <motion.input
                    initial={{ translateY: "-10px", opacity: 0 }}
                    animate={{ translateY: "0px", opacity: 100 }}
                    transition={{ duration: "0.5" }}
                    exit={{ translateY: "-10px", opacity: 0 }}
                    onChange={handleChange}
                    value={
                      !tripFormData.roundTrip ? tripFormData.travelCost : ""
                    }
                    name="travelCost"
                    type="number"
                    className={`inputStyle bg-transparent text-center  md:w-1/2 lg:w-1/3 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                      serverError ===
                        t("trips.errors.priceForTravel/Accomodation") &&
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
                      !tripFormData.roundTrip
                        ? tripFormData.accomodationCost
                        : ""
                    }
                    name="accomodationCost"
                    type="number"
                    className={`inputStyle bg-transparent text-center  md:w-1/2 lg:w-1/3 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                      serverError ===
                        t("trips.errors.priceForTravel/Accomodation") &&
                      "border-b-red-500 animate-[wiggle_0.3s_ease-in-out]"
                    }`}
                    placeholder={t("placeholders.accomodationPrice")}
                  />
                </div>
              )}
            </AnimatePresence> */}
              {/* //*START-END DATE */}

              <div className="flex flex-col lg:w-1/2">
                <p>{t("placeholders.startDate")}</p>
                <div className="flex justify-center items-center">
                  <input
                    //   onChange={handleChange}
                    //   value={tripFormData.startDay}
                    name="startDay"
                    type="number"
                    placeholder={t("placeholders.DD")}
                    className={`inputStyle bg-transparent w-1/4 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none `}
                  />
                  <span>/</span>
                  <input
                    //   onChange={handleChange}
                    //   value={tripFormData.startMonth}
                    name="startMonth"
                    type="number"
                    placeholder={t("placeholders.MM")}
                    className={`inputStyle bg-transparent w-1/4 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none `}
                  />
                  <span>/</span>
                  <input
                    //   onChange={handleChange}
                    //   value={tripFormData.startYear}
                    name="startYear"
                    type="number"
                    placeholder={t("placeholders.YYYY")}
                    className={`inputStyle bg-transparent w-1/4 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none `}
                  />
                </div>
              </div>
              <div className="flex flex-col lg:w-1/2">
                {/* //*END DATE */}
                <p>{t("placeholders.endDate")}</p>
                <div className="flex justify-center items-center">
                  <input
                    //   onChange={handleChange}
                    //   value={tripFormData.endDay}
                    name="endDay"
                    type="number"
                    placeholder={t("placeholders.DD")}
                    className={`inputStyle bg-transparent w-1/4 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                  />
                  <span>/</span>
                  <input
                    //   onChange={handleChange}
                    //   value={tripFormData.endMonth}
                    name="endMonth"
                    type="number"
                    placeholder={t("placeholders.MM")}
                    className={`inputStyle bg-transparent w-1/4 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                  />
                  <span>/</span>
                  <input
                    //   onChange={handleChange}
                    //   value={tripFormData.endYear}
                    name="endYear"
                    type="number"
                    placeholder={t("placeholders.YYYY")}
                    className={`inputStyle bg-transparent w-1/4 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                  />
                </div>
              </div>
              {/* //*DESCRIPTION FIELD */}
              <textarea
                //   onChange={handleChange}
                //   value={tripFormData.description}
                name="description"
                placeholder={t("placeholders.description")}
                className="inputStyle placeholder:text-center bg-transparent border-2 appearance-none resize-none rounded-md  w-full  placeholder:absolute placeholder:top-1/2 placeholder:left-1/2 placeholder:-translate-x-1/2 placeholder:-translate-y-1/2 placeholder:text-normal"
                rows={isSmallScreen ? 4 : 6}
              />
              <button className="text-xs lg:text-normal lg:px-4 py-2 bg-secondary text-secondary-text rounded-md w-1/2 mt-8 font-semibold hover:scale-105 active:scale-95 transition-transform duration-300 ease-in-out drop-shadow-xl">
                add
              </button>
            </motion.form>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default TripsEditModal;
