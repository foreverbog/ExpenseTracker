import { useState } from "react";
import useTripsContext from "../hooks/useTripsContext";
import TripsLoadingSkeleton from "./TripsLoadingSkeleton";
import moment from "moment";
import { useTranslation } from "react-i18next";

type TripType = {
  id: string;
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

  const [trip, setTrip] = useState<TripType>();

  let filteredTrips;

  if (isRoundTrip && isOldestFirst) {
    filteredTrips = trips.filter((trip) => trip.roundTrip === true);
  } else if (isOldestFirst) {
    filteredTrips = trips;
  } else if (isRoundTrip) {
    filteredTrips = [...trips]
      .filter((trip) => trip.roundTrip === true)
      .reverse();
  } else {
    filteredTrips = [...trips].reverse();
  }

  if (isLoading) {
    return isLoading && <TripsLoadingSkeleton />;
  }

  return (
    <div className="flex flex-wrap gap-4 mt-12 justify-center items-center pl-2">
      {filteredTrips.map((trip) => (
        <div
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
            })
          }
          key={trip._id}
          className="border  w-[250px] lg:w-[450px]  bg-base grid grid-cols-[80px_auto] p-2 rounded-md items-center md:grid-cols-[100px_auto] drop-shadow-md z-10 hover:scale-105 active:scale-95 duration-300 transition-all ease-in-out"
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
              {trip.roundTripCost}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TripsContainer;
