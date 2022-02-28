import { Fragment } from "react";
import Grid from "../components/layout/Grid";
import BlockHeight from "../containers/index/BlockHeight";
import LatestTxs from "../containers/index/LatestTxs";
import LunaPrice from "../containers/index/LunaPrice";
import MarketCap from "../containers/index/MarketCap";
import Issuance from "../containers/index/Issuance";
import s from "./Index.module.scss";
import { Link } from "react-router-dom";
import { useNetworkName } from "../contexts/ChainsContext";

const Index = () => {
  const header = [<LunaPrice />, <MarketCap />, <BlockHeight />, <Issuance />];
  const network = useNetworkName();
  return (
    <section>
      <Grid className={s.header} gap={20} columns={header.length}>
        {header.map((data, key) => (
          <Fragment key={key}>{data}</Fragment>
        ))}
      </Grid>
      <Grid gap={10} columns={2}>
        <section>
          {/* TODO: Latest Blocks */}
          <h1 className={s.title}>Latest Blocks</h1>
          <LatestTxs limit={10} />
        </section>
        <section>
          <h1 className={s.title}>Latest Transactions</h1>
          <LatestTxs
            limit={10}
            extra={<Link to={`/${network}/transactions`}>View more</Link>}
          />
        </section>
      </Grid>
    </section>
  );
};

export default Index;
