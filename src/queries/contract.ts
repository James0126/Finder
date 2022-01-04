import { useQuery } from "react-query";
import { useLCDClient } from "./lcdClient";

export const useContractInfo = (address: string) => {
  const lcd = useLCDClient();
  return useQuery(
    [address, "contract"],
    async () => await lcd.wasm.contractInfo(address)
  );
};
