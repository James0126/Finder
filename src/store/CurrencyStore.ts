import { atom, useRecoilState, useRecoilValue } from "recoil";
import { getLocalSetting, setLocalSetting } from "../scripts/utility";

export const currencyState = atom({
  key: "ContractState",
  default: getLocalSetting<string>("currency", "uusd"),
});

export const useCurrency = () => {
  const currency = useRecoilValue(currencyState);
  return currency;
};

export const useCurrencyState = () => {
  const [currency, setCurrency] = useRecoilState(currencyState);

  const set = (currency: string) => {
    setLocalSetting("currency", currency);
    setCurrency(currency);
  };

  return [currency, set] as const;
};
