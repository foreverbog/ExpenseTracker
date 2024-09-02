import { ReactElement } from "react";
import { HomeSectionTwoBgVector } from "../assets/svg/HomeVectors";
import { AiFillAlert } from "react-icons/ai";
import { AiFillAliwangwang } from "react-icons/ai";
import { useTranslation } from "react-i18next";

type FeaturesType = {
  icon: ReactElement;
  name: string;
  description: string;
  color: string;
};

const features: FeaturesType[] = [
  {
    icon: <AiFillAlert />,
    name: "Feature1",
    description: "Feature1Description",
    color: "text-green-300",
  },
  {
    icon: <AiFillAliwangwang />,
    name: "Feature2",
    description: "Feature2Description",
    color: "text-red-300",
  },
  {
    icon: <AiFillAlert />,
    name: "Feature3",
    description: "Feature3Description",
    color: "text-red-300",
  },
  {
    icon: <AiFillAliwangwang />,
    name: "Feature4",
    description: "Feature4Description",
    color: "text-blue-300",
  },
  {
    icon: <AiFillAliwangwang />,
    name: "Feature5",
    description: "Feature5Description",
    color: "text-cyan-300",
  },
  {
    icon: <AiFillAliwangwang />,
    name: "Feature6",
    description: "Feature6Description",
    color: "text-gray-300",
  },
];

const FeaturesSection = () => {
  const [t] = useTranslation("global");

  return (
    <div className="min-h-dvh relative border-b-2 font-base border-b-orange-500">
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
        <p className="w-4/5 md:w-1/2 text-center text-ellipsis text-balance text-base-text text-sm md:text-lg">
          {t("features.paragraph")}
        </p>
        <div className="text-base-text grid grid-cols-2 md:grid-cols-3  w-4/5  justify-items-center z-20 mb-12 ">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="w-full flex flex-col gap-4 p-4 justify-center items-center "
            >
              <div className={`${feature.color} text-6xl md:text-8xl`}>
                {feature.icon}
              </div>
              <h2 className="text-2xl font-semibold">
                {t(`features.${feature.name}`)}
              </h2>
              <p className="text-balance text-center text-lg md:w-1/2 italic">
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
