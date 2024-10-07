import { GiHouse } from "react-icons/gi";
import { MdFastfood } from "react-icons/md";
import { FaCarSide } from "react-icons/fa";
import { GiClothes } from "react-icons/gi";
import { CgPill } from "react-icons/cg";
import { MdOutlineCategory } from "react-icons/md";
import { FiGift } from "react-icons/fi";
import { IoGameControllerOutline } from "react-icons/io5";
import {
  EducationIcon,
  SportIcon,
  WellnessIcon,
  EducationIconExpenseCreator,
  SportIconExpenseCreator,
  WellnessIconExpenseCreator,
} from "../assets/svg/CategoryIcons";
import { useTranslation } from "react-i18next";

type categoryIconsType = {
  [key: string]: JSX.Element;
};

const useCategoriesIcons = () => {
  const { t } = useTranslation("global");

  const categoryIcons: categoryIconsType = {
    [t("expenses.categories.house")]: <GiHouse />,
    [t("expenses.categories.food")]: <MdFastfood />,
    [t("expenses.categories.transport")]: <FaCarSide />,
    [t("expenses.categories.clothes")]: <GiClothes />,
    [t("expenses.categories.health")]: <CgPill />,
    [t("expenses.categories.wellness")]: <WellnessIcon />,
    [t("expenses.categories.sport")]: <SportIcon />,
    [t("expenses.categories.education")]: <EducationIcon />,
    [t("expenses.categories.gift")]: <FiGift />,
    [t("expenses.categories.gaming")]: <IoGameControllerOutline />,
    [t("expenses.categories.other")]: <MdOutlineCategory />,
  };

  const categoryIconsExpenseCreator: categoryIconsType = {
    [t("expenses.categories.house")]: <GiHouse />,
    [t("expenses.categories.food")]: <MdFastfood />,
    [t("expenses.categories.transport")]: <FaCarSide />,
    [t("expenses.categories.clothes")]: <GiClothes />,
    [t("expenses.categories.health")]: <CgPill />,
    [t("expenses.categories.wellness")]: <WellnessIconExpenseCreator />,
    [t("expenses.categories.sport")]: <SportIconExpenseCreator />,
    [t("expenses.categories.education")]: <EducationIconExpenseCreator />,
    [t("expenses.categories.gift")]: <FiGift />,
    [t("expenses.categories.gaming")]: <IoGameControllerOutline />,
    [t("expenses.categories.other")]: <MdOutlineCategory />,
  };

  return { categoryIcons, categoryIconsExpenseCreator };
};

export default useCategoriesIcons;
