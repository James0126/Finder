import Search from "./Search";
import SelectCurrency from "./SelectCurrency";
import SelectNetworks from "./SelectNetwork";

const Header = () => (
  <section>
    <SelectNetworks />
    <SelectCurrency />
    <Search />
  </section>
);

export default Header;
