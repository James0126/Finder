import Grid from "../components/Grid";
import LatestTxs from "../containers/index/LatestTxs";
import LunaPrice from "../containers/index/LunaPrice";
import s from "./Index.module.scss";

const Index = () => (
  <section>
    <LunaPrice />
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

export default Index;
