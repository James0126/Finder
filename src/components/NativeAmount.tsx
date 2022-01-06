import { Coin } from "@terra-money/terra.js";
import { ASSET } from "../config/constants";
import format from "../scripts/format";
import { useCurrency } from "../store/CurrencyStore";
import { useMemoizedCalcValue } from "../queries/oracle";

const NativeAmount = ({ coin }: { coin: Coin }) => {
  const amount = format.amount(coin.amount.toString());
  const denom = format.denom(coin.denom);
  const iconLink = `${ASSET}/icon/60/${denom}.png`;

  const currnecy = useCurrency();
  const calcCurrency = useMemoizedCalcValue(currnecy);
  const value = calcCurrency(coin);

  const currnecyRender = value && denom !== currnecy && (
    <span>
      {format.amount(value)} {format.denom(currnecy)}
    </span>
  );

  return (
    <div>
      <img alt="denom" src={iconLink} />
      {`${amount} ${denom}`}
      <br />
      {currnecyRender}
    </div>
  );
};

export default NativeAmount;
