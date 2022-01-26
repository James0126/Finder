import { isDenomIBC } from "@terra.kitchen/utils";
import { useBankBalance } from "../../queries/bank";
import {
  useCustomTokensCW20,
  useCustomTokensIBC,
} from "../settings/CustomTokens";
import IBCAmount from "../token/IBCAmount";
import CW20Asset from "./CW20Asset";

const AddedTokens = ({ address }: { address: string }) => {
  const { list: ibc } = useCustomTokensIBC();
  const { list: cw20 } = useCustomTokensCW20();

  const { data: balance } = useBankBalance(address);

  const render = () => {
    if (!ibc.length && !cw20.length) return null;

    const ibcBalance = balance
      ?.filter((coin) => isDenomIBC(coin.denom))
      .toArray();

    console.log(ibcBalance);

    return (
      <>
        {!ibc.length ? null : ibc.map(({ denom }) => <></>)}
        {!cw20.length
          ? null
          : cw20.map((item) => (
              <CW20Asset address={address} {...item} key={item.token} />
            ))}
      </>
    );
  };

  return render();
};

export default AddedTokens;
