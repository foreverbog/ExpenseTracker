import { LandingBackgroundVectors } from "../assets/svg/HomeVectors";
import { LandingGridVector } from "../assets/svg/HomeVectors";
const Landing = () => {
  return (
    <div className="h-dvh flex flex-col items-center justify-center relative ">
      <LandingBackgroundVectors />
      <div className=" grid grid-cols-2 relative w-full ">
        <div className="flex flex-col justify-center items-center gap-8 h-full   font-base text-base-text  justify-self-center">
          <h1 className="text-8xl text-center">
            Welcome to <span className="text-primary">AppName</span>
          </h1>
          <p className=" w-5/6  text-center text-balance">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
            officia eveniet consectetur illo omnis tempore atque, blanditiis
            numquam iusto aliquid aut soluta reprehenderit impedit amet libero,
            corporis asperiores eius nostrum! Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Minus officia eveniet consectetur illo
            omnis tempore atque, blanditiis numquam iusto aliquid aut soluta
            reprehenderit impedit amet libero, corporis asperiores eius nostrum!
          </p>
          <button className="bg-primary px-8 py-4 rounded-md text-primary-text text-center w-1/3 hover:shadow-[0px_13px_190px_10px_var(--color-secondary-lighter)] transition-shadow duration-300 ease-in-out">
            Sign Up
          </button>
        </div>
        {/* 0px 10px 138px 44px rgba(0,0,0,0.51 */}
        <LandingGridVector />
      </div>
    </div>
  );
};

export default Landing;
