import { useQuery } from "react-query";
import { useLCDClient } from "./lcdClient";

export const useActiveDenoms = () => {
  const lcd = useLCDClient();
  return useQuery(
    ["activeDenoms"],
    async () => await lcd.oracle.activeDenoms()
  );
};
