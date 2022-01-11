import { Coin } from "@terra-money/terra.js";
import { readAmount, readDenom } from "@terra.kitchen/utils";
import { useMemoizedCalcValue } from "../../queries/oracle";
import { useCurrency } from "../../store/Currency";

const Currency = ({ coin }: { coin: Coin }) => {
  const { denom } = coin;
  const currnecy = useCurrency();
  const calcCurrency = useMemoizedCalcValue(currnecy);
  const amount = calcCurrency(coin);

  const render = amount && denom !== currnecy && (
    <span>
      {readAmount(amount, { comma: true })} {readDenom(currnecy)}
    </span>
  );

  return <>{render}</>;
};

export default Currency;
