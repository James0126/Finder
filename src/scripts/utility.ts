import { AccAddress, ValAddress } from "@terra-money/terra.js";
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
