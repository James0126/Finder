import Card from "../../components/Card";
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
          content: (
            <Card className={s.card} bordered>
              <IBCAmount denom={denom} address={address} key={denom} />
            </Card>
          ),
        })),
        ...cw20.map((item) => ({
          content: (
            <Card className={s.card} bordered>
              <CW20Amount address={address} {...item} key={item.token} />
            </Card>
          ),
        })),
      ]}
      itemClassName={s.item}
      mainClassName={s.list}
    />
  );
};

export default AddTokens;
