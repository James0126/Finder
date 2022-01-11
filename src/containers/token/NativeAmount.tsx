import { Coin } from "@terra-money/terra.js";
import { readAmount, readDenom } from "@terra.kitchen/utils";
import { ASSET } from "../../config/constants";
import Amount from "../../components/Amount";
import Currency from "./Currency";

const NativeAmount = ({ coin }: { coin: Coin }) => {
  const amount = readAmount(coin.amount.toString(), { comma: true });
  const denom = readDenom(coin.denom);
  const iconUrl = `${ASSET}/icon/60/${denom}.png`;

  return (
    <div>
      <Amount amount={amount} denom={denom} iconUrl={iconUrl} />
      <Currency coin={coin} />
    </div>
  );
};

export default NativeAmount;
