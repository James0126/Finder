import Flex from "../components/Flex";
import LatestTxs from "../containers/index/LatestTxs";
import LunaPrice from "../containers/index/LunaPrice";
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
