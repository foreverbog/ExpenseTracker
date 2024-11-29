import { AnimatePresence, motion } from "framer-motion";
import { FemaleVector, MaleVector } from "../../assets/svg/SettingsVectors";
import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { AuthContext } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

type AvatarColorsType = {
  hairColor: string;
  skinColor: string;
};

const hairColors: string[] = [
  "#2C2A29", // Deep Black
  "#5A3A29", // Chestnut Brown
  "#D6BF86", // Golden Blonde
  "#8B3F2A", // Auburn Red
  "#A8A9AD", // Soft Gray
];
const skinColors: string[] = [
  "#FAD9C1", // Porcelain
  "#F4C49E", // Warm Ivory
  "#D9A577", // Light Tan
  "#A86B3C", // Rich Caramel
  "#70422A", // Deep Mahogany
];

const UserAvatar = () => {
  const { t } = useTranslation("global");
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useContext must be used withing AuthContextProvider");
  }
  const { user } = authContext;

  const [gender, setGender] = useState<string>("male");
  const [avatarColors, setAvatarColors] = useState<AvatarColorsType>({
    hairColor: "#2C2A29",
    skinColor: "#FAD9C1",
  });

  //*RETRIEVE THE USER PREFERED GENDER
  useEffect(() => {
    const userGender = Cookies.get("user-gender");
    const userHairColor = Cookies.get("user-hairColor");
    const userSkinColor = Cookies.get("user-skinColor");
    if (userGender) {
      setGender(userGender);
    }
    if (userSkinColor) {
      setAvatarColors((prev) => ({ ...prev, skinColor: userSkinColor }));
    }
    if (userHairColor) {
      setAvatarColors((prev) => ({ ...prev, hairColor: userHairColor }));
    }
  }, []);

  //* UPDATE THE STATE WITH USER GENDER AND SET THE COOKIES
  const handleGenderChange = (gender: string) => {
    Cookies.set("user-gender", gender, { expires: 365 });
    setGender(gender);
  };

  //*UPDATE THE COLORS STATE AND STORE IT IN COOKIES
  const handleHairColor = (color: string) => {
    setAvatarColors((prev) => ({ ...prev, hairColor: color }));
    Cookies.set("user-hairColor", color, { expires: 365 });
  };
  const handleSkinColor = (color: string) => {
    setAvatarColors((prev) => ({ ...prev, skinColor: color }));
    Cookies.set("user-skinColor", color, { expires: 365 });
  };

  return (
    <div className="flex flex-col gap-4 items-center md:justify-center text-base-text font-base">
      {/* //*AVATAR SELECTION */}
      <AnimatePresence mode="wait">
        {gender === "male" ? (
          <motion.div
            className="mt-4 md:mt-0"
            key="male"
            initial={{ opacity: 0, translateY: "20px" }}
            animate={{ opacity: 100, translateY: "0" }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0, translateY: "-20px" }}
          >
            <MaleVector
              hairColor={avatarColors.hairColor}
              skinColor={avatarColors.skinColor}
            />
          </motion.div>
        ) : (
          <motion.div
            className="mt-4 md:mt-0"
            key="female"
            initial={{ opacity: 0, translateY: "20px" }}
            animate={{ opacity: 100, translateY: "0" }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0, translateY: "-20px" }}
          >
            <FemaleVector
              hairColor={avatarColors.hairColor}
              skinColor={avatarColors.skinColor}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <h1 className="-mt-3 font-semibold md:text-lg">
        {user.firstName} {user.lastName}
      </h1>
      <h1 className="-mt-4 text-xs font-thin">{user.email}</h1>
      {/* //*DIV FOR CHANGING GENDER */}
      <div className="flex justify-center items-center text-center rounded-md  border border-base-300 bg-base relative overflow-hidden">
        <div
          className={`absolute w-[45px] h-full z-10 bg-primary top-0 left-0 ${
            gender === "female" ? "translate-x-full" : "translate-x-0"
          } transition-all duration-300 ease-in-out`}
        ></div>
        <div
          onClick={() => handleGenderChange("male")}
          className={`hover:cursor-pointer w-[45px] p-1 text-center text-xs md:text-normal z-20 ${
            gender === "male" && "text-primary-text"
          }`}
        >
          ♂
        </div>
        <div
          onClick={() => handleGenderChange("female")}
          className={`hover:cursor-pointer w-[45px] p-1 text-center text-xs md:text-normal z-20 ${
            gender === "female" && "text-primary-text"
          }`}
        >
          ♀
        </div>
      </div>

      {/*//*AVATAR CUSTOMIZATION */}
      {/* //*HAIR COLOR */}
      <div className="flex flex-col items-center gap-2">
        <div className="text-sm md:text-normal">{t("settings.hairColor")}:</div>
        <div className="flex gap-2">
          {hairColors.map((color) => (
            <div
              onClick={() => handleHairColor(color)}
              key={color}
              className={`hover:cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-300 ease-in-out w-4 h-6 md:w-5 md:h-7 rounded-full ${
                color === avatarColors.hairColor
                  ? "outline outline-2 outline-offset-1 outline-primary-lighter"
                  : ""
              }`}
              style={{ background: color }}
            ></div>
          ))}
        </div>
      </div>
      {/* //*SKIN COLOR */}
      <div className="flex flex-col items-center gap-2">
        <div className="text-sm md:text-normal">{t("settings.skinColor")}:</div>
        <div className="flex gap-2">
          {skinColors.map((color) => (
            <div
              onClick={() => handleSkinColor(color)}
              key={color}
              className={`hover:cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-300 ease-in-out w-4 h-6 md:w-5 md:h-7 rounded-full ${
                color === avatarColors.skinColor
                  ? "outline outline-2 outline-offset-1 outline-primary-lighter"
                  : ""
              }`}
              style={{ background: color }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserAvatar;
