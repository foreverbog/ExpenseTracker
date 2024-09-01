import FeedbackUserCard from "./FeedbackUserCard";
import users from "../utils/users.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

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
  return (
    <div className="relative my-12 flex flex-col  gap-12 md:gap-24 font-base">
      <div className="flex flex-col justify-center items-center gap-8 text-base-text">
        <h2 className="text-3xl md:text-6xl text-center ">
          Check out other user experience
        </h2>

        <p className="text-sm md:text-normal  w-4/5 md:w-1/2 text-balance text-center">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur
          dicta quae dignissimos consectetur! Quis tenetur expedita vitae est
          possimus et tempore. Facere, nulla asperiores inventore magni aperiam
          nobis laboriosam est.
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
    </div>
  );
};

export default UserFeedbackSection;
