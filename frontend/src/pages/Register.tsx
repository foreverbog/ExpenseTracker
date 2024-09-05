import { useState } from "react";
import { motion } from "framer-motion";
import useMediaQuery from "../hooks/useMediaQuery";
import Signup from "../components/Signup";
import Login from "../components/Login";

const Register = () => {
  const [hasAccount, setHasAccount] = useState(false);
  const [signUpAnimationComplete, setSignUpAnimationComplete] = useState(false);
  const [loginAnimationComplete, setLoginAnimationComplete] = useState(true);
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  //! MAKE 2 BTN FOR SMALL AND BIG SCREENS - ANIMATION AND FOR GRID

  return (
    <div className="min-h-dvh  p-24 flex justify-center items-center ">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className=" relative    md:grid md:grid-cols-2 rounded-md   bg-base-100  h-[700px] w-[1200px] overflow-hidden drop-shadow-2xl"
      >
        {/* //*LEFT SIDE GRID -- Sign Up */}

        <Signup
          isSmallScreen={isSmallScreen}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          signUpAnimationComplete={signUpAnimationComplete}
          setSignUpAnimationComplete={setSignUpAnimationComplete}
          loginAnimationComplete={loginAnimationComplete}
          setLoginAnimationComplete={setLoginAnimationComplete}
        />
        {/* //*RIGHT SIDE GRID -- Login */}

        <Login
          isSmallScreen={isSmallScreen}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          signUpAnimationComplete={signUpAnimationComplete}
          setSignUpAnimationComplete={setSignUpAnimationComplete}
          loginAnimationComplete={loginAnimationComplete}
          setLoginAnimationComplete={setLoginAnimationComplete}
        />
      </motion.div>
    </div>
  );
};

export default Register;
