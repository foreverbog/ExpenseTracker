import FeaturesSection from "../components/Landing/FeaturesSection";
import Landing from "../components/Landing/Landing";
import UserFeedbackSection from "../components/Landing/UserFeedbackSection";
import MultipleDevicesSection from "../components/Landing/MultipleDevicesSection";

const Home = () => {
  return (
    <div className="bg-base">
      <Landing />
      <FeaturesSection />

      <MultipleDevicesSection />
      <UserFeedbackSection />
    </div>
  );
};

export default Home;
