import { Coin } from "@terra-money/terra.js";
import { readAmount, readDenom } from "@terra.kitchen/utils";
import classNames from "classnames";
import Amount from "../../components/Amount";
import { useMemoizedCalcValue } from "../../queries/oracle";
import { useCurrency } from "../../store/Currency";
import s from "./Currency.module.scss";

interface Props {
  coin: Coin;
  className?: string;
  prefix?: boolean;
}

const Currency = ({ coin, className, prefix }: Props) => {
  const currnecy = useCurrency();
  const calcCurrency = useMemoizedCalcValue(currnecy);
  const amount = calcCurrency(coin);

  if (!amount) {
    return null;
  }

  return (
    <Amount
      denom={readDenom(currnecy)}
      amount={`= ${readAmount(amount, { comma: true, prefix })}`}
      mainClassName={classNames(s.amount, className)}
    />
  );
};

export default Currency;
