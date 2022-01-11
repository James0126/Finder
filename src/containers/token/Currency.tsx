import { Coin } from "@terra-money/terra.js";
import { readAmount, readDenom } from "@terra.kitchen/utils";
import Amount from "../../components/Amount";
import { useMemoizedCalcValue } from "../../queries/oracle";
import { useCurrency } from "../../store/Currency";

const Currency = ({ coin }: { coin: Coin }) => {
  const { denom } = coin;
  const currnecy = useCurrency();
  const calcCurrency = useMemoizedCalcValue(currnecy);
  const amount = calcCurrency(coin);

  const render = amount && denom !== currnecy && (
    <Amount
      denom={readDenom(currnecy)}
      amount={readAmount(amount, { comma: true })}
    />
  );

  return <>{render}</>;
};

export default Currency;
