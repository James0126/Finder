import { Coin, Coins } from "@terra-money/terra.js";
import axios from "axios";
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

export const useSupply = () => {
  const lcd = useLCDClient();

  return useQuery(
    [lcd.config, "Supply"],
    async () => {
      // TODO: Pagination
      // Required when the number of results exceed 100
      const { data } = await axios.get<{ supply: Coin[] }>(
        "cosmos/bank/v1beta1/supply", // FIXME: Import from terra.js
        { baseURL: lcd.config.URL }
      );

      return data.supply;
    },
    { ...RefetchOptions.INFINITY }
  );
};
