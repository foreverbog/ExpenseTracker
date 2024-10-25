import { ReactElement } from "react";
import { HomeSectionTwoBgVector } from "../assets/svg/HomeVectors";
import { useTranslation } from "react-i18next";
import { MdBarChart } from "react-icons/md";
import { TbBeach } from "react-icons/tb";
import { BsCurrencyExchange } from "react-icons/bs";
import { RiShieldUserLine } from "react-icons/ri";
import { AiOutlinePieChart } from "react-icons/ai";
import { IoColorPaletteOutline } from "react-icons/io5";

type FeaturesType = {
  icon: ReactElement;
  name: string;
  description: string;
  color: string;
};

const features: FeaturesType[] = [
  {
    icon: <MdBarChart />,
    name: "Feature1",
    description: "Feature1Description",
    color: "text-blue-600",
  },
  {
    icon: <TbBeach />,
    name: "Feature2",
    description: "Feature2Description",
    color: "text-amber-500",
  },
  {
    icon: <BsCurrencyExchange />,
    name: "Feature3",
    description: "Feature3Description",
    color: "text-green-500",
  },
  {
    icon: <RiShieldUserLine />,
    name: "Feature4",
    description: "Feature4Description",
    color: "text-red-500",
  },
  {
    icon: <AiOutlinePieChart />,
    name: "Feature5",
    description: "Feature5Description",
    color: "text-lime-400",
  },
  {
    icon: <IoColorPaletteOutline />,
    name: "Feature6",
    description: "Feature6Description",
    color: "text-indigo-600",
  },
];

const FeaturesSection = () => {
  const [t] = useTranslation("global");

  return (
    <div className="min-h-dvh relative font-base ">
      {/* *TOP SVG */}
      <HomeSectionTwoBgVector />
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-3xl md:text-6xl text-base-text">
          {t("features.titleStart")}{" "}
          <span className="text-transparent bg-clip-text font-semibold bg-gradient-to-r from-primary to-secondary">
            TrackIt{" "}
          </span>{" "}
          {t("features.titleEnd")}
        </h1>
        <p className="w-4/5 md:w-1/2 text-center text-ellipsis text-balance text-base-text text-sm md:text-lg italic">
          <span className="text-secondary font-semibold">TrackIt</span>{" "}
          {t("features.paragraph")}
        </p>
        <div className="text-base-text grid grid-cols-2 md:grid-cols-3   gap-y-11 justify-items-center z-20 mb-12 ">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="w-full flex flex-col gap-4 p-4 justify-center items-center"
            >
              <div className={`${feature.color} text-6xl md:text-8xl`}>
                {feature.icon}
              </div>
              <h2 className="text-2xl font-semibold text-center">
                {t(`features.${feature.name}`)}
              </h2>
              <p className="text-balance text-center text-lg w-4/5  italic">
                {t(`features.${feature.description}`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
