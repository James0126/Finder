import { readDenom } from "@terra.kitchen/utils";
import RadioGroup from "../../components/form/RadioGroup";
import { useActiveDenoms } from "../../queries/oracle";
import { useCurrencyState } from "../../store/Currency";

const SelectCurrency = () => {
  const { data } = useActiveDenoms();
  const [currency, setCurrency] = useCurrencyState();

  if (!data) {
    return null;
  }

  return (
    <RadioGroup
      options={data.map((denom) => {
        return { value: denom, label: readDenom(denom) };
      })}
      value={currency}
      onChange={setCurrency}
    />
  );
};

export default SelectCurrency;
