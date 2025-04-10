import HeaderBottomItem from './headerBottomItem';
import { headerBottomItems } from './HeaderBottomData'

const HeaderBottom = () => {
  return (
    <div className="py-3">
      <div className="flex">
        {headerBottomItems.map((item) => (
          <HeaderBottomItem key={item.label} label={item.label} icon={item.icon} />
        ))}
      </div>
    </div>
  );
};

export default HeaderBottom;
