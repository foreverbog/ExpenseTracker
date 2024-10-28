import { TbBeach } from "react-icons/tb";
import MenuTitleComponent from "../components/MenuTitleComponent";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";
import { MenuContextType } from "../layout/MenuLayout";

const TripsOrganizer = () => {
  const { t } = useTranslation("global");
  const { setIsMenuOpen } = useOutletContext<MenuContextType>();

  return (
    <div className="relative min-h-dvh overflow-hidden ">
      <MenuTitleComponent
        title={t("trips.title")}
        setIsMenuOpen={setIsMenuOpen}
      />

      {/* //*BOTTOM RIGHT SVG */}
      <TbBeach className="absolute -bottom-12 -right-12 2 text-[240px] md:text-[440px] opacity-20 text-base-text" />
    </div>
  );
};

export default TripsOrganizer;
