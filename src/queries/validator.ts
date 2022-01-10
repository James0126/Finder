import { useMemo } from "react";
import { useQuery } from "react-query";
import { path, uniqBy } from "ramda";
import BigNumber from "bignumber.js";
import {
  AccAddress,
  DelegateValidator,
  Validator,
} from "@terra-money/terra.js";
/* TODO: Fix terra.js */
import { BondStatus } from "@terra-money/terra.proto/cosmos/staking/v1beta1/staking";
import { LAZY_LIMIT } from "../config/constants";
import { useLCDClient } from "./lcdClient";

/* For Validator page */
export const useValidator = (address: string) => {
  const lcd = useLCDClient();
  return useQuery(
    [lcd.config, "validator", address],
    async () => await lcd.staking.validator(address)
  );
};

export const useValidatorsVotingPower = () => {
  const lcd = useLCDClient();
  return useQuery([lcd.config, "validatorsVotingPower"], async () => {
    //TODO: Iterator
    const [v1] = await lcd.tendermint.validatorSet();
    const [v2] = await lcd.tendermint.validatorSet(undefined, {
      "pagination.offset": String(v1.length),
    });

    return [...v1, ...v2];
  });
};

export const useVotingPowerRate = (pubKey: string) => {
  const { data: validators, ...state } = useValidatorsVotingPower();

  const calcRate = useMemo(() => {
    if (!validators) return;
    return getCalcVotingPowerRate(validators, pubKey);
  }, [validators, pubKey]);

  const data = useMemo(() => {
    if (!calcRate) return;
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

    if (!validator) return;
    const { voting_power } = validator;
    return voting_power ? Number(voting_power) / total : undefined;
  };
};

export const calcSelfDelegation = (validator?: Validator) => {
  if (!validator) return;
  const { min_self_delegation: self, tokens } = validator;
  return self ? Number(self) / Number(tokens) : undefined;
};

/* For SmartContract or Account page */

/* params */
export const Pagination = {
  "pagination.limit": String(LAZY_LIMIT),
};

export const useValidators = () => {
  const lcd = useLCDClient();

  return useQuery([lcd.config, "vaidators"], async () => {
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
  });
};

export const useDelegations = (address: string) => {
  const lcd = useLCDClient();
  return useQuery(
    [lcd.config, "staking", address],
    async () => await lcd.staking.delegations(address)
  );
};

export const useUndelegations = (address: string) => {
  const lcd = useLCDClient();
  return useQuery([lcd.config, "unstaking", address], async () => {
    const [undelegations] = await lcd.staking.unbondingDelegations(address);
    return undelegations;
  });
};

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
