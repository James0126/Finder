import { Delegation, Validator } from "@terra-money/terra.js";
import { useQuery } from "react-query";
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

export const useStaking = (address: string) => {
  const lcd = useLCDClient();
  const { name } = useCurrentChain();
  return useQuery([name, "staking", address], async () => {
    const [delegations] = await lcd.staking.delegations(address);
    const [validators] = await lcd.staking.bondedValidators(address);
    const result: [Delegation[], Validator[]] = [delegations, validators];

    return result;
  });
};

export const useUnstaking = (address: string) => {
  const lcd = useLCDClient();
  const { name } = useCurrentChain();
  return useQuery(
    [name, "unstaking", address],
    async () => await lcd.staking.unbondingDelegations(address)
  );
};
