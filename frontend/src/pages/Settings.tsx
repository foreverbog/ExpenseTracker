import UserAvatar from "../components/UserProfile/UserAvatar";
import UserCurrency from "../components/UserProfile/UserCurrency";
import UserSettings from "../components/UserProfile/UserSettings";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import UserDeleteAccount from "../components/UserProfile/UserDeleteAccount";
import { useState } from "react";

const Settings = () => {
  const { t } = useTranslation("global");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      {/* //* SMALL SCREEN - PHONES -  MAX -767px */}
      <div className="bg-base min-h-dvh flex flex-col gap-4 overflow-scroll relative md:hidden">
        {/* //*LINK TO GO BACK HOME */}
        <Link
          to="/"
          className="flex items-center gap-2 p-2 hover:cursor-pointer group w-[180px] text-base-text "
        >
          <FaHome className="group-hover:scale-105 transition-transform duration-300 ease-in-out text-xs" />
          <p className="group-hover:scale-105 transition-transform duration-300 ease-in-out text-xs underline">
            {t("auth.home")}
          </p>
        </Link>

        {/*//*USER AVATAR CUSTOMIZATION */}
        <UserAvatar />

        {/*//*USER NAMES UPDATING */}
        <UserSettings />

        {/*//*USER CURRENCY PREF*/}
        <UserCurrency
          setIsDropdownOpen={setIsDropdownOpen}
          isDropdownOpen={isDropdownOpen}
        />

        {/*//*USER DELETE PROFILE BTN AND MODAL */}
        <UserDeleteAccount isDropdownOpen={isDropdownOpen} />
      </div>

      {/* //*BIGGER SCREENS - FROM 768 px */}
      <div className="hidden min-h-dvh lg:p-24 md:flex justify-center items-center bg-base-100 text-base-text font-base ">
        <div className=" relative md:grid md:grid-cols-2 rounded-md   bg-base  h-[700px] w-[1200px] overflow-hidden drop-shadow-2xl">
          <Link
            to="/"
            className="absolute flex items-center gap-2 p-2 hover:cursor-pointer group w-[250px] text-base-text "
          >
            <FaHome className="group-hover:scale-105 transition-transform duration-300 ease-in-out text-lg" />
            <p className="group-hover:scale-105 transition-transform duration-300 ease-in-out text-normal underline">
              {t("auth.home")}
            </p>
          </Link>
          <UserAvatar />
          <div className="flex flex-col justify-between items-center">
            <div className="w-full">
              <UserSettings />
              <UserCurrency
                setIsDropdownOpen={setIsDropdownOpen}
                isDropdownOpen={isDropdownOpen}
              />
            </div>
            <UserDeleteAccount isDropdownOpen={isDropdownOpen} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
