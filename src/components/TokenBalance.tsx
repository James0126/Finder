import { useParams } from "react-router";
import { useBankBalance } from "../queries/bank";
import { isIbcDenom } from "../scripts/utility";
import IBCAmount from "./IBCAmount";
import NativeAmount from "./NativeAmount";

const TokenBalance = () => {
  const { address = "" } = useParams();
  const balance = useBankBalance(address);
  const native = balance?.filter((coin) => !isIbcDenom(coin.denom));
  const ibc = balance?.filter((coin) => isIbcDenom(coin.denom));

  return (
    <article>
      {/* TODO: Card Component */}
      <div>
        <h2>Coins</h2>
        {native?.map((coin) => (
          <NativeAmount coin={coin} key={coin.toString()} />
        ))}
      </div>

      <div>
        <h2>Tokens</h2>
        {ibc?.map((token) => (
          <IBCAmount token={token} key={token.toString()} />
        ))}
      </div>
    </article>
  );
};

export default TokenBalance;
