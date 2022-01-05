import { useQuery } from "react-query";
import { useLCDClient } from "./lcdClient";

export const useContractInfo = (address: string) => {
  const lcd = useLCDClient();
  return useQuery(
    [address, "contractInfo"],
    async () => await lcd.wasm.contractInfo(address)
  );
};

export const useAccountInfo = (address: string) => {
  const lcd = useLCDClient();
  return useQuery(
    [address, "accountInfo"],
    async () => await lcd.auth.accountInfo(address)
  );
};
