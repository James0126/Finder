import { Coin } from "@terra-money/terra.js";
import { useCurrentChain } from "../contexts/chainsContext";
import { useTerraAssets } from "../queries/assets";
import format from "../scripts/format";
import Amount from "./Amount";

const IBCAmount = ({ token }: { token: Coin }) => {
  const { denom, amount } = token;
  const { name: network } = useCurrentChain();
  const { data } = useTerraAssets<IBCWhitelist>("/ibc/tokens.json");

  const hash = denom.replace("ibc/", "");
  const value = format.amount(amount.toString());
  const whitelist = data?.[network];
  const tokenInfo = whitelist?.[hash];

  //임시
  const iconSize = "60px";

  return tokenInfo ? (
    <Amount
      amount={value}
      denom={tokenInfo.symbol}
      iconUrl={tokenInfo.icon}
      iconSize={iconSize}
    />
  ) : null;
};

export default IBCAmount;
