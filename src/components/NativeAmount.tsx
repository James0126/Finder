import { Coin } from "@terra-money/terra.js";
import { ASSET } from "../config/constants";
import format from "../scripts/format";
import { useCurrency } from "../store/Currency";
import { useMemoizedCalcValue } from "../queries/oracle";
import { useCurrentChain } from "../contexts/ChainsContext";
import Amount from "./Amount";

//TODO: Sort native coins
const NativeAmount = ({ coin }: { coin: Coin }) => {
  const amount = format.amount(coin.amount.toString());
  const denom = format.denom(coin.denom);
  const iconUrl = `${ASSET}/icon/60/${denom}.png`;

  const currnecy = useCurrency();
  const calcCurrency = useMemoizedCalcValue(currnecy);
  const value = calcCurrency(coin);

  const { name } = useCurrentChain();
  const renderCurrnecy = value &&
    denom !== currnecy &&
    name !== "localterra" && (
      <span>
        {format.amount(value)} {format.denom(currnecy)}
      </span>
    );

  return (
    <div>
      <Amount amount={amount} denom={denom} iconUrl={iconUrl} />
      {renderCurrnecy}
    </div>
  );
};

export default NativeAmount;
