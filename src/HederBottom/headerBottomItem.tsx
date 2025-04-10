type HeaderBottomItemProps = {
  label: string;
  icon: string;
};

const HeaderBottomItem = ({ label, icon }: HeaderBottomItemProps) => {
  return (
    <div className="flex flex-col flex-1 items-center transition-all duration-500 ease-in-out hover:bg-indigo-300">
      <img className="w-6 pb-3 pt-1" src={`${icon}`} alt={label} />
      <div className="flex items-center">
        <span>{label}</span>
        <img src="arrow-outlined.svg" alt="arrow" />
      </div>
    </div>
  );
};

export default HeaderBottomItem;
