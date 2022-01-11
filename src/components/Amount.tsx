import Image from "./Image";

type Props = {
  amount: string;
  denom: string;
  iconUrl?: string;
  iconSize?: number;
};

const Amount = (props: Props) => {
  const { iconUrl, amount, denom, iconSize } = props;
  return (
    <div>
      {iconUrl && <Image url={iconUrl} size={iconSize} />}
      {`${amount} ${denom}`}
    </div>
  );
};

export default Amount;
