import HeaderTop from '../HeaderTop/HeaderTop';
import HeaderBottom from '../HederBottom/HederBottom';

const Header = () => {
  return (
    <header className='mb-6 hidden md:block'>
      <HeaderTop />
      <HeaderBottom />
    </header>
  );
};

export default Header;
