import { useTranslation } from "react-i18next";
import { MultipleDevicesVector } from "../../assets/svg/HomeVectors";
import { useRef } from "react";
import { useInView } from "framer-motion";

const MultipleDevicesSection = () => {
  const { t } = useTranslation("global");
  const textRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const isTextInView = useInView(textRef, { once: true });
  const isImageInView = useInView(imageRef, { once: true });

  return (
    <div className="relative bg-cover bg-center  flex  flex-wrap justify-center   items-center gap-24 md:gap-4 font-base text-base-text  py-36 min-h-dvh overflow-hidden ">
      <div className="absolute z-10 -inset-24">
        <MultipleDevicesVector />
      </div>
      <div
        ref={textRef}
        className={`flex flex-col items-center justify-center gap-12  md:w-1/2  z-20 transition-all duration-500 ease-in-out ${
          isTextInView
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-24"
        }`}
      >
        <h2 className="text-3xl md:text-6xl text-center self-center ">
          {t("devices.title")}
        </h2>
        <p className=" md:w-4/5 text-center text-lg italic text-balance ">
          <span className="text-secondary font-semibold ">TrackIt</span>{" "}
          {t("devices.paragraph")}
        </p>
      </div>
      <img
        ref={imageRef}
        className={` md:w-1/3 z-20 transition-all duration-500 ease-in-out ${
          isImageInView
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-24"
        }`}
        src="./images/multiDevices.png"
        alt="multiple Devices"
      />
    </div>
  );
};

export default MultipleDevicesSection;
