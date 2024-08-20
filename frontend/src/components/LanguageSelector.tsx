import { IoMdArrowDropdown } from "react-icons/io";

const languages: string[] = ["EN", "DE"];

const LanguageSelector = () => {
  return (
    <>
      <div>{languages[0]}</div>
      <IoMdArrowDropdown />{" "}
    </>
  );
};

export default LanguageSelector;
