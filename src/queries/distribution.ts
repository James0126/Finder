import { useQuery } from "react-query";
import { useLCDClient } from "./lcdClient";
import { RefetchOptions } from "./query";

export const useDelegationReward = (address: string) => {
  const lcd = useLCDClient();
  return useQuery(
    [lcd.config, address, "delegationReward"],
    async () => await lcd.distribution.rewards(address),
    { ...RefetchOptions.DEFAULT }
  );
};
