import BigNumber from "bignumber.js";

export const toPrice = (n: BigNumber.Value) =>
  new BigNumber(n).dp(18, BigNumber.ROUND_DOWN).toNumber();
