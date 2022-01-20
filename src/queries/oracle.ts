import { Coin, Denom, OracleParams } from "@terra-money/terra.js";
import { useCallback, useMemo } from "react";
import { useQuery } from "react-query";
import { toPrice } from "../scripts/num";
import { useCurrency } from "../store/Currency";
import { getAmount, sortCoins } from "../scripts/coin";
import { useLCDClient } from "./lcdClient";
import { RefetchOptions } from "./query";

/* For Currency */
export const useActiveDenoms = () => {
  const lcd = useLCDClient();
  return useQuery(
    ["activeDenoms"],
    async () => await lcd.oracle.activeDenoms(),
    { ...RefetchOptions.INFINITY }
  );
};

/* helpers */
type Prices = Record<Denom, number>;
export const useMemoizedPrices = (currency: string) => {
  const { data: exchangeRates, ...state } = useExchangeRates();

  const prices = useMemo((): Prices | undefined => {
    if (!exchangeRates) return;
    const base = toPrice(getAmount(exchangeRates, currency, "1"));

    return {
      uluna: base,
      ...sortCoins(exchangeRates, currency).reduce((acc, { amount, denom }) => {
        const price = toPrice(Number(base) / Number(amount));
        return { ...acc, [denom]: price };
      }, {}),
    };
  }, [currency, exchangeRates]);

  return { data: prices, ...state };
};

export type CalcValue = (params: Coin) => number | undefined;
export const useMemoizedCalcValue = (denom?: string) => {
  const currency = useCurrency();
  const { data: memoizedPrices } = useMemoizedPrices(denom ?? currency);

  return useCallback<CalcValue>(
    ({ amount, denom }) => {
      if (!memoizedPrices) return;
      return Number(amount) * Number(memoizedPrices[denom] ?? 0);
    },
    [memoizedPrices]
  );
};

export const useExchangeRates = () => {
  const lcd = useLCDClient();
  return useQuery(
    [lcd.config, "exchangeRates"],
    () => lcd.oracle.exchangeRates(),
    { ...RefetchOptions.INFINITY }
  );
};

/* For Validator Uptime */
export const useOracleParams = () => {
  const lcd = useLCDClient();
  return useQuery(
    [lcd.config, "oracleParams"],
    async () => await lcd.oracle.parameters(),
    { ...RefetchOptions.INFINITY }
  );
};

export const useMisses = (address: string) => {
  const lcd = useLCDClient();
  return useQuery(
    [lcd.config, address, "misses"],
    async () => await lcd.oracle.misses(address),
    { ...RefetchOptions.INFINITY }
  );
};

export const useUptime = (address: string) => {
  const { data: oracleParams, ...state } = useOracleParams();
  const { data: misses } = useMisses(address);

  const calc = useMemo(() => {
    if (!oracleParams) return;
    return getCalcUptime(oracleParams);
  }, [oracleParams]);

  const data = useMemo(() => {
    if (!calc) return;
    return calc(misses);
  }, [calc, misses]);

  return { data, ...state };
};

export const getCalcUptime = ({ slash_window }: OracleParams) => {
  return (missCounter?: number) => {
    if (!missCounter) return;
    return missCounter ? 1 - Number(missCounter) / slash_window : undefined;
  };
};
