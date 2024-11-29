import FeedbackUserCard from "./FeedbackUserCard";
import users from "../../utils/users.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { useTranslation } from "react-i18next";
import { UserFeedbackSectionVector } from "../../assets/svg/HomeVectors";
import { useRef } from "react";
import { useInView } from "framer-motion";

type UsersType = {
  picture: {
    large: string;
  };
  name: {
    first: string;
    last: string;
  };
  feedbackRating?: number;
  feedbackText?: string;
};

const UserFeedbackSection = () => {
  const { t } = useTranslation("global");
  const feedbackRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(feedbackRef);

  return (
    <div
      ref={feedbackRef}
      className={`relative my-12 flex flex-col  gap-12 md:gap-24 font-base overflow-hidden  transition-all duration-1000 ease-in-out ${
        isInView ? "opacity-100 scale-100" : "opacity-0 scale-90"
      }`}
    >
      <div className="flex flex-col justify-center items-center gap-8 text-base-text">
        <h2 className="text-3xl md:text-6xl text-center z-20 ">
          {t("feedback.title")}
        </h2>

        <p className="text-sm md:text-lg  w-4/5 md:w-1/2 text-balance text-center italic">
          {t("feedback.paragraphStart")}{" "}
          <span className="text-secondary font-semibold">TrackIt</span>{" "}
          {t("feedback.paragraphEnd")}
        </p>
        {/* <FeedbackUserCard /> */}
      </div>
      <Swiper
        className="w-[300px] md:w-[500px] h-48 rounded-md shadow-base-300 shadow-2xl text-base-text"
        modules={[Autoplay]}
        spaceBetween={30}
        autoplay={true}
        slidesPerView={1}
        loop={true}
      >
        {users.map((user: UsersType, i) => (
          <SwiperSlide key={i}>
            <FeedbackUserCard
              imgLink={user.picture.large}
              firstName={user.name.first}
              lastName={user.name.last}
              feedbackRating={user.feedbackRating}
              feedbackText={user.feedbackText}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <UserFeedbackSectionVector />
    </div>
  );
};

export default UserFeedbackSection;
