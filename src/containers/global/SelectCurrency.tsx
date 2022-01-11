import { useActiveDenoms } from "../../queries/oracle";
import { useCurrencyState } from "../../store/Currency";

const SelectCurrency = () => {
  const { data } = useActiveDenoms();
  const [currency, setCurrency] = useCurrencyState();

  if (!data) {
    return null;
  }

  return (
    <select
      value={currency.substr(1).toUpperCase()}
      onChange={(e) => setCurrency(`u${e.target.value}`.toLowerCase())}
    >
      {data.map((denom, key) => {
        const render = denom.substr(1).toUpperCase();
        return <option key={key}>{render}</option>;
      })}
    </select>
  );
};

export default SelectCurrency;
