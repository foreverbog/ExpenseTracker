import { IoIosStar } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";

type FeedbackUserCard = {
  imgLink: string;
  lastName: string;
  firstName: string;
  feedbackRating: number | undefined;
  feedbackText: string | undefined;
};

const FeedbackUserCard = ({
  imgLink,
  lastName,
  firstName,
  feedbackRating,
  feedbackText,
}: FeedbackUserCard) => {
  if (feedbackRating === undefined) {
    return null;
  }
  const fullStars = Math.floor(feedbackRating);
  const halfStars = feedbackRating % 1 !== 0;
  const emptyStars = Math.ceil(feedbackRating);

  return (
    <div
      className="bg-base-200 w-[500px] h-48 p-4 rounded-md grid grid-cols-2 items-center gap-4 text-base-text font-base shadow-base-300 shadow-2xl"
      style={{ gridTemplateColumns: "64px auto" }}
    >
      <img className="rounded-full " src={imgLink} alt="s" width={64} />
      <div className="flex flex-col gap-2">
        <p className="text-lg">{`${firstName} ${lastName}`}</p>
        <div className="flex ">
          <p className="mr-2 ">{feedbackRating}/5</p>
          {Array.from({ length: fullStars }).map((_, index) => (
            <IoIosStar key={index} className="text-yellow-400 text-2xl" />
          ))}
          {halfStars && <IoIosStarHalf className="text-yellow-400 text-2xl" />}
          {Array.from({ length: 5 - emptyStars }).map((_, index) => (
            <IoIosStarOutline
              key={index}
              className="text-2xl text-yellow-400"
            />
          ))}
        </div>
      </div>
      <p className="text-lg col-span-2 text-center self-start">
        {feedbackText}
      </p>
    </div>
  );
};

export default FeedbackUserCard;
