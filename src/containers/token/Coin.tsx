import { Coin } from "@terra-money/terra.js";
import {
  isDenomTerraNative,
  readAmount,
  readDenom,
} from "@terra.kitchen/utils";
import Amount from "../../components/Amount";
import { useNetworkName } from "../../contexts/ChainsContext";
import { useCW20Contracts, useCW20Whitelist } from "../../queries/assets";

const CoinComponent = ({ coin }: { coin: Coin }) => {
  const { amount, denom } = coin;
  const { data: cw20Tokens } = useCW20Whitelist();
  const { data: cw20Contracts } = useCW20Contracts();
  const network = useNetworkName();
  const balance = readAmount(amount.toString(), { comma: true });

  if (isDenomTerraNative(denom)) {
    const nativeDenom = readDenom(denom);
    return <Amount amount={balance} denom={nativeDenom} />;
  }

  const token = cw20Tokens?.[network][denom];
  //LP Tokens
  const contract = cw20Contracts?.[network][denom];
  const symbol = token?.symbol || contract?.name || "Tokens";

  return <Amount amount={balance} denom={symbol} />;
};

export default CoinComponent;
