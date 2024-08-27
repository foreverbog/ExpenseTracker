import FeaturesSection from "../components/FeaturesSection";
import Landing from "../components/Landing";
import UserFeedbackSection from "../components/UserFeedbackSection";

const Home = () => {
  return (
    <div className="bg-base">
      <Landing />
      <FeaturesSection />
      <UserFeedbackSection />
    </div>
  );
};

export default Home;
