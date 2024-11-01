import useTripsContext from "../hooks/useTripsContext";
import TripsLoadingSkeleton from "./TripsLoadingSkeleton";
import moment from "moment";

const TripsContainer = () => {
  const { trips, isLoading } = useTripsContext();
  //   const onlyRoundTrips = trips.filter((trip) => trip.roundTrip === true);

  console.log(trips);
  //   console.log(onlyRoundTrips);

  if (isLoading) {
    return isLoading && <TripsLoadingSkeleton />;
  }
  return (
    <div className="flex flex-wrap gap-4 mt-12 justify-center items-center">
      {trips?.map((trip) => (
        <div
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
              className={`rounded-md w-2/4 text-xs lg:text-sm text-center ${
                trip.roundTrip ? "visible" : "invisible"
              }`}
            >
              Round Trip
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
