import { useQuery } from "react-query";
import { useLCDClient } from "./lcdClient";
import { RefetchOptions } from "./query";

export const useAccountInfo = (address: string) => {
  const lcd = useLCDClient();
  return useQuery(
    [lcd.config, address, "accountInfo"],
    async () => await lcd.auth.accountInfo(address),
    { ...RefetchOptions.INFINITY }
  );
};
