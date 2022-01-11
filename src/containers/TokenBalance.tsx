import { isDenomIBC } from "@terra.kitchen/utils";
import { useBankBalance } from "../queries/bank";
import Card from "../components/Card";
import IBCAmount from "./IBCAmount";
import NativeAmount from "./NativeAmount";
import { sortByDenom } from "../scripts/coin";

const TokenBalance = ({ address }: { address: string }) => {
  const { data: balance } = useBankBalance(address);
  const native = balance?.filter((coin) => !isDenomIBC(coin.denom)).toArray();
  const ibc = balance?.filter((coin) => isDenomIBC(coin.denom)).toArray();
  const sortNative = native && sortByDenom(native);

  return (
    <article>
      <Card title={"Coins"}>
        {sortNative?.length
          ? sortNative.map((coin, key) => (
              <NativeAmount coin={coin} key={key} />
            ))
          : "This account doesn't hold any coins yet."}
      </Card>

      <Card title={"Tokens"}>
        {/* TODO: Add tokens */}
        {ibc?.map((token, key) => (
          <IBCAmount token={token} key={key} />
        ))}
      </Card>
    </article>
  );
};

export default TokenBalance;
