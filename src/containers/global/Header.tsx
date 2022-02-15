import { ReactComponent as Logo } from "../../styles/Images/logo.svg";
import Flex from "../../components/Flex";
import SelectCurrency from "./SelectCurrency";
import SelectNetworks from "./SelectNetwork";
import Search from "./Search";
import s from "./Header.module.scss";

const Header = () => (
  <section className={s.wrapper}>
    <Flex className={s.flex}>
      <Flex>
        <Logo className={s.logo} />
        <Search className={s.search} />
      </Flex>
      <Flex>
        <SelectNetworks className={s.network} />
        <SelectCurrency />
      </Flex>
    </Flex>
  </section>
);

export default Header;
