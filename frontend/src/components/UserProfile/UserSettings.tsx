import { AnimatePresence, motion } from "framer-motion";
import { useContext, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { AuthContext } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import usePut from "../../hooks/usePut";
import Loading from "../Loading/Loading";
import useMediaQuery from "../../hooks/useMediaQuery";

type UserForm = {
  firstName: string;
  lastName: string;
};

const UserSettings = () => {
  const API_URL: string = import.meta.env.VITE_API_SERVER;
  const isSmallScreen = useMediaQuery("(max-width: 767px)");
  const { t } = useTranslation("global");
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useContext must be used withing AuthContextProvider!");
  }

  const { user, refetchUser } = authContext;

  //*STATE FOR STORING THE FIRST AND LAST NAME TO MAKE THE POST REQUEST
  const [userForm, setUserForm] = useState<UserForm>({
    firstName: user.firstName,
    lastName: user.lastName,
  });

  //* STATE TO KEEP TRACK IF THE ACC DETAILS TAB IS OPEN
  const [isAccDetailsOpen, setIsAccDetailsOpen] = useState(false);

  //* HANDLE INPUT FUNCTION
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUserForm((prev) => ({ ...prev, [name]: value }));
  };

  const { handlePut, isLoading, serverError } = usePut({
    url: `${API_URL}/${user.id}`,
    formData: {
      firstName: userForm.firstName,
      lastName: userForm.lastName,
    },
    successMessage: t("toasters.edit", { feature: t("profile") }),
  });

  //*UPDATE THE USER AND REFRESH THE PAGE
  const handleUserUpdateSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    await handlePut(e);
    refetchUser();
  };

  return (
    <div className="flex flex-col font-base overflow-hidden mt-6 md:mt-32 text-base-text w-full">
      <div
        onClick={() => setIsAccDetailsOpen((prev) => !prev)}
        className=" flex items-center border-b-2  border-base-300 md:border-b md:border-b-primary text-lg text-center "
      >
        <h1 className="flex-1 text-balance md:text-start md:bg-base-100 md:p-2 md:rounded-md md:font-semibold">
          {t("settings.userInfo")}
        </h1>
        <IoMdArrowDropdown
          className={`text-2xl transition-transform duration-500 ease-in-out md:hidden  ${
            isAccDetailsOpen && "rotate-180"
          }`}
        />
      </div>

      {/* //*ANIMATION TOP OPEN THE FORM ON SMALLER SCREENS */}
      <AnimatePresence>
        {isAccDetailsOpen && isSmallScreen && (
          <motion.form
            onSubmit={handleUserUpdateSubmit}
            initial={{ translateY: "-20px", opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            exit={{
              translateY: "-20px",
              opacity: 0,
              transition: { duration: 0.2 },
            }}
            className="overflow-hidden flex flex-col items-center justify-center mt-2 "
          >
            {isLoading && <Loading text={t("loading")} />}
            {serverError && (
              <p className="text-red-500 font-semibold text-balance text-center">
                {t(`serverError.${serverError}`)}
              </p>
            )}
            <input
              onChange={handleInputChange}
              value={userForm.firstName}
              id="firstName"
              name="firstName"
              type="text"
              className="inputStyle bg-transparent"
              placeholder={t("auth.firstName")}
            />
            <input
              onChange={handleInputChange}
              value={userForm.lastName}
              id="lastName"
              name="lastName"
              type="text"
              className="inputStyle bg-transparent"
              placeholder={t("auth.lastName")}
            />

            <button className="bg-primary text-primary-text font-semibold rounded-md px-4 py-2 hover:scale-105 active:scale-95 transition-transform duration-300 ease-in-out mt-4">
              {t("update")}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* //*FORM FOR BIGGER SCREENS ALLWAYS OPENED - NO ANITMATIONS*/}
      <form
        onSubmit={handleUserUpdateSubmit}
        className="overflow-hidden hidden md:flex flex-col items-center justify-center mt-2 "
      >
        {isLoading && <Loading text={t("loading")} />}
        {serverError && (
          <p className="text-red-500 font-semibold text-balance text-center">
            {t(`serverError.${serverError}`)}
          </p>
        )}
        <input
          onChange={handleInputChange}
          value={userForm.firstName}
          id="firstName"
          name="firstName"
          type="text"
          className="inputStyle bg-transparent"
          placeholder={t("auth.firstName")}
        />
        <input
          onChange={handleInputChange}
          value={userForm.lastName}
          id="lastName"
          name="lastName"
          type="text"
          className="inputStyle bg-transparent"
          placeholder={t("auth.lastName")}
        />

        <button className="bg-primary text-primary-text font-semibold rounded-md px-4 py-2 hover:scale-105 active:scale-95 transition-transform duration-300 ease-in-out mt-4">
          {t("update")}
        </button>
      </form>
    </div>
  );
};

export default UserSettings;
