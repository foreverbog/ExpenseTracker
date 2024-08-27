import { IoIosStar } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";

const FeedbackUserCard = () => {
  const userfb = 4.5;

  const fullStars = Math.floor(userfb);
  const halfStars = userfb % 1 !== 0;
  const emptyStars = Math.ceil(userfb);

  return (
    <div
      className="bg-base-200 w-[500px] h-52 p-4 rounded-md grid grid-cols-2 items-center gap-4 text-base-text  shadow-base-300 shadow-2xl"
      style={{ gridTemplateColumns: "64px auto" }}
    >
      <img
        className="rounded-full "
        src="https://randomuser.me/api/portraits/women/11.jpg"
        alt="s"
        width={64}
      />
      <div className="flex flex-col gap-2">
        <p className="text-lg">firstName lastName</p>
        <div className="flex ">
          <p className="mr-2 ">{userfb}/5</p>
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
      <p className="text-md col-span-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo deleniti
        aperiam dicta atque corporis repudiandae asperiores, ex, minus sequi
        ipsum autem maxime consequuntur corrupti expedita. Quia itaque deserunt
        earum doloribus.
      </p>
    </div>
  );
};

export default FeedbackUserCard;
