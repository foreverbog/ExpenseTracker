import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useTranslation("global");

  return (
    <div className="bg-base-200 relative flex flex-col justify-center items-center font-base p-6 gap-4 text-base-text ">
      <div className="flex gap-12 ">
        <Link
          to="/about"
          className="text-xl hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          {t("nav.about")}
        </Link>
        <Link
          to="/contact"
          className="text-xl hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          {t("nav.contact")}
        </Link>
      </div>
      <div className="flex gap-4 ">
        <a
          className="hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"
          href="https://www.facebook.com"
          rel="noreferrer"
          target="_blank"
        >
          <FaFacebookF className="text-xl md:text-3xl " />
        </a>
        <a
          className="hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"
          href="https://x.com"
          rel="noreferrer"
          target="_blank"
        >
          <FaXTwitter className="text-xl md:text-3xl " />
        </a>
        <a
          className="hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"
          href="https://github.com/foreverbog"
          rel="noreferrer"
          target="_blank"
        >
          <FaGithub className="text-xl md:text-3xl " />
        </a>
        <a
          className="hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"
          href="https://www.linkedin.com/in/lazar-bogdan/"
          rel="noreferrer"
          target="_blank"
        >
          <FaLinkedin className="text-xl md:text-3xl " />
        </a>
        <a
          className="hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"
          href="https://www.instagram.com"
          rel="noreferrer"
          target="_blank"
        >
          <FaInstagramSquare className="text-xl md:text-3xl " />
        </a>
      </div>
      <div className="text-balance text-xs text-center md:text-sm">
        {t("footerCopyright")}
      </div>
    </div>
  );
};

export default Footer;
