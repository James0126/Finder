import { Coins } from "@terra-money/terra.js";
import { useQuery } from "react-query";
import { useLCDClient } from "./lcdClient";
import { RefetchOptions } from "./query";

export const useBankBalance = (address: string) => {
  const lcd = useLCDClient();
  return useQuery(
    [lcd.config, address, "balance"],
    async () => {
      if (!address) {
        return new Coins();
      }
      // TODO: Pagination
      // Required when the number of results exceed 100
      const [coins] = await lcd.bank.balance(address, {
        "pagination.reverse": "true",
      });
      return coins;
    },
    { ...RefetchOptions.DEFAULT }
  );
};
