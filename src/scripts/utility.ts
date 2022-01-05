import { AccAddress, Validator } from "@terra-money/terra.js";
import { isInteger } from "./math";

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

/* helpers */
export const getFindValidator = (validators: Validator[]) => {
  return (address: AccAddress) => {
    const validator = validators.find((v) => v.operator_address === address);
    if (!validator) throw new Error(`${address} is not a validator`);
    return validator;
  };
};

export const getFindMoniker = (validators: Validator[]) => {
  return (address: AccAddress) => {
    const validator = getFindValidator(validators)(address);
    return validator.description.moniker;
  };
};
