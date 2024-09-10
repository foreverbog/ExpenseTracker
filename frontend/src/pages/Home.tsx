import FeaturesSection from "../components/FeaturesSection";
import Landing from "../components/Landing";
import UserFeedbackSection from "../components/UserFeedbackSection";
import MultipleDevicesSection from "../components/MultipleDevicesSection";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useContext must be used within an AuthContextProvider");
  }
  const { user, logout } = authContext;
  return (
    <div className="bg-base">
      <p>{user?.email}</p>
      <Landing />
      <FeaturesSection />
      <div
        className="bg-cover bg-center"
        style={{ backgroundImage: "url('./images/blob-scatter-haikei.svg')" }}
      >
        <MultipleDevicesSection />
        <UserFeedbackSection />
      </div>
    </div>
  );
};

export default Home;
