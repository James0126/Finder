import { Coin } from "@terra-money/terra.js";
import NativeAmount from "../token/NativeAmount";
import List from "../../components/List";
import { sortByDenom } from "../../scripts/coin";

const NativeBalance = ({ coins }: { coins?: Coin[] }) => {
  if (!coins || !coins.length) {
    return <p>This account doesn't hold any coins yet.</p>;
  }

  const native = sortByDenom(coins);
  const dataSource = native.map((coin) => ({
    content: coin,
    render: (coin: Coin) => <NativeAmount coin={coin} />,
  }));

  return <List dataSource={dataSource} />;
};

export default NativeBalance;
