import { useTranslation } from "react-i18next";
import { MultipleDevicesVector } from "../../assets/svg/HomeVectors";

const MultipleDevicesSection = () => {
  const [t] = useTranslation("global");
  return (
    <div className="relative bg-cover bg-center  flex  flex-wrap  justify-center items-center  gap-12 font-base text-base-text  py-36 min-h-dvh overflow-hidden ">
      <div className="absolute z-10 -inset-24">
        <MultipleDevicesVector />
      </div>
      <div className="flex flex-col items-center justify-center gap-12  md:w-1/2  z-20">
        <h2 className="text-3xl md:text-6xl text-center self-center ">
          {t("devices.title")}
        </h2>
        <p className=" md:w-4/5 text-center text-lg italic text-balance">
          <span className="text-secondary font-semibold ">TrackIt</span>{" "}
          {t("devices.paragraph")}
        </p>
      </div>
      <img
        className="h-[340px] z-20"
        src="./images/comp.png"
        alt="d"
        width={324}
      />
    </div>
  );
};

export default MultipleDevicesSection;
