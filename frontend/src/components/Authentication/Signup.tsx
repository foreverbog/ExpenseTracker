import { AnimatePresence } from "framer-motion";
import { AuthFormDataType } from "../../pages/Authentication";
import useAuthSubmit from "../../hooks/useAuthSubmit";
import SignupSmallScreen from "./SignupSmallScreen";
import { useTranslation } from "react-i18next";
import SignupBigScreen from "./SignupBigScreen";

type SignupProps = {
  isShowingPassword: boolean;
  setIsShowingPassword: React.Dispatch<React.SetStateAction<boolean>>;
  isSmallScreen: boolean;
  hasAccount: boolean;
  setHasAccount: React.Dispatch<React.SetStateAction<boolean>>;
  setSignUpAnimationComplete: React.Dispatch<React.SetStateAction<boolean>>;
  loginAnimationComplete: boolean;
  authFormData: AuthFormDataType;
  setAuthFormData: React.Dispatch<React.SetStateAction<AuthFormDataType>>;
};

const Signup: React.FC<SignupProps> = ({
  isShowingPassword,
  setIsShowingPassword,
  isSmallScreen,
  hasAccount,
  setHasAccount,
  setSignUpAnimationComplete,
  loginAnimationComplete,
  authFormData,
  setAuthFormData,
}) => {
  const deployedUrl = "https://extr-backend.onrender.com";
  // const local = "http://localhost:8080";
  const [t] = useTranslation("global");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuthFormData({ ...authFormData, [name]: value });
  };
  const { isLoading, serverError, handleSubmit } = useAuthSubmit({
    url: `${deployedUrl}/signup`,
    redirectUrl: "/",
    succesMessage: t("auth.signupToast", {
      firstName: authFormData.firstName,
    }),
    resetForm: () =>
      setAuthFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      }),
    authData: {
      firstName: authFormData.firstName,
      lastName: authFormData.lastName,
      email: authFormData.email,
      password: authFormData.password,
      confirmPassword: authFormData.confirmPassword,
    },
  });

  return (
    <AnimatePresence>
      //*Small screens only the form
      {isSmallScreen && !hasAccount && loginAnimationComplete && (
        <SignupSmallScreen
          key="signupSmallScreen"
          isShowingPassword={isShowingPassword}
          setIsShowingPassword={setIsShowingPassword}
          isSmallScreen={isSmallScreen}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          setSignUpAnimationComplete={setSignUpAnimationComplete}
          loginAnimationComplete={loginAnimationComplete}
          authFormData={authFormData}
          handleChange={handleChange}
          isLoading={isLoading}
          serverError={serverError}
          handleSubmit={handleSubmit}
        />
      )}
      //*Big screens with logo cover
      {!isSmallScreen && (
        <SignupBigScreen
          key="signupBigScreen"
          isShowingPassword={isShowingPassword}
          setIsShowingPassword={setIsShowingPassword}
          isSmallScreen={isSmallScreen}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          setSignUpAnimationComplete={setSignUpAnimationComplete}
          loginAnimationComplete={loginAnimationComplete}
          authFormData={authFormData}
          handleChange={handleChange}
          isLoading={isLoading}
          serverError={serverError}
          handleSubmit={handleSubmit}
        />
      )}
    </AnimatePresence>
  );
};

export default Signup;
