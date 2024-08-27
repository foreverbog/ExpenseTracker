import FeedbackUserCard from "./FeedbackUserCard";
import axios from "axios";
import { useState } from "react";

type UsersType = {
  imgLink: string;
  firstName: string;
  lastName: string;
  feedbackRating?: number;
  feedback?: string;
};

const UserFeedbackSection = () => {
  const [users, setUsers] = useState<UsersType | undefined>(undefined);
  return (
    <div className="relative my-12">
      <div className="flex flex-col justify-center items-center gap-8 text-base-text">
        <h2 className="text-6xl text-center ">
          Check out other user experience
        </h2>

        <p className="w-1/2 text-balance text-center">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur
          dicta quae dignissimos consectetur! Quis tenetur expedita vitae est
          possimus et tempore. Facere, nulla asperiores inventore magni aperiam
          nobis laboriosam est.
        </p>
        <FeedbackUserCard />
      </div>
    </div>
  );
};

export default UserFeedbackSection;
