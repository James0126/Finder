import { Coin } from "@terra-money/terra.js";
import NativeAmount from "../token/NativeAmount";
import { sortByDenom } from "../../scripts/coin";
import List from "../../components/List";
import s from "./NativeBalance.module.scss";

interface Props {
  coins?: Coin[];
  prefix?: boolean;
}

const NativeBalance = ({ coins, prefix }: Props) => {
  if (!coins || !coins.length) {
    return <p>This account doesn't hold any coins yet.</p>;
  }

  const native = sortByDenom(coins);
  return (
    <List
      dataSource={native.map((coin) => ({
        content: <NativeAmount prefix={prefix} coin={coin} />,
      }))}
      itemClassName={s.item}
      mainClassName={s.list}
    />
  );
};

export default NativeBalance;
