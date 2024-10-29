import { TbBeach } from "react-icons/tb";
import MenuTitleComponent from "../components/MenuTitleComponent";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";
import { MenuContextType } from "../layout/MenuLayout";
import useTripsContext from "../hooks/useTripsContext";

const TripsOrganizer = () => {
  const { t } = useTranslation("global");
  const { setIsMenuOpen } = useOutletContext<MenuContextType>();
  const { trips } = useTripsContext();

  console.log(trips);

  return (
    <div className="relative min-h-dvh overflow-hidden">
      <MenuTitleComponent
        title={t("trips.title")}
        setIsMenuOpen={setIsMenuOpen}
      />
      {trips?.map((trip) => (
        <div className="pl-6">
          <div>{trip?.name}</div>
          <div>{trip?.image}</div>
          <div>{trip?.roundTrip}</div>
          <div>{trip?.roundTripCost}</div>
          <div>{trip?.startDate}</div>
          <div>{trip?.endDate}</div>
          <div>{trip?.description}</div>
          <div>
            {trip?.expenses?.map((expense) => (
              <div>{expense.name}</div>
            ))}
          </div>
        </div>
      ))}
      {/* //*BOTTOM RIGHT SVG */}
      <TbBeach className="absolute -bottom-8 -right-8 md:-bottom-18 md:-right-10 text-[240px] md:text-[440px] opacity-20 text-base-text" />
    </div>
  );
};

export default TripsOrganizer;
