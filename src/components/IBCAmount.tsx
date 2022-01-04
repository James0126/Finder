import { Coin } from "@terra-money/terra.js";
import { useCurrentChain } from "../contexts/ChainsContext";
import { useTerraAssets } from "../queries/assets";
import format from "../scripts/format";

const IBCAmount = ({ token }: { token: Coin }) => {
  const { denom, amount } = token;
  const { name: network } = useCurrentChain();
  const hash = denom.replace("ibc/", "");
  const data = useTerraAssets<IBCWhitelist>("/ibc/tokens.json");

  const value = format.amount(amount.toString());
  const whitelist = data?.data?.[network];
  const tokenInfo = whitelist?.[hash];

  return tokenInfo ? (
    <div>
      <img alt="denom" src={tokenInfo?.icon} width={"60px"} height={"60px"} />
      {`${value} ${tokenInfo?.symbol}`}
    </div>
  ) : (
    <></>
  );
};

export default IBCAmount;
