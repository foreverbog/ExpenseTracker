import { useState } from "react";
import { motion } from "framer-motion";
import useMediaQuery from "../hooks/useMediaQuery";
import Signup from "../components/Signup";
import Login from "../components/Login";

export type AuthFormDataType = {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

const Authentication: React.FC = () => {
  const [hasAccount, setHasAccount] = useState(false);
  const [signUpAnimationComplete, setSignUpAnimationComplete] = useState(false);
  const [loginAnimationComplete, setLoginAnimationComplete] = useState(true);
  const isSmallScreen = useMediaQuery("(max-width: 767px)");
  const [isShowingPassword, setIsShowingPassword] = useState(false);
  const [authFormData, setAuthFormData] = useState<AuthFormDataType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <div className="min-h-dvh  p-2 xs:p-6 sm:p-24 flex justify-center items-center bg-base-100 text-base-text font-base ">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className=" relative    md:grid md:grid-cols-2 rounded-md   bg-base  h-[700px] w-[1200px] overflow-hidden drop-shadow-2xl"
      >
        {/* //*LEFT SIDE GRID -- Sign Up */}

        <Signup
          isShowingPassword={isShowingPassword}
          setIsShowingPassword={setIsShowingPassword}
          isSmallScreen={isSmallScreen}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          setSignUpAnimationComplete={setSignUpAnimationComplete}
          loginAnimationComplete={loginAnimationComplete}
          authFormData={authFormData}
          setAuthFormData={setAuthFormData}
        />
        {/* //*RIGHT SIDE GRID -- Login */}

        <Login
          isShowingPassword={isShowingPassword}
          setIsShowingPassword={setIsShowingPassword}
          isSmallScreen={isSmallScreen}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          setLoginAnimationComplete={setLoginAnimationComplete}
          signUpAnimationComplete={signUpAnimationComplete}
          authFormData={authFormData}
          setAuthFormData={setAuthFormData}
        />
      </motion.div>
    </div>
  );
};

export default Authentication;
