import { useQuery } from "react-query";
import { useLCDClient } from "./lcdClient";

export const useBlock = (height?: number) => {
  const lcd = useLCDClient();
  return useQuery(
    [height, "block", lcd.config],
    async () => await lcd.tendermint.blockInfo()
  );
};
