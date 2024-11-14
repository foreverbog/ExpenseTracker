type UpdateBtnProsp = {
  btnText: string;
  reference?: React.RefObject<HTMLFormElement>;
};

const UpdateBtn: React.FC<UpdateBtnProsp> = ({ reference, btnText }) => {
  return (
    //*reference being a ref to a form with useRef
    <button
      onClick={() => {
        reference?.current?.requestSubmit();
      }}
      className="text-xs lg:text-normal px-4 py-2 bg-secondary
text-secondary-text rounded-md  font-semibold
hover:scale-105 hover:bg-secondary-darker active:scale-95 transition-transform duration-300
ease-in-out drop-shadow-xl"
    >
      {btnText}
    </button>
  );
};

export default UpdateBtn;
