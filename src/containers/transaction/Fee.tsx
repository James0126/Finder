import { readAmount, readDenom } from "@terra.kitchen/utils";
import Amount from "../../components/Amount";
import { sortByDenom } from "../../scripts/coin";

const Fee = ({ coins, slice }: { coins: CoinData[]; slice?: number }) => {
  const fee = sortByDenom([...coins]).slice(0, slice);
  return (
    <>
      {fee.map((fee, key) => {
        const amount = readAmount(fee.amount, { comma: true });
        const denom = readDenom(fee.denom);
        return <Amount amount={amount} denom={denom} key={key} />;
      })}
    </>
  );
};

export default Fee;
