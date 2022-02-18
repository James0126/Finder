import { memo } from "react";
import { readAmount, readDenom } from "@terra.kitchen/utils";
import Amount from "../../components/Amount";
import { sortByDenom } from "../../scripts/coin";

interface Props {
  coins: CoinData[];
  slice?: number;
  className?: string;
}

const Fee = ({ coins, slice, className }: Props) => {
  const fee = sortByDenom([...coins]).slice(0, slice);
  return (
    <div className={className}>
      {fee.map((fee, key) => {
        const amount = readAmount(fee.amount, { comma: true });
        const denom = readDenom(fee.denom);
        return <Amount amount={amount} denom={denom} key={key} />;
      })}
    </div>
  );
};

export default memo(Fee);
