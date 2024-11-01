import { TbBeach } from "react-icons/tb";
import MenuTitleComponent from "../components/MenuTitleComponent";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";
import { MenuContextType } from "../layout/MenuLayout";
import TripsHeading from "../components/TripsHeading";
import TripsContainer from "../components/TripsContainer";
import { useState } from "react";
import TripsCreatorModal from "../components/TripsCreatorModal";
import { AnimatePresence } from "framer-motion";

const TripsOrganizer = () => {
  const { t } = useTranslation("global");
  const { setIsMenuOpen } = useOutletContext<MenuContextType>();

  //*State for opening/closing the creator modal
  const [isTripCreatorOpen, setIsTripCreatorOpen] = useState(false);

  console.log(isTripCreatorOpen);

  return (
    <div className="relative min-h-dvh overflow-hidden bg-base">
      <MenuTitleComponent
        title={t("trips.title")}
        setIsMenuOpen={setIsMenuOpen}
      />
      {/* //*Add btn and filters */}
      <TripsHeading setIsTripCreatorOpen={setIsTripCreatorOpen} />
      {/* //*Where all the trips render */}
      <TripsContainer />

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
