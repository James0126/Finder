import Image from "./Image";

type Props = {
  amount: string;
  denom: string;
  iconUrl?: string;
  iconSize?: number;
};

const Amount = (props: Props) => {
  const { iconUrl, amount, denom, iconSize } = props;
  const render = `${amount} ${denom}`;
  return (
    <div>
      {iconUrl && <Image url={iconUrl} size={iconSize} />}
      {render}
    </div>
  );
};

export default Amount;
