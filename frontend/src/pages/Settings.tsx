import UserAvatar from "../components/UserProfile/UserAvatar";
import UserCurrency from "../components/UserProfile/UserCurrency";
import UserSettings from "../components/UserProfile/UserSettings";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import UserDeleteAccount from "../components/UserProfile/UserDeleteAccount";

const Settings = () => {
  const { t } = useTranslation("global");

  return (
    //* SMALL SCREEN - PHONES -  MAX -767px
    <div className="bg-base min-h-dvh flex flex-col gap-4 overflow-scroll relative">
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
      <UserCurrency />

      {/*//*USER DELETE PROFILE BTN AND MODAL */}
      <UserDeleteAccount />
    </div>
    // <div className="min-h-dvh   xs:p-6 sm:p-24 flex justify-center items-center bg-base-100 text-base-text font-base ">
    //   <div className=" relative md:grid md:grid-cols-2 md:rounded-md   bg-base  min-h-dvh md:h-[700px] w-[1200px] overflow-hidden drop-shadow-2xl">
    //     {/* <div className="flex flex-col items-center bg-base-100 text-base-text font-base border border-red-500 ">
    //       <AnimatePresence mode="wait">
    //         {gender === "male" ? (
    //           <motion.div
    //             className="mt-12"
    //             key="male"
    //             initial={{ opacity: 0, translateY: "20px" }}
    //             animate={{ opacity: 100, translateY: "0" }}
    //             transition={{ duration: 0.2 }}
    //             exit={{ opacity: 0, translateY: "-20px" }}
    //           >
    //             <MaleVector
    //               hairColor={avatarColors.hairColor}
    //               skinColor={avatarColors.skinColor}
    //             />
    //           </motion.div>
    //         ) : (
    //           <motion.div
    //             className="mt-12"
    //             key="female"
    //             initial={{ opacity: 0, translateY: "20px" }}
    //             animate={{ opacity: 100, translateY: "0" }}
    //             transition={{ duration: 0.2 }}
    //             exit={{ opacity: 0, translateY: "-20px" }}
    //           >
    //             <FemaleVector />
    //           </motion.div>
    //         )}
    //       </AnimatePresence>
    //       <div className="flex text-center rounded-md divide-x border bg-base relative overflow-hidden mt-6 col-start-1 col-end-1">
    //         <div
    //           className={`absolute w-[45px] h-full z-10 bg-primary top-0 left-0 ${
    //             gender === "female" ? "translate-x-full" : "translate-x-0"
    //           } transition-all duration-300 ease-in-out`}
    //         ></div>
    //         <div
    //           onClick={() => handleGenderChange("male")}
    //           className={`hover:cursor-pointer w-[45px] text-center text-xs z-20 ${
    //             gender === "male" && "text-primary-text"
    //           }`}
    //         >
    //           Male
    //         </div>
    //         <div
    //           onClick={() => handleGenderChange("female")}
    //           className={`hover:cursor-pointer w-[45px] text-center text-xs z-20 ${
    //             gender === "female" && "text-primary-text"
    //           }`}
    //         >
    //           Female
    //         </div>
    //       </div>
    //     </div> */}

    //   </div>
    // </div>
  );
};

export default Settings;
