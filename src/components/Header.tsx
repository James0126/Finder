import Search from "./Search";
import SelectCurrency from "./SelectCurrency";
import SelectNetworks from "./SelectNetwork";

//TODO: Add language selector?
const Header = () => (
  <div>
    <SelectNetworks />
    <SelectCurrency />
    <Search />
  </div>
);

export default Header;
