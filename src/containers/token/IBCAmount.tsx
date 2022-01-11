import { Coin } from "@terra-money/terra.js";
import { readAmount } from "@terra.kitchen/utils";
import { useIBCTokenInfo } from "../../queries/assets";
import Amount from "../../components/Amount";

const IBCAmount = ({ token }: { token: Coin }) => {
  const { denom, amount } = token;
  const hash = denom.replace("ibc/", "");
  const value = readAmount(amount.toString(), { comma: true });
  const ibc = useIBCTokenInfo(hash);

  return ibc ? (
    <Amount
      amount={value}
      denom={ibc.symbol}
      iconUrl={ibc.icon}
      iconSize={60}
    />
  ) : null;
};

export default IBCAmount;
