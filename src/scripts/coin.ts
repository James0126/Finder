import { Coins, Denom } from "@terra-money/terra.js";
import { isDenomIBC } from "@terra.kitchen/utils";

export const isIbcDenom = (string = "") => string.startsWith("ibc/");

/* coin */
export const getAmount = (coins: Coins, denom: Denom, fallback = "0") => {
  return coins.get(denom)?.amount.toString() ?? fallback;
};

/* coins */
export const sortCoins = (
  coins: Coins,
  currency?: string,
  sorter?: (a: CoinData, b: CoinData) => number
) => {
  return sortByDenom(coins.toData(), currency, sorter);
};

export const sortByDenom = <T extends { denom: Denom }>(
  coins: T[],
  currency = "",
  sorter?: (a: T, b: T) => number
) =>
  coins.sort(
    (a, b) =>
      compareIs("uluna")(a.denom, b.denom) ||
      compareIs("uusd")(a.denom, b.denom) ||
      compareIs(currency)(a.denom, b.denom) ||
      compareIsDenomIBC(a.denom, b.denom) ||
      (sorter?.(a, b) ?? 0)
  );

export const sortDenoms = (denoms: Denom[], currency = "") =>
  denoms.sort(
    (a, b) =>
      compareIs("uluna")(a, b) ||
      compareIs("uusd")(a, b) ||
      compareIs(currency)(a, b) ||
      compareIsDenomIBC(a, b)
  );

export const compareIsDenomIBC = (a: string, b: string) =>
  Number(isDenomIBC(a)) - Number(isDenomIBC(b));

export const compareIs = (k: string) => (a: string, b: string) =>
  Number(b === k) - Number(a === k);
