import { useTranslation } from "react-i18next";
import { FaInfoCircle, FaCode } from "react-icons/fa";
import { features, frontStack, backStack } from "../utils/techStacks";
import {
  SiMongodb,
  SiExpress,
  SiReact,
  SiNodedotjs,
  SiTypescript,
} from "react-icons/si";
import { motion } from "framer-motion";
import { AboutVector } from "../assets/svg/AboutAndContactVectors";

const About = () => {
  const { t } = useTranslation("global");

  return (
    <div className="flex flex-col gap-8  pt-24 lg:pt-32 font-base text-base-text min-h-dvh relative overflow-hidden">
      {/* //*LEFT SIDE VECTOR */}
      <div className="absolute z-10 md:-left-48 md:scale-90 scale-50 -left-72 ">
        <AboutVector />
      </div>
      {/* //*ABOUT TRACKIT */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-2 p-2 text-balance justify-center items-center z-20"
      >
        {/* //*TITLE */}
        <div className="flex gap-2 items-center justify-center text-2xl font-semibold">
          <FaInfoCircle />
          <h1>
            {t("about")} <span className="text-primary">TrackIt</span>
          </h1>
        </div>

        {/* //*PARAGRAPH */}
        <p className="md:text-lg text-center italic md:w-1/2">
          TrackIt {t("features.paragraph")}
        </p>

        {/* //*LIST OF FEATURES */}
        <ul className="flex flex-col gap-2 mx-auto mt-6">
          {features.map((feature, index) => (
            <motion.li
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.3 }}
              className="grid grid-cols-2 gap-2 items-center   w-full"
              style={{ gridTemplateColumns: "20px auto" }}
            >
              <div className={`${feature.color} text-2xl `}>{feature.icon}</div>
              <p className="text-sm">{t(`features.${feature.description}`)}</p>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* //*ABOUT TECH STACK */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-4 p-2 text-balance justify-center items-center z-20"
      >
        {/* //*TITLE */}
        <div className="flex gap-2 items-center text-2xl font-semibold">
          <FaCode className="mt-1" />
          <h1>Tech Stack</h1>
        </div>

        {/* //*MERN + TS TECH STACK */}
        <div className="flex gap-4 items-center p-6">
          <SiMongodb className="text-4xl text-[#47A248]" />
          <SiExpress className="text-4xl text-base-text" />
          <SiReact className="text-4xl text-[#61DAFB]" />
          <SiNodedotjs className="text-4xl text-[#8CC84B]" />
          <SiTypescript className="text-4xl text-[#3178C6]" />
        </div>

        {/* //* GRID FOR DISPLAYING THE FRONTEND AND BACKEND TECH */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* //*FRONTEND */}
          <ul className="flex flex-col w-full gap-2">
            <h1 className="font-semibold text-lg">Frontend:</h1>
            {frontStack.map((stack, index) => (
              <motion.li
                className="grid grid-cols-2 gap-2 items-center "
                style={{ gridTemplateColumns: "150px auto" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.3 }}
              >
                <div
                  style={{ gridTemplateColumns: "50px 100px" }}
                  className="grid grid-cols-2 items-center"
                >
                  <div className="justify-self-center">{stack.icon}</div>
                  <div>{stack.name}</div>
                </div>
                <div className="w-full text-sm">
                  {t(`contact.frontend.${stack.name}`)}
                </div>
              </motion.li>
            ))}
          </ul>

          {/* //*BACKEND */}
          <ul className="flex flex-col w-full gap-2">
            <h1 className="font-semibold text-lg">Backend:</h1>
            {backStack.map((stack, index) => (
              <motion.li
                className="grid grid-cols-2 gap-2 items-center "
                style={{ gridTemplateColumns: "150px auto" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.3 }}
              >
                <div
                  style={{ gridTemplateColumns: "50px 100px" }}
                  className="grid grid-cols-2 items-center"
                >
                  <div className="justify-self-center">{stack.icon}</div>
                  <div>{stack.name}</div>
                </div>
                <div className="w-full text-sm">
                  {t(`contact.backend.${stack.name}`)}
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
