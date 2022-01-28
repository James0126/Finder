import { useMemo } from "react";
import { useQuery } from "react-query";
import { path, uniqBy } from "ramda";
import BigNumber from "bignumber.js";
import { bech32 } from "bech32";
import {
  AccAddress,
  DelegateValidator,
  Validator,
} from "@terra-money/terra.js";
/* TODO: Fix terra.js */
import { BondStatus } from "@terra-money/terra.proto/cosmos/staking/v1beta1/staking";
import { LAZY_LIMIT } from "../config/constants";
import { useLCDClient } from "./lcdClient";
import { RefetchOptions } from "./query";

/* validator page */
export const useValidator = (address: string) => {
  const lcd = useLCDClient();
  return useQuery(
    [lcd.config, address, "validator"],
    async () => await lcd.staking.validator(address),
    { ...RefetchOptions.INFINITY }
  );
};

export const useValidatorSet = (height?: number) => {
  const lcd = useLCDClient();
  return useQuery(
    [lcd.config, height, "validatorSet"],
    async () => {
      //TODO: Iterator
      const [v1] = await lcd.tendermint.validatorSet(height);
      const [v2] = await lcd.tendermint.validatorSet(height, {
        "pagination.offset": String(v1.length),
      });

      return [...v1, ...v2];
    },
    { ...RefetchOptions.INFINITY }
  );
};

export const useVotingPowerRate = (pubKey: string) => {
  const { data: validators, ...state } = useValidatorSet();

  const calcRate = useMemo(() => {
    if (!validators) {
      return undefined;
    }
    return getCalcVotingPowerRate(validators, pubKey);
  }, [validators, pubKey]);

  const data = useMemo(() => {
    if (!calcRate) {
      return undefined;
    }
    return calcRate();
  }, [calcRate]);

  return { data, ...state };
};

export const getCalcVotingPowerRate = (
  validators: DelegateValidator[],
  pubKey: string
) => {
  const total = BigNumber.sum(
    ...validators.map((validator) => validator.voting_power)
  ).toNumber();

  return () => {
    const validator = validators.find(
      (validator) => validator.pub_key.key === pubKey
    );

    if (!validator) {
      return undefined;
    }
    const { voting_power } = validator;
    return voting_power ? Number(voting_power) / total : undefined;
  };
};

export const calcSelfDelegation = (validator?: Validator) => {
  //TODO
  return 0;
};

/* contract or account page */

/* params */
export const Pagination = {
  "pagination.limit": String(LAZY_LIMIT),
};

export const useValidators = () => {
  const lcd = useLCDClient();

  return useQuery(
    [lcd.config, "vaidators"],
    async () => {
      // TODO: Pagination
      // Required when the number of results exceed LAZY_LIMIT

      const [v1] = await lcd.staking.validators({
        status: BondStatus[BondStatus.BOND_STATUS_UNBONDED],
        ...Pagination,
      });

      const [v2] = await lcd.staking.validators({
        status: BondStatus[BondStatus.BOND_STATUS_UNBONDING],
        ...Pagination,
      });

      const [v3] = await lcd.staking.validators({
        status: BondStatus[BondStatus.BOND_STATUS_BONDED],
        ...Pagination,
      });

      return uniqBy(path(["operator_address"]), [...v1, ...v2, ...v3]);
    },
    { ...RefetchOptions.INFINITY }
  );
};

export const useDelegations = (address: string) => {
  const lcd = useLCDClient();
  return useQuery(
    [lcd.config, address, "staking"],
    async () => await lcd.staking.delegations(address),
    { ...RefetchOptions.DEFAULT }
  );
};

export const useUndelegations = (address: string) => {
  const lcd = useLCDClient();
  return useQuery(
    [lcd.config, "unstaking", address],
    async () => {
      const [undelegations] = await lcd.staking.unbondingDelegations(address);
      return undelegations;
    },
    { ...RefetchOptions.DEFAULT }
  );
};

/* helpers */
export const getFindValidator =
  (validators: Validator[]) => (address: AccAddress) => {
    const validator = validators.find((v) => v.operator_address === address);
    if (!validator) {
      throw new Error(`${address} is not a validator`);
    }
    return validator;
  };

export const getFindMoniker =
  (validators: Validator[]) => (address: AccAddress) => {
    const validator = getFindValidator(validators)(address);
    return validator.description.moniker;
  };

export const convertAddressToHex = (address: string) =>
  Buffer.from(bech32.fromWords(bech32.decode(address).words)).toString("hex");

const validatorCache = new Map();

export const getValidatorOperatorAddressByHexAddress = (
  validators: Validator[],
  validatorSet: DelegateValidator[],
  hex: string
) => {
  if (validatorCache.has(hex)) {
    return validatorCache.get(hex);
  }

  validatorSet.forEach((s) => {
    const v = validators.find((v) => v.consensus_pubkey.key === s.pub_key.key);

    if (v) {
      const h = convertAddressToHex(s.address).toLowerCase();
      validatorCache.set(h, v.operator_address);
    }
  });

  return validatorCache.get(hex);
};
