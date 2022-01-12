import { AccAddress, ValAddress } from "@terra-money/terra.js";
import isBase64 from "is-base64";
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
