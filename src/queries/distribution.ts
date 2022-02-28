import { useQuery } from "react-query";
import { useLCDClient } from "./lcdClient";
import { RefetchOptions } from "./query";

export const useCommunityPool = () => {
  const lcd = useLCDClient();
  return useQuery(
    [lcd.config, "communityPool"],
    async () => await lcd.distribution.communityPool(),
    { ...RefetchOptions.INFINITY }
  );
};
