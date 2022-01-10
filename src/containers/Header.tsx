import Search from "./Search";
import SelectCurrency from "./SelectCurrency";
import SelectNetworks from "./SelectNetwork";

const Header = () => (
  <div>
    <SelectNetworks />
    <SelectCurrency />
    <Search />
  </div>
);

export default Header;
