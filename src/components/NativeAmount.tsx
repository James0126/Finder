import { useRecoilValue } from "recoil";
import { Coin } from "@terra-money/terra.js";
import { ASSET } from "../config/constants";
import format from "../scripts/format";
import { currencyState } from "../store/CurrencyStore";

const NativeAmount = ({ coin }: { coin: Coin }) => {
  const { amount, denom } = coin;
  const coinValue = format.amount(amount.toString());
  const coinDenom = format.denom(denom);
  const iconLink = `${ASSET}/icon/60/${coinDenom}.png`;

  const currnecy = useRecoilValue(currencyState);

  // const currnecyRender = () => {
  //   if (!currnecy) {
  //     return null;
  //   }

  //   const result = div(amount?.toString(), currnecy?.amount?.toString());

  //   return (
  //     currnecy.denom !== denom && (
  //       <span>{`${format.denom(result?.toString())} ${format.denom(
  //         currnecy.denom
  //       )}`}</span>
  //     )
  //   );
  // };

  return (
    <div>
      <img alt="denom" src={iconLink} />
      {`${coinValue} ${coinDenom}`}
      <br />
    </div>
  );
};

export default NativeAmount;
