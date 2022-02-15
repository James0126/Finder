import { Coin } from "@terra-money/terra.js";
import NativeAmount from "../token/NativeAmount";
import List from "../../components/List";
import Card from "../../components/Card";
import { sortByDenom } from "../../scripts/coin";
import s from "./NativeBalance.module.scss";

const NativeBalance = ({ coins }: { coins?: Coin[] }) => {
  if (!coins || !coins.length) {
    return <p>This account doesn't hold any coins yet.</p>;
  }

  const native = sortByDenom(coins);
  return (
    <List
      dataSource={native.map((coin) => ({
        content: (
          <Card bordered className={s.card}>
            <NativeAmount coin={coin} />
          </Card>
        ),
      }))}
      itemClassName={s.item}
      mainClassName={s.list}
    />
  );
};

export default NativeBalance;
