import { Coin } from "@terra-money/terra.js";
import NativeAmount from "../token/NativeAmount";
import List from "../../components/List";
import { sortByDenom } from "../../scripts/coin";

const NativeBalance = ({ coins }: { coins: Coin[] }) => {
  const native = sortByDenom(coins);
  const data = native.map((coin) => {
    return {
      content: coin,
      render: (coin: Coin) => <NativeAmount coin={coin} />,
    };
  });

  return <List data={data} />;
};

export default NativeBalance;
