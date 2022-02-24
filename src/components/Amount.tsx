import classnames from "classnames";
import Image from "./Image";
import s from "./Amount.module.scss";

interface Props {
  amount: string;
  denom?: string;
  iconUrl?: string;
  iconSize?: number;
  mainClassName?: string;
  amountClassName?: string;
  hideDenom?: boolean;
}

const Amount = (props: Props) => {
  const {
    iconUrl,
    amount,
    denom,
    iconSize,
    mainClassName,
    amountClassName,
    hideDenom,
  } = props;

  const header = iconUrl && (
    <div className={s.header}>
      <Image url={iconUrl} size={iconSize} className={s.icon} />
      <span>{denom}</span>
    </div>
  );

  const render = !hideDenom ? `${amount} ${denom}` : amount;

  return (
    <div className={mainClassName}>
      {header}
      <span className={classnames(s.amount, amountClassName)}>{render}</span>
    </div>
  );
};

export default Amount;
