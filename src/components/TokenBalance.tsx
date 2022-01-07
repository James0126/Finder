import { useParams } from "react-router";
import { useBankBalance } from "../queries/bank";
import { isIbcDenom } from "../scripts/coin";
import Card from "./Card";
import IBCAmount from "./IBCAmount";
import NativeAmount from "./NativeAmount";

const TokenBalance = () => {
  const { address = "" } = useParams();
  const { data: balance } = useBankBalance(address);
  const native = balance?.filter((coin) => !isIbcDenom(coin.denom)).toArray();
  const ibc = balance?.filter((coin) => isIbcDenom(coin.denom)).toArray();

  return (
    <article>
      <Card title={"Coins"}>
        {native?.length
          ? native.map((coin) => (
              <NativeAmount coin={coin} key={coin.toString()} />
            ))
          : "This account doesn't hold any coins yet."}
      </Card>

      <Card title={"Tokens"}>
        {/* TODO: Add tokens */}
        {ibc?.map((token) => (
          <IBCAmount token={token} key={token.toString()} />
        ))}
      </Card>
    </article>
  );
};

export default TokenBalance;
