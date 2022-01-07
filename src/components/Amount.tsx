type Props = {
  iconUrl: string;
  amount: string;
  denom: string;
  iconSize?: string;
  hideIcon?: boolean;
};

const Amount = (props: Props) => {
  const { iconUrl, amount, denom, hideIcon, iconSize } = props;
  const size = { width: iconSize, height: iconSize };
  const render = (
    <div>
      {!hideIcon && <img alt="icon" src={iconUrl} {...size} />}
      {`${amount} ${denom}`}
    </div>
  );
  return render;
};

export default Amount;
