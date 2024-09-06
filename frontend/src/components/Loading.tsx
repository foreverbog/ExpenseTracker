type LoadingProps = {
  text: string | null;
};
const Loading: React.FC<LoadingProps> = ({ text }) => {
  return (
    <div className="absolute opacity-80  bg-base top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex flex-col gap-4 justify-center items-center z-50">
      <div className="flex-col gap-4 w-full flex items-center justify-center">
        <div className="w-20 h-20 border-4 border-transparent text-primary text-4xl animate-spin flex items-center justify-center border-t-primary rounded-full">
          <div className="w-16 h-16 border-4 border-transparent text-secondary text-2xl animate-spin flex items-center justify-center border-t-secondary rounded-full"></div>
        </div>
      </div>
      <p className="text-xl font-semibold font-base text-primary animate-pulse">
        {text}
      </p>
    </div>
  );
};

export default Loading;
