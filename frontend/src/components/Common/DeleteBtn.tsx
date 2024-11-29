type DeleteBtnProps = {
  btnText: string;
};

const DeleteBtn: React.FC<DeleteBtnProps> = ({ btnText }) => {
  return (
    <div className="text-xs lg:text-normal px-4 py-2 rounded-md  font-semibold hover:scale-105 active:scale-95 transition-transform duration-300 ease-in-out drop-shadow-xl bg-red-700 hover:bg-red-800 text-white disabled:pointer-events-none">
      {btnText}
    </div>
  );
};

export default DeleteBtn;
