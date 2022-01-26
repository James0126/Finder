import { readAmount } from "@terra.kitchen/utils";
import { useTokenBalance } from "../../queries/wasm";
import CW20Amount from "../token/CW20Amount";

interface Props extends CustomTokenCW20 {
  address: string;
}

const CW20Asset = ({ address, ...item }: Props) => {
  const { token, decimals } = item;
  const { data: balance } = useTokenBalance(token, address);

  const amount = readAmount(balance, { decimals: decimals, comma: true });

  return <CW20Amount balance={amount} token={token} />;
};

export default CW20Asset;
