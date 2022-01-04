import { isInteger } from "./math";

export const ASSET_URL = "https://assets.terra.money";

export function getEndpointByKeyword(keyword: string) {
  const key = keyword.toLowerCase();

  if (isInteger(key)) {
    return `/blocks/${key}`;
  } else if (key.indexOf("terravaloper") === 0) {
    return `/validator/${key}`;
  } else if (key.indexOf("terra") === 0) {
    return `/address/${key}`;
  } else if (key.length === 64) {
    return `/tx/${key}`;
  } else {
    return `/notfound/${keyword}`;
  }
}

export const isIbcDenom = (string = "") => string.startsWith("ibc/");
