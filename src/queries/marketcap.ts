import { Coin } from "@terra-money/terra.js";
import { useQueries } from "react-query";
import { useSupply } from "./bank";
import { useCommunityPool } from "./distribution";
import { useLCDClient } from "./lcdClient";
import { RefetchOptions } from "./query";
import { useDelegations, useUndelegations } from "./staking";

const wallets = [
  "terra1dp0taj85ruc299rkdvzp4z5pfg6z6swaed74e6", //foundation
  "terra1jgp27m8fykex4e4jtt0l7ze8q528ux2lh4zh0f", //oracle reward
  "terra1sk06e3dyexuq4shw77y3dsv480xv42mq73anxu", //burn
  "terra1luk43x0g9vva7ws7ju9cl7g206wmeafzxl7vpz", // ?
];

export const useMarketCap = () => {
  const { data: communityPool } = useCommunityPool();
  const { data: supply } = useSupply();
  const balances = useWalletBalances();
  const delegationBalance = useFoundationStaking(wallets[0]);

  if (!communityPool || !supply || !balances || !delegationBalance) {
    return null;
  }

  const supplyData = supply
    .filter((data) => data.denom === "uluna")
    .map(({ denom, amount }) =>
      Coin.fromData({ denom, amount: amount.toString() })
    )
    .reduce((prev, current) => prev.add(current));

  const lunaBalance = balances
    .map((data) => {
      if (!data.data) return undefined;
      const [coins] = data.data;
      return coins.get("uluna");
    })
    .filter(Boolean)
    ?.reduce((prev, current) => current && prev?.add(current));

  const coins = communityPool
    .toArray()
    .filter((coin) => coin.denom === "uluna")
    .reduce((prev, current) => prev.add(current));

  if (!supplyData || !coins || !lunaBalance || !delegationBalance) return null;

  const list = [supplyData, coins, lunaBalance, delegationBalance].reduce(
    (prev, current) => current && prev?.sub(current)
  );

  return list;
};

const useWalletBalances = () => {
  const lcd = useLCDClient();
  return useQueries(
    wallets.map(
      (address, key) => ({
        queryKey: [lcd.config, address, key, "walletBalances"],
        queryFn: () => lcd.bank.balance(address),
      }),
      { ...RefetchOptions.INFINITY }
    )
  );
};

const useFoundationStaking = (address: string) => {
  const { data: delegations } = useDelegations(address);
  const { data: undelegations } = useUndelegations(address);

  if (!delegations || !undelegations) return null;

  const [delegation] = delegations;

  if (!delegation.length) return null;

  const delegationBalance = delegation
    .map((data) => data.balance)
    .reduce((prev, current) => prev.add(current));

  return delegationBalance;
};
