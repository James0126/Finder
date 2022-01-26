import Image from "../../components/Image";
import { useNetworkName } from "../../contexts/ChainsContext";
import { useCW20Tokens } from "../../queries/assets";

interface Props {
  token: string;
  balance: string;
}

const CW20Amount = (props: Props) => {
  const network = useNetworkName();
  const { data } = useCW20Tokens();
  const { token, balance } = props;

  if (!data) return null;

  const cw20Whitelist = data[network];
  const cw20Token = cw20Whitelist[token];
  const { icon, symbol } = cw20Token;

  return (
    <>
      <Image url={icon || ""} />
      <div>{symbol}</div>
      <div>{balance}</div>
    </>
  );
};

export default CW20Amount;
