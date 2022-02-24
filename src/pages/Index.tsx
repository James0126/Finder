import Flex from "../components/Flex";
import LatestTxs from "../containers/landing/LatestTxs";
import LunaPrice from "../containers/landing/LunaPrice";
import s from "./Index.module.scss";

const Index = () => (
  <section>
    <LunaPrice />
    <Flex className={s.list}>
      <LatestTxs />
      <LatestTxs />
    </Flex>
  </section>
);

export default Index;
