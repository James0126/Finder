import { isDenomIBC } from "@terra.kitchen/utils";
import { useBankBalance } from "../../queries/bank";
import Card from "../../components/Card";
import IBCAmount from "../token/IBCAmount";
import NativeAmount from "../token/NativeAmount";
import { sortByDenom } from "../../scripts/coin";

const TokenBalance = ({ address }: { address: string }) => {
  const { data: balance } = useBankBalance(address);
  const native = balance?.filter((coin) => !isDenomIBC(coin.denom)).toArray();
  const ibc = balance?.filter((coin) => isDenomIBC(coin.denom)).toArray();
  const sortNative = native && sortByDenom(native);

  return (
    <section>
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
    </section>
  );
};

export default TokenBalance;
