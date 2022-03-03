import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../styles/Images/logo.svg";
import Flex from "../../components/layout/Flex";
import Search from "./Search";
import s from "./Header.module.scss";
import Preferences from "./Preferences";

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
        <Preferences />
      </Flex>
    </Flex>
  </section>
);

export default Header;
