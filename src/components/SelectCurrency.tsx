import { useActiveDenoms } from "../queries/oracle";
import { useCurrency, useCurrencyState } from "../store/currencyStore";

const SelectCurrency = () => {
  const { data } = useActiveDenoms();
  const [, setCurrency] = useCurrencyState();
  const defaultDenom = useCurrency();

  if (!data) {
    return null;
  }

  return (
    <select
      value={defaultDenom.substr(1).toUpperCase()}
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
