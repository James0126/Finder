import { useParams } from "react-router";
import { useBankBalance } from "../queries/bank";
import { isIbcDenom } from "../scripts/coin";
import Card from "./Card";
import IBCAmount from "./IBCAmount";
import NativeAmount from "./NativeAmount";

const TokenBalance = () => {
  const { address = "" } = useParams();
  const { data: balance } = useBankBalance(address);
  const native = balance?.filter((coin) => !isIbcDenom(coin.denom));
  const ibc = balance?.filter((coin) => isIbcDenom(coin.denom));

  return (
    <article>
      <Card title={"Coins"}>
        {native?.map((coin) => (
          <NativeAmount coin={coin} key={coin.toString()} />
        ))}
      </Card>

      <Card title={"Tokens"}>
        {ibc?.map((token) => (
          <IBCAmount token={token} key={token.toString()} />
        ))}
      </Card>
    </article>
  );
};

export default TokenBalance;
