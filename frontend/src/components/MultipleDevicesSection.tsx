const MultipleDevicesSection = () => {
  return (
    <div
      className=" bg-cover bg-center p-12 flex flex-wrap  justify-center  gap-12 font-base text-base-text"
      // style={{ backgroundImage: "url('./images/blob-scatter-haikei.svg')" }}
    >
      <h2 className="text-3xl md:text-6xl text-center self-center ">
        Avalaible on multiple devices
      </h2>
      <img className="h-[640px]" src="./images/comp.jpg" alt="d" width={324} />
    </div>
  );
};

export default MultipleDevicesSection;
