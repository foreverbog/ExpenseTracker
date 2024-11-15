type UpdateBtnProsp = {
  btnText: string;
};

const UpdateBtn: React.FC<UpdateBtnProsp> = ({ btnText }) => {
  return (
    <div
      className="text-xs lg:text-normal px-4 py-2 bg-secondary
text-secondary-text rounded-md  font-semibold
hover:scale-105 hover:bg-secondary-darker active:scale-95 transition-transform duration-300
ease-in-out drop-shadow-xl"
    >
      {btnText}
    </div>
  );
};

export default UpdateBtn;
