import { useQuery } from "react-query";
import { useLCDClient } from "./lcdClient";
import { RefetchOptions } from "./queries";

export const useBlock = (height?: number) => {
  const lcd = useLCDClient();
  return useQuery(
    [height, "block", lcd.config],
    async () => await lcd.tendermint.blockInfo(),
    { ...RefetchOptions.INFINITY }
  );
};
