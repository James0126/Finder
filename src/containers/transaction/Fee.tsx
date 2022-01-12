import { readAmount, readDenom } from "@terra.kitchen/utils";
import Amount from "../../components/Amount";

const Fee = ({ coins }: { coins: CoinData[] }) => (
  <>
    {coins.map((fee, key) => {
      const amount = readAmount(fee.amount);
      const denom = readDenom(fee.denom);
      return <Amount amount={amount} denom={denom} key={key} />;
    })}
  </>
);

export default Fee;
