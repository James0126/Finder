import {
  useCustomTokensCW20,
  useCustomTokensIBC,
} from "../settings/CustomTokens";
import IBCAmount from "../token/IBCAmount";
import CW20Amount from "./CW20Amount";

//station component

const AddTokens = ({ address }: { address: string }) => {
  const { list: ibc } = useCustomTokensIBC();
  const { list: cw20 } = useCustomTokensCW20();

  if (!ibc.length && !cw20.length) return null;

  return (
    <>
      {!ibc.length
        ? null
        : ibc.map(({ denom }) => (
            <IBCAmount denom={denom} address={address} key={denom} />
          ))}
      {!cw20.length
        ? null
        : cw20.map((item) => (
            <CW20Amount address={address} {...item} key={item.token} />
          ))}
    </>
  );
};

export default AddTokens;
