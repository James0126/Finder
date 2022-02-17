import classnames from "classnames";
import Image from "./Image";
import s from "./Amount.module.scss";

interface Props {
  amount: string;
  denom: string;
  iconUrl?: string;
  iconSize?: number;
  className?: string;
}

const Amount = (props: Props) => {
  const { iconUrl, amount, denom, iconSize, className } = props;

  const render = `${amount} ${denom}`;
  const header = iconUrl && (
    <div className={s.header}>
      <Image url={iconUrl} size={iconSize} />
      <span>{denom}</span>
    </div>
  );

  return (
    <div>
      {header}
      <span className={classnames(s.amount, className)}>{render}</span>
    </div>
  );
};

export default Amount;
