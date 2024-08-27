import { ReactElement } from "react";
import { HomeSectionTwoBgVector } from "../assets/svg/HomeVectors";
import { AiFillAlert } from "react-icons/ai";
import { AiFillAliwangwang } from "react-icons/ai";

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
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    color: "text-green-300",
  },
  {
    icon: <AiFillAliwangwang />,
    name: "Feature2",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    color: "text-red-300",
  },
  {
    icon: <AiFillAlert />,
    name: "Feature3",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    color: "text-red-300",
  },
  {
    icon: <AiFillAliwangwang />,
    name: "Feature 4",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    color: "text-blue-300",
  },
  {
    icon: <AiFillAliwangwang />,
    name: "Feature 5",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    color: "text-cyan-300",
  },
  {
    icon: <AiFillAliwangwang />,
    name: "Feature 6",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    color: "text-gray-300",
  },
];

const FeaturesSection = () => {
  return (
    <div className="min-h-dvh relative border-b-2 border-b-orange-500">
      {/* *TOP SVG */}
      <HomeSectionTwoBgVector />
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-6xl text-base-text">AppName features:</h1>
        <p className="w-1/2 text-center text-ellipsis text-balance text-base-text">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique
          cumque laboriosam vero repellat ullam aliquid magni nostrum autem nisi
          quas iste, dicta rerum, quisquam totam. Quaerat culpa commodi quam
          voluptates?
        </p>
        <div className="text-base-text grid grid-cols-3  w-4/5  justify-items-center z-20 mb-12 ">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="w-full flex flex-col gap-4 p-4 justify-center items-center "
            >
              <div className={`${feature.color} text-8xl`}>{feature.icon}</div>
              <h2 className="text-2xl">{feature.name}</h2>
              <p className="text-balance text-center text-lg w-1/2">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
