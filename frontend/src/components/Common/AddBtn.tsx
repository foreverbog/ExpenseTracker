import { IoMdAdd } from "react-icons/io";

type AddBtnProps = {
  btnText: string;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  textClassName?: string;
};

const AddBtn: React.FC<AddBtnProps> = ({
  btnText,
  setIsModalOpen,
  className,
  textClassName,
}) => {
  return (
    <div
      onClick={() => setIsModalOpen((prev) => !prev)}
      className={` bg-secondary text-secondary-text font-semibold   p-1 md:p-1.5 rounded-md active:scale-90 hover:scale-105 hover:cursor-pointer focus:border-secondary-darker focus:border-2 transition-transform duration-300 ease-in-out flex justify-around items-center gap-4 md:px-4 group ${className}`}
    >
      <IoMdAdd className="text-xl md:text-2xl group-hover:rotate-90  transition-all duration-1000" />
      <p className={`font-base hidden md:block ${textClassName}`}>{btnText}</p>
    </div>
  );
};

export default AddBtn;
