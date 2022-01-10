import Image from "./Image";

type Props = {
  iconUrl: string;
  amount: string;
  denom: string;
  iconSize?: number;
  hideIcon?: boolean;
};

const Amount = (props: Props) => {
  const { iconUrl, amount, denom, hideIcon, iconSize } = props;
  return (
    <div>
      {!hideIcon && <Image url={iconUrl} size={iconSize} />}
      {`${amount} ${denom}`}
    </div>
  );
};

export default Amount;
