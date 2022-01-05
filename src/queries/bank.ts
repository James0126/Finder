import { Coins } from "@terra-money/terra.js";
import { useQuery } from "react-query";
import { useCurrentChain } from "../contexts/ChainsContext";
import { useLCDClient } from "./lcdClient";

export const useBankBalance = (address: string) => {
  const lcd = useLCDClient();
  const { name } = useCurrentChain();
  return useQuery([name, "balance", address], async () => {
    if (!address) {
      return new Coins();
    }
    // TODO: Pagination
    // Required when the number of results exceed 100
    const [coins] = await lcd.bank.balance(address);
    return coins;
  });
};
