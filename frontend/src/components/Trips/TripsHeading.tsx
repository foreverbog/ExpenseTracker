import { useTranslation } from "react-i18next";
import AddBtn from "../Common/AddBtn";

type TripsHeadingProps = {
  setIsTripCreatorOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isRoundTrip: boolean;
  setIsRoundTrip: React.Dispatch<React.SetStateAction<boolean>>;
  isOldestFirst: boolean;
  setIsOldestFirst: React.Dispatch<React.SetStateAction<boolean>>;
};

const TripsHeading: React.FC<TripsHeadingProps> = ({
  setIsTripCreatorOpen,
  isRoundTrip,
  setIsRoundTrip,
  isOldestFirst,
  setIsOldestFirst,
}) => {
  const { t } = useTranslation("global");

  return (
    <div className="mx-auto flex flex-col gap-6 justify-between items-center w-4/5 lg:w-2/5 mt-12 md:flex md:flex-row font-base">
      <div className="flex flex-col">
        <div className="flex  gap-4 items-center">
          <div className="relative inline-block mt-2">
            <input
              onChange={() => setIsRoundTrip((prev) => !prev)}
              checked={isRoundTrip}
              type="checkbox"
              className="peer h-4 w-8 md:h-6 md:w-12 cursor-pointer appearance-none rounded-full border-2 border-base-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset checked:border-primary"
            />
            <span className="pointer-events-none absolute left-1 top-1  block h-3 w-3 md:h-4 md:w-4 rounded-full bg-base-300 transition-all duration-200 peer-checked:left-4 md:peer-checked:left-7 peer-checked:bg-primary"></span>
          </div>
          <div className="text-normal md:text-md">
            {t("trips.onlyRoundTrips")}
          </div>
        </div>
        <div className="flex  gap-4 items-center">
          <div className="relative inline-block mt-2">
            <input
              onChange={() => setIsOldestFirst((prev) => !prev)}
              checked={isOldestFirst}
              type="checkbox"
              className="peer h-4 w-8 md:h-6 md:w-12 cursor-pointer appearance-none rounded-full border-2 border-base-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset checked:border-primary"
            />
            <span className="pointer-events-none absolute left-1 top-1  block h-3 w-3 md:h-4 md:w-4 rounded-full bg-base-300 transition-all duration-200 peer-checked:left-4 md:peer-checked:left-7 peer-checked:bg-primary"></span>
          </div>
          <div className="text-normal md:text-md">Oldest first</div>
        </div>
      </div>
      <AddBtn
        className="w-1/3 self-center md:w-auto"
        btnText={t("trips.newTripBtn")}
        setIsModalOpen={setIsTripCreatorOpen}
      />
    </div>
  );
};

export default TripsHeading;
