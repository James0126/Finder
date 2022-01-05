import { useQuery } from "react-query";
import { path, uniqBy } from "ramda";
/* TODO: Fix */
import { BondStatus } from "@terra-money/terra.proto/cosmos/staking/v1beta1/staking";
import { LAZY_LIMIT } from "../config/constants";
import { useCurrentChain } from "../contexts/ChainsContext";
import { useLCDClient } from "./lcdClient";

/* For Validator page */

export const useValidator = (address: string) => {
  const lcd = useLCDClient();
  const { name } = useCurrentChain();
  return useQuery(
    [name, "validator", address],
    async () => await lcd.staking.validator(address)
  );
};

/* For SmartContract or Account page */

/* params */
export const Pagination = {
  "pagination.limit": String(LAZY_LIMIT),
};

export const useValidators = () => {
  const lcd = useLCDClient();
  const { name } = useCurrentChain();

  return useQuery([name, "vaidators"], async () => {
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

export const useStaking = (address: string) => {
  const lcd = useLCDClient();
  const { name } = useCurrentChain();
  return useQuery(
    [name, "staking", address],
    async () => await lcd.staking.delegations(address)
  );
};

export const useUnstaking = (address: string) => {
  const lcd = useLCDClient();
  const { name } = useCurrentChain();
  return useQuery([name, "unstaking", address], async () => {
    const [undelegations] = await lcd.staking.unbondingDelegations(address);
    return undelegations;
  });
};
