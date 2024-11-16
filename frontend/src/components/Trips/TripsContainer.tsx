import { useState } from "react";
import useTripsContext from "../../hooks/useTripsContext";
import TripsLoadingSkeleton from "../Loading/TripsLoadingSkeleton";
import moment from "moment";
import { useTranslation } from "react-i18next";
import TripsEditModal from "./TripsEditModal";
import { AnimatePresence, motion } from "framer-motion";
import { ExpenseType } from "../Expenses/ExpensesGrid";

export type TripType = {
  id: string | null;
  image: string;
  name: string;
  roundTrip: boolean;
  roundTripCost?: number;

  startDay: string;
  startMonth: string;
  startYear: string;

  endDay: string;
  endMonth: string;
  endYear: string;

  description?: string;
  expenses?: ExpenseType[];
};

type TripsContainerProps = {
  isRoundTrip: boolean;
  isOldestFirst: boolean;
};
const TripsContainer: React.FC<TripsContainerProps> = ({
  isRoundTrip,
  isOldestFirst,
}) => {
  const { t } = useTranslation("global");
  const { trips, isLoading } = useTripsContext();

  const [trip, setTrip] = useState<TripType | undefined>();

  let filteredTrips;
  if (isRoundTrip && isOldestFirst && trips) {
    filteredTrips = trips?.filter((trip) => trip.roundTrip === true);
  } else if (isOldestFirst && trips) {
    filteredTrips = trips;
  } else if (isRoundTrip && trips) {
    filteredTrips = [...trips]
      ?.filter((trip) => trip.roundTrip === true)
      .reverse();
  } else {
    filteredTrips = trips && [...trips]?.reverse();
  }

  if (isLoading) {
    return isLoading && <TripsLoadingSkeleton />;
  }
  console.log(trip);

  return (
    <div>
      <div className="pl-6 text-base-text text-xl mt-4 ">
        {filteredTrips?.length !== 0 &&
          `${t("trips.totalTrips")} ${filteredTrips?.length}`}
      </div>
      {/* //*TRIP EDIT MODAL */}
      {trip?.id && (
        <div className="bg-black inset-0  opacity-60 z-40 fixed"></div>
      )}
      <AnimatePresence>
        {trip?.id && <TripsEditModal trip={trip} setTrip={setTrip} />}
      </AnimatePresence>
      <div className="flex flex-wrap gap-4 mt-6 justify-center items-center pl-2 relative">
        {filteredTrips && filteredTrips?.length === 0 ? (
          <div className="text-base-text text-center text-balance text-2xl mt-24">
            {t("trips.noTrips")}
          </div>
        ) : (
          filteredTrips?.map((trip) => (
            <motion.div
              transition={{ duration: 0.2, ease: "easeInOut" }}
              layoutId={trip._id ? trip._id : undefined}
              onClick={() =>
                setTrip({
                  id: trip._id,
                  image: trip.image,
                  name: trip.name,
                  roundTrip: trip.roundTrip,
                  roundTripCost: trip.roundTripCost,
                  startDay: moment(trip.startDate).format("DD"),
                  startMonth: moment(trip.startDate).format("MM"),
                  startYear: moment(trip.startDate).format("YYYY"),
                  endDay: moment(trip.endDate).format("DD"),
                  endMonth: moment(trip.endDate).format("MM"),
                  endYear: moment(trip.endDate).format("YYYY"),
                  description: trip.description,
                  expenses: trip.expenses,
                })
              }
              key={trip._id}
              className="border border-base-300  w-[250px] lg:w-[450px]  bg-base-100 grid grid-cols-[80px_auto] p-2 rounded-md items-center md:grid-cols-[100px_auto] drop-shadow-md z-10 hover:scale-105 active:scale-95 duration-300 transition-all ease-in-out font-base text-base-text"
            >
              <img
                src={`../images/${trip.image}.png`}
                alt={`${trip.image} Trip`}
                className="w-16 h-16 md:w-24 md:h-24 rounded-md bg-base-200 text-xs "
              />
              <div className="rounded-md  flex flex-col items-center justify-between w-full h-full overflow-hidden text-balance">
                <div className="rounded-md w-full text-center lg:text-lg text-ellipsis overflow-hidden whitespace-nowrap">
                  {trip.name}
                </div>
                <div className="rounded-md text-xs lg:text-sm">
                  {moment(trip.startDate).format("DD/MM/YYYY")} -
                  {moment(trip.endDate).format("DD/MM/YYYY")}
                </div>
                <div
                  className={`rounded-md w-3/4 text-xs lg:text-sm text-center ${
                    trip.roundTrip ? "visible" : "invisible"
                  }`}
                >
                  {t("placeholders.roundTrip")}
                </div>
                <div className="rounded-md self-end text-md lg:text-lg">
                  {/*//* //this $ needs to be changed with prefered currency */}
                  {trip.roundTripCost} $
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default TripsContainer;
