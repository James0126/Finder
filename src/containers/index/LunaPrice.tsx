import Card from "../../components/Card";
import Read from "../../components/Read";
import { useMemoizedPrices } from "../../queries/oracle";
import { useCurrency } from "../../store/Currency";
import s from "./LunaPrice.module.scss";

const LunaPrice = () => {
  const currency = useCurrency();
  const denom = currency === "uluna" ? "uusd" : currency;
  const { data: prices } = useMemoizedPrices(denom);

  const render = () => {
    if (!prices) return;
    const { uluna: price } = prices;
    return (
      <Read
        amount={String(price)}
        denom={denom}
        decimals={0}
        auto
        className={s.price}
      />
    );
  };

  return (
    <Card title="Luna price" bordered className={s.card}>
      {render()}
    </Card>
  );
};

export default LunaPrice;
