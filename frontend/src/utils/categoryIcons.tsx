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
} from "../assets/svg/CategoryIcons";

type categoryIconsType = {
  [key: string]: JSX.Element;
};

const categoryIcons: categoryIconsType = {
  house: <GiHouse />,
  food: <MdFastfood />,
  transport: <FaCarSide />,
  clothes: <GiClothes />,
  health: <CgPill />,
  wellness: <WellnessIcon />,
  sport: <SportIcon />,
  education: <EducationIcon />,
  gift: <FiGift />,
  gaming: <IoGameControllerOutline />,
  other: <MdOutlineCategory />,
};

export default categoryIcons;
