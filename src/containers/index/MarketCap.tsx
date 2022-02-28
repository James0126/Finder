import Card from "../../components/layout/Card";
import Read from "../../components/Read";
import { useMarketCap } from "../../queries/marketcap";
import { useMemoizedCalcValue } from "../../queries/oracle";
import { useCurrency } from "../../store/Currency";
import s from "./MarketCap.module.scss";

const MarketCap = () => {
  const data = useMarketCap();
  const currency = useCurrency();
  const calcCurrency = useMemoizedCalcValue(currency);
  const render = () => {
    if (!data) return null;
    const coin = calcCurrency(data);
    return (
      <Read amount={String(coin)} denom={currency} decimals={6} prefix auto />
    );
  };
  return (
    <Card title="Market Cap" small titleClassname={s.title}>
      {render()}
    </Card>
  );
};

export default MarketCap;
