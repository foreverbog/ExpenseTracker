import { useTranslation } from "react-i18next";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { ContactVector } from "../assets/svg/AboutAndContactVectors";

const Contact = () => {
  const { t } = useTranslation("global");
  return (
    <div className="flex-1 text-base-text pt-36 lg:pt-48 px-2 text-balance font-base flex flex-col gap-4 relative overflow-hidden">
      {/* //*VECTOR BOTTOM RIGHT */}
      <div className="absolute right-0 bottom-0 -rotate-45 z-10 ">
        <ContactVector />
      </div>

      {/* //*TITLE */}
      <h1 className="text-2xl lg:text-4xl text-center font-semibold z-20">
        {t("contact.title")} <span className="text-primary">TrackIt!</span>
      </h1>

      {/* //*tEXT */}
      <p className="text-lg text-center lg:w-1/2 lg:mx-auto lg:text-xl z-20">
        {t("contact.paragraph")}
      </p>

      {/* //*LINKS TO LINKEDIN AND GITHUB */}
      <div className="flex gap-12 mx-auto mt-12 z-20">
        <a
          className=" active:scale-95 hover:scale-105 tansition-all duration-300 ease-in-out"
          href="https://www.linkedin.com/in/lazar-bogdan/"
          rel="noreferrer"
          target="_blank"
        >
          <FaLinkedin className="text-6xl" />
        </a>
        <a
          className=" active:scale-95 hover:scale-105 tansition-all duration-300 ease-in-out"
          href="https://github.com/foreverbog"
          rel="noreferrer"
          target="_blank"
        >
          <FaGithub className="text-6xl" />
        </a>
      </div>

      {/* //*LINKS TO GITHUB REPO */}
      <a
        className="mt-4 text-center flex justify-center items-center gap-2 bg-primary rounded-md p-4 text-primary-text mx-auto hover:bg-primary-darker active:scale-95 hover:scale-105 tansition-all duration-300 ease-in-out z-20"
        href="https://github.com/foreverbog/TrackIt"
        rel="noreferrer"
        target="_blank"
      >
        <p> {t("contact.viewCode")} </p>
        <FaGithub className="text-xl" />
      </a>
    </div>
  );
};

export default Contact;
