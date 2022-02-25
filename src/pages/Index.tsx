import Grid from "../components/Grid";
import BlockHeight from "../containers/index/BlockHeight";
import LatestTxs from "../containers/index/LatestTxs";
import LunaPrice from "../containers/index/LunaPrice";
import MarketCap from "../containers/index/MarketCap";
import Issuance from "../containers/index/Issuance";
import s from "./Index.module.scss";

const Index = () => {
  const header = [<LunaPrice />, <MarketCap />, <BlockHeight />, <Issuance />];

  return (
    <section>
      <Grid className={s.header} gap={20} columns={header.length}>
        {header.map((data) => data)}
      </Grid>
      <Grid gap={10} columns={2}>
        <section>
          {/* TODO: Change Latest Blocks */}
          <h1 className={s.title}>Latest Transactions</h1>
          <LatestTxs />
        </section>
        <section>
          <h1 className={s.title}>Latest Transactions</h1>
          <LatestTxs />
          <button>View more transactions</button>
        </section>
      </Grid>
    </section>
  );
};

export default Index;
