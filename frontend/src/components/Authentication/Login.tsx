import { AnimatePresence } from "framer-motion";
import { AuthFormDataType } from "../../pages/Authentication";
import LoginBigScreen from "./LoginBigScreen";
import useAuthSubmit from "../../hooks/useAuthSubmit";
import { useTranslation } from "react-i18next";
import LoginSmallScreen from "./LoginSmallScreen";

type LoginProps = {
  isShowingPassword: boolean;
  setIsShowingPassword: React.Dispatch<React.SetStateAction<boolean>>;
  isSmallScreen: boolean;
  hasAccount: boolean;
  setHasAccount: React.Dispatch<React.SetStateAction<boolean>>;
  signUpAnimationComplete: boolean;
  setLoginAnimationComplete: React.Dispatch<React.SetStateAction<boolean>>;
  authFormData: AuthFormDataType;
  setAuthFormData: React.Dispatch<React.SetStateAction<AuthFormDataType>>;
};

const Login = ({
  isSmallScreen,
  hasAccount,
  setHasAccount,
  isShowingPassword,
  setIsShowingPassword,
  signUpAnimationComplete,
  setLoginAnimationComplete,
  authFormData,
  setAuthFormData,
}: LoginProps) => {
  const API_URL: string = import.meta.env.VITE_API_SERVER;

  const [t] = useTranslation("global");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuthFormData({ ...authFormData, [name]: value });
  };
  const { isLoading, serverError, handleSubmit } = useAuthSubmit({
    url: `${API_URL}/login`,
    redirectUrl: "/",
    successMessage: t("toasters.login"),
    resetForm: () =>
      setAuthFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      }),
    authData: {
      email: authFormData.email,
      password: authFormData.password,
    },
  });
  return (
    <AnimatePresence>
      //*Small screens only the form
      {isSmallScreen && hasAccount && signUpAnimationComplete && (
        <LoginSmallScreen
          key="loginSmallScreen"
          isSmallScreen={isSmallScreen}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          isShowingPassword={isShowingPassword}
          setIsShowingPassword={setIsShowingPassword}
          setLoginAnimationComplete={setLoginAnimationComplete}
          handleChange={handleChange}
          authFormData={authFormData}
          setAuthFormData={setAuthFormData}
          isLoading={isLoading}
          serverError={serverError}
          handleSubmit={handleSubmit}
        />
      )}
      //*Big screens with logo cover
      {!isSmallScreen && (
        <LoginBigScreen
          key="loginBigScreen"
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          isShowingPassword={isShowingPassword}
          setIsShowingPassword={setIsShowingPassword}
          handleChange={handleChange}
          authFormData={authFormData}
          setAuthFormData={setAuthFormData}
          isLoading={isLoading}
          serverError={serverError}
          handleSubmit={handleSubmit}
        />
      )}
    </AnimatePresence>
  );
};

export default Login;
