import Card from "../../components/layout/Card";
import Read from "../../components/Read";
import { useMemoizedPrices } from "../../queries/oracle";
import { useCurrency } from "../../store/Currency";

const LunaPrice = () => {
  const currency = useCurrency();
  const denom = currency === "uluna" ? "uusd" : currency;
  const { data: prices } = useMemoizedPrices(denom);

  const render = () => {
    if (!prices) return;
    const { uluna: price } = prices;
    return <Read amount={String(price)} denom={denom} decimals={0} auto />;
  };

  return (
    <Card title="Luna price" bordered>
      {render()}
    </Card>
  );
};

export default LunaPrice;
