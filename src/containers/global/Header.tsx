import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../styles/Images/logo.svg";
import Flex from "../../components/Flex";
import SelectCurrency from "./SelectCurrency";
import SelectNetworks from "./SelectNetwork";
import Breadcrumb from "./Breadcrumb";
import Search from "./Search";
import s from "./Header.module.scss";

const Header = () => (
  <section className={s.wrapper}>
    <Flex className={s.flex}>
      <Flex>
        <Link to="/">
          <Logo className={s.logo} />
        </Link>
        <Search />
      </Flex>
      <Flex>
        <SelectNetworks className={s.network} />
        <SelectCurrency />
      </Flex>
    </Flex>
    <Breadcrumb />
  </section>
);

export default Header;
