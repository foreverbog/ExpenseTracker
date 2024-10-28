import { GiHamburgerMenu } from "react-icons/gi";

type MenuTitleComponentProps = {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
};

const MenuTitleComponent: React.FC<MenuTitleComponentProps> = ({
  setIsMenuOpen,
  title,
}) => {
  return (
    <div className="flex  justify-between items-center bg-primary px-4 py-6 gap-4 md:block md:pl-6 ">
      <GiHamburgerMenu
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className="text-xl text-primary-text block md:hidden hover:cursor-pointer"
      />
      <h1 className="text-lg md:text-4xl  bg-primary text-primary-text  ">
        {title}
      </h1>
    </div>
  );
};

export default MenuTitleComponent;
