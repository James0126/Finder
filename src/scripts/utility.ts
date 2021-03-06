import { AccAddress, Coin, ValAddress } from "@terra-money/terra.js";
import isBase64 from "is-base64";
import { LogFinderAmountResult } from "@terra-money/log-finder-ruleset";
import { isInteger } from "./math";

export const getEndpointByKeyword = (keyword: string) => {
  const key = keyword.toLowerCase().trim();

  if (isInteger(key)) {
    return `/blocks/${key}`;
  } else if (ValAddress.validate(key)) {
    return `/validator/${key}`;
  } else if (AccAddress.validate(key)) {
    return `/address/${key}`;
  } else if (key.length === 64) {
    return `/tx/${key}`;
  } else {
    return `/notfound/${keyword}`;
  }
};

export const isJson = (param: any) => {
  try {
    JSON.parse(param);
    return true;
  } catch {
    return false;
  }
};

export const decodeBase64 = (str: string) => {
  try {
    if (isBase64(str)) {
      return Buffer.from(str, "base64").toString();
    }

    return str;
  } catch {
    return str;
  }
};

//TODO: Refactor codes
export const totalAmounts = (
  userAddress: string,
  matchedLogs?: LogFinderAmountResult[][]
) => {
  try {
    const amountIn: CoinData[] = [];
    const amountOut: CoinData[] = [];

    matchedLogs?.forEach((log) =>
      log.forEach((data) => {
        const { transformed } = data;
        if (transformed) {
          const { sender, recipient, amount } = transformed;
          const coins = amount.split(",").map((coin) => {
            const { amount, denom } = Coin.fromString(coin);
            return { amount: amount.toNumber(), denom: denom };
          });
          if (sender === userAddress) {
            amountOut.push(...coins);
          } else if (recipient === userAddress) {
            amountIn.push(...coins);
          }
        }
      })
    );

    return [amountIn.slice(0, 3), amountOut.slice(0, 3)];
  } catch {
    return [];
  }
};

export const isTerraAddress = (value: string) => {
  if (AccAddress.validate(value) || ValAddress.validate(value)) {
    return true;
  }
  return false;
};

export const getIpfsGateway = (src: string) =>
  src.startsWith("ipfs://")
    ? src.replace("ipfs://", "https://cloudflare-ipfs.com/ipfs/")
    : src;
