import { Coin } from "@terra-money/terra.js";
import { readAmount } from "@terra.kitchen/utils";
import { useIBCTokens } from "../../queries/assets";
import Amount from "../../components/Amount";
import { useNetworkName } from "../../contexts/ChainsContext";

const IBCAmount = ({ token }: { token: Coin }) => {
  const network = useNetworkName();
  const { denom, amount } = token;
  const hash = denom.replace("ibc/", "");
  const value = readAmount(amount.toString(), { comma: true });
  const { data } = useIBCTokens();

  if (!data) return null;

  const whitelist = data[network];
  const ibc = whitelist[hash];

  return ibc ? (
    <Amount amount={value} denom={ibc.symbol} iconUrl={ibc.icon} />
  ) : null;
};

export default IBCAmount;
