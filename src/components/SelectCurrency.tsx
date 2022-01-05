import { useRecoilState } from "recoil";
import { useActiveDenoms } from "../queries/oracle";
import { currencyState } from "../store/CurrencyStore";

const SelectCurrency = () => {
  const { data } = useActiveDenoms();
  const [currency, setCurrency] = useRecoilState(currencyState);

  console.log(currency);
  if (!data) {
    return null;
  }
  const denom = data.includes(currency) ? currency : "uusd";

  return (
    <select
      value={denom}
      onChange={(e) => setCurrency(`${e.target.value}`.toLowerCase())}
    >
      {data.map((denom, key) => {
        const render = denom.substr(1).toUpperCase();
        return <option key={key}>{denom}</option>;
      })}
    </select>
  );
};

export default SelectCurrency;
