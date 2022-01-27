import { useQuery } from "react-query";
import { isDenomIBC } from "@terra.kitchen/utils";
import { useLCDClient } from "./lcdClient";
import { RefetchOptions } from "./query";

export const useIBCBaseDenom = (denom: string, enabled: boolean) => {
  const lcd = useLCDClient();

  return useQuery(
    ["IBCDenomTrace", denom],
    async () => {
      const { base_denom } = await lcd.ibcTransfer.denomTrace(
        denom.replace("ibc/", "")
      );

      return base_denom;
    },
    { ...RefetchOptions.INFINITY, enabled: isDenomIBC(denom) && enabled }
  );
};
