import FeaturesSection from "../components/FeaturesSection";
import Landing from "../components/Landing";
import UserFeedbackSection from "../components/UserFeedbackSection";
import MultipleDevicesSection from "../components/MultipleDevicesSection";

const Home = () => {
  return (
    <div className="bg-base">
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
