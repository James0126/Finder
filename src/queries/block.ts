import { useQuery } from "react-query";
import { useLCDClient } from "./lcdClient";

export const useBlock = (height?: number) => {
  const lcd = useLCDClient();
  const { data } = useQuery(
    [height, "block"],
    async () => await lcd.tendermint.blockInfo()
  );

  return data;
};
