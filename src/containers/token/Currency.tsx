import { Coin } from "@terra-money/terra.js";
import { readAmount, readDenom } from "@terra.kitchen/utils";
import Amount from "../../components/Amount";
import { useMemoizedCalcValue } from "../../queries/oracle";
import { useCurrency } from "../../store/Currency";
import s from "./Currency.module.scss";

const Currency = ({ coin }: { coin: Coin }) => {
  const { denom } = coin;
  const currnecy = useCurrency();
  const calcCurrency = useMemoizedCalcValue(currnecy);
  const amount = calcCurrency(coin);

  if (!amount || denom === currnecy) {
    return null;
  }

  return (
    <Amount
      denom={readDenom(currnecy)}
      amount={`= ${readAmount(amount, { comma: true })}`}
      className={s.amount}
    />
  );
};

export default Currency;
