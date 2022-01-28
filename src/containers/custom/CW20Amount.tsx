import { readAmount } from "@terra.kitchen/utils";
import Amount from "../../components/Amount";
import { DefaultCW20Icon } from "../../config/constants";
import { useNetworkName } from "../../contexts/ChainsContext";
import { useCW20Tokens } from "../../queries/assets";
import { useInitMsg, useTokenBalance } from "../../queries/wasm";

interface Props extends CustomTokenCW20 {
  address: string;
}

const CW20Amount = ({ address, ...item }: Props) => {
  const { token, decimals } = item;
  const { data: balance } = useTokenBalance(token, address);
  const { data: tokenInfo } = useInitMsg<{ symbol: string }>(token);
  const { data: cw20 } = useCW20Tokens();
  const network = useNetworkName();

  if (!cw20 || !balance) return null;

  const amount = readAmount(balance, { decimals: decimals, comma: true });
  const cw20Token = cw20[network][token];
  const symbol = cw20Token?.symbol ?? tokenInfo?.symbol;
  const icon = cw20Token?.icon ?? DefaultCW20Icon;

  return <Amount amount={amount} denom={symbol} iconUrl={icon} />;
};

export default CW20Amount;
