import List from "../../components/List";
import {
  useCustomTokensCW20,
  useCustomTokensIBC,
} from "../settings/CustomTokens";
import IBCAmount from "../token/IBCAmount";
import CW20Amount from "./CW20Amount";
import s from "./AddTokens.module.scss";

const AddTokens = ({ address }: { address: string }) => {
  const { list: ibc } = useCustomTokensIBC();
  const { list: cw20 } = useCustomTokensCW20();

  if (!ibc.length && !cw20.length) return null;

  return (
    <List
      dataSource={[
        ...ibc.map(({ denom }) => ({
          content: <IBCAmount denom={denom} address={address} key={denom} />,
        })),
        ...cw20.map((item) => ({
          content: <CW20Amount address={address} {...item} key={item.token} />,
        })),
      ]}
      itemClassName={s.item}
      mainClassName={s.list}
    />
  );
};

export default AddTokens;
