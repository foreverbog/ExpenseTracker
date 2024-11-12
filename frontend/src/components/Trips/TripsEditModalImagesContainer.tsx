import { motion } from "framer-motion";
import tripsImages from "../../utils/tripsImages";
import { useTranslation } from "react-i18next";
import { TripType } from "./TripsContainer";

type TripsEditModalImagesContainerProps = {
  trip: TripType | undefined;
  setTrip: React.Dispatch<React.SetStateAction<TripType | undefined>>;
};

const TripsEditModalImagesContainer: React.FC<
  TripsEditModalImagesContainerProps
> = ({ trip, setTrip }) => {
  const { t } = useTranslation("global");
  return (
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
  );
};

export default TripsEditModalImagesContainer;
