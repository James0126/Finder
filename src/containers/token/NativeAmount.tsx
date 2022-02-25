import { Coin } from "@terra-money/terra.js";
import { readAmount, readDenom } from "@terra.kitchen/utils";
import { ASSET } from "../../config/constants";
import Card from "../../components/layout/Card";
import Amount from "../../components/Amount";
import Image from "../../components/Image";
import Currency from "./Currency";
import s from "./NativeAmount.module.scss";

const NativeAmount = ({ coin }: { coin: Coin }) => {
  const amount = readAmount(coin.amount.toString(), { comma: true });
  const denom = readDenom(coin.denom);
  const iconUrl = `${ASSET}/icon/60/${denom}.png`;

  return (
    <Card small>
      <section className={s.wrapper}>
        <div className={s.logo}>
          <Image url={iconUrl} size={24} />
          <span className={s.denom}>{denom}</span>
        </div>
        <div className={s.amount}>
          <Amount denom={denom} amount={amount} hideDenom />
          <Currency coin={coin} className={s.currency} />
        </div>
      </section>
    </Card>
  );
};

export default NativeAmount;
