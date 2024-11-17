import FeaturesSection from "../components/Landing/FeaturesSection";
import Landing from "../components/Landing/Landing";
import UserFeedbackSection from "../components/Landing/UserFeedbackSection";
import MultipleDevicesSection from "../components/Landing/MultipleDevicesSection";
// import CookiesInfo from "../components/Landing/CookiesInfo";

const Home = () => {
  return (
    <div className="bg-base relative">
      <Landing />
      <FeaturesSection />
      <MultipleDevicesSection />
      <UserFeedbackSection />
    </div>
  );
};

export default Home;
