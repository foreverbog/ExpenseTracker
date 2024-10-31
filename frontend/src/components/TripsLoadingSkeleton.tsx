const TripsLoadingSkeleton = () => {
  return (
    <div className="flex flex-wrap gap-4 mt-24  justify-center items-center">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="border  w-[250px] lg:w-[450px]  bg-base grid grid-cols-[80px_auto] p-2 rounded-md items-center md:grid-cols-[100px_auto] drop-shadow-md z-10"
        >
          <div className="w-16 h-16 md:w-24 md:h-24 rounded-md bg-base-200 animate-pulse"></div>
          <div className="rounded-md animate-pulse flex flex-col items-center justify-between w-full h-full">
            <div className="bg-base-200 animate-pulse h-4 rounded-md w-3/4"></div>
            <div className="bg-base-200 animate-pulse h-2 rounded-md w-2/4"></div>
            <div className="bg-base-200 animate-pulse h-2 rounded-md w-2/4"></div>
            <div className="bg-base-200 animate-pulse h-3 rounded-md w-2/4 self-end"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TripsLoadingSkeleton;
