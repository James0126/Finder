import { Coin } from "@terra-money/terra.js";
import { readAmount } from "@terra.kitchen/utils";
import { useCurrentChain } from "../contexts/ChainsContext";
import { useTerraAssets } from "../queries/assets";
import Amount from "../components/Amount";

const IBCAmount = ({ token }: { token: Coin }) => {
  const { denom, amount } = token;
  const { name: network } = useCurrentChain();
  const { data } = useTerraAssets<IBCWhitelist>("/ibc/tokens.json");

  const hash = denom.replace("ibc/", "");
  const value = readAmount(amount.toString(), { comma: true });
  const whitelist = data?.[network];
  const tokenInfo = whitelist?.[hash];

  return tokenInfo ? (
    <Amount
      amount={value}
      denom={tokenInfo.symbol}
      iconUrl={tokenInfo.icon}
      iconSize={60}
    />
  ) : null;
};

export default IBCAmount;
