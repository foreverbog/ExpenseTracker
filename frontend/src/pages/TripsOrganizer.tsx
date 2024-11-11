import { TbBeach } from "react-icons/tb";
import MenuTitleComponent from "../components/Navigation/MenuTitleComponent";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";
import { MenuContextType } from "../layout/MenuLayout";
import TripsHeading from "../components/Trips/TripsHeading";
import TripsContainer from "../components/Trips/TripsContainer";
import { useState } from "react";
import TripsCreatorModal from "../components/Trips/TripsCreatorModal";
import { AnimatePresence } from "framer-motion";

const TripsOrganizer = () => {
  const { t } = useTranslation("global");
  const { setIsMenuOpen } = useOutletContext<MenuContextType>();

  //*State for opening/closing the creator modal
  const [isTripCreatorOpen, setIsTripCreatorOpen] = useState(false);

  // *States for filtering the trips array
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [isOldestFirst, setIsOldestFirst] = useState(false);

  // console.log(isTripCreatorOpen);

  return (
    <div className="relative min-h-dvh overflow-hidden bg-base">
      <MenuTitleComponent
        title={t("trips.title")}
        setIsMenuOpen={setIsMenuOpen}
      />
      {/* //*Add btn and filters */}
      <TripsHeading
        setIsTripCreatorOpen={setIsTripCreatorOpen}
        isRoundTrip={isRoundTrip}
        setIsRoundTrip={setIsRoundTrip}
        isOldestFirst={isOldestFirst}
        setIsOldestFirst={setIsOldestFirst}
      />
      {/* //*Where all the trips render */}
      <TripsContainer isRoundTrip={isRoundTrip} isOldestFirst={isOldestFirst} />

      {/* //*Modal for the trip creator form */}
      <AnimatePresence>
        {isTripCreatorOpen && (
          <TripsCreatorModal
            isTripCreatorOpen={isTripCreatorOpen}
            setIsTripCreatorOpen={setIsTripCreatorOpen}
          />
        )}
      </AnimatePresence>
      {/* //*BOTTOM RIGHT SVG */}
      <TbBeach className="absolute -bottom-8 -right-8 md:-bottom-18 md:-right-10 text-[240px] md:text-[440px] opacity-20 text-base-text" />
    </div>
  );
};

export default TripsOrganizer;
