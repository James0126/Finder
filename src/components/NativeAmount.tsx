import { Coin } from "@terra-money/terra.js";
import { ASSET } from "../config/constants";
import format from "../scripts/format";

const NativeAmount = ({ coin }: { coin: Coin }) => {
  const { amount, denom } = coin;
  const coinValue = format.amount(amount.toString());
  const coinDenom = format.denom(denom);
  const iconLink = `${ASSET}/icon/60/${coinDenom}.png`;

  return (
    <div>
      <img alt="denom" src={iconLink} />
      {`${coinValue} ${coinDenom}`}
    </div>
  );
};

export default NativeAmount;
