import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import tripsImages from "../utils/tripsImages";
import TripsCreatorForm from "./TripsCreatorForm";
import useMediaQuery from "../hooks/useMediaQuery";

type TripsCreatorModalProps = {
  isTripCreatorOpen: boolean;
  setIsTripCreatorOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// type TripFormData = {
//   image:
//     | "Business"
//     | "Citybreak"
//     | "Hiking"
//     | "Nature"
//     | "Socialevent"
//     | "Summer"
//     | "Wellness"
//     | "Winter";
//   name: string;
//   starDate: string;
//   endDate: string;
//   roundTrip: boolean;
//   roundTripCost?: number;
//   description?: string;
// };

const TripsCreatorModal: React.FC<TripsCreatorModalProps> = ({
  isTripCreatorOpen,
  setIsTripCreatorOpen,
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const isSmallScreen = useMediaQuery("(max-width: 767px)");

  //*State for image selector
  const [tripImage, setTripImage] = useState<
    | "Business"
    | "Citybreak"
    | "Hiking"
    | "Nature"
    | "Socialevent"
    | "Summer"
    | "Wellness"
    | "Winter"
  >("Business");

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current?.contains(e.target as Node)) {
        setIsTripCreatorOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsTripCreatorOpen]);

  return (
    <>
      <div className="inset-0 bg-black opacity-60 z-40 fixed"></div>

      <motion.div
        initial={{ width: "40px" }}
        animate={{ width: isSmallScreen ? "300px" : "auto" }}
        transition={{ duration: "0.5" }}
        exit={{ width: "20px", transition: { duration: 0.5, delay: 0.4 } }}
        ref={modalRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-base-100 overflow-hidden rounded-md"
      >
        <motion.div
          className="flex flex-col gap-12 p-4 overflow-hidden"
          initial={{ height: "40px" }}
          animate={{ height: "auto" }}
          transition={{ duration: 0.5, delay: 0.4 }}
          exit={{ height: "40px", transition: { duration: 0.3 } }}
        >
          {/* //*IMAGES CONTAINER */}
          <motion.div
            className="flex flex-col justify-center items-center gap-2 text-lg md:text-4xl text-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 100 }}
            transition={{ duration: 1, delay: 0.7 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            <p>Choose Image:</p>
            <div className="grid grid-cols-4 gap-2 ">
              {tripsImages.map((trip) => (
                <img
                  onClick={() => setTripImage(trip)}
                  key={trip}
                  src={`../images/${trip}.png`}
                  alt={`${trip} Trip`}
                  className={`w-12 h-12 md:w-20 md:h-20 scale-105 rounded-md brightness-50 transition-all duration-300 ease-in-out ${
                    trip === tripImage &&
                    "brightness-110 outline-offset-2 outline outline-2 outline-primary"
                  }`}
                />
              ))}
            </div>
            {/* //*CREATE FORM */}
            <TripsCreatorForm tripImage={tripImage} />
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default TripsCreatorModal;
