import BigNumber from "bignumber.js";

const formatAmount = (amount: BigNumber.Value, decimals = 6): string =>
  new BigNumber(amount)
    .div(new BigNumber(10).pow(decimals))
    .decimalPlaces(6, BigNumber.ROUND_DOWN)
    .toFormat(6);

const formatDenom = (denom: string): string => {
  if (!denom) {
    return "";
  }

  if (denom[0] === "u") {
    const f = denom.slice(1);

    if (f.length > 3) {
      return f === "luna" ? "Luna" : f.toUpperCase();
    }

    return f.slice(0, 2).toUpperCase() + "T";
  }

  return denom;
};

const format = {
  amount: formatAmount,
  denom: formatDenom,

  truncate: (address: string = "", [h, t]: number[]) => {
    const head = address.slice(0, h);
    const tail = address.slice(-1 * t, address.length);
    return !address
      ? ""
      : address.length > h + t
      ? [head, tail].join("…")
      : address;
  },
};

export default format;
