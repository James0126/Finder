import { isDenomIBC, readAmount } from "@terra.kitchen/utils";
import { useIBCTokens } from "../../queries/assets";
import Amount from "../../components/Amount";
import { useNetworkName } from "../../contexts/ChainsContext";
import { useBankBalance } from "../../queries/bank";

const IBCAmount = ({ address, denom }: { address: string; denom: string }) => {
  const network = useNetworkName();
  const { data: ibcWhitelist } = useIBCTokens();
  const { data: balance } = useBankBalance(address);

  if (!ibcWhitelist || !balance) return null;

  const ibcBalance = balance
    .filter((coin) => isDenomIBC(coin.denom) && coin.denom === denom)
    .toArray();
  const whitelist = ibcWhitelist[network];

  const ibc = ibcBalance.map((ibc) => {
    const hash = ibc.denom.replace("ibc/", "");
    const { symbol, icon } = whitelist[hash];
    const value = readAmount(ibc.amount.toString(), { comma: true });
    return { value, symbol, icon };
  });

  return (
    <>
      {ibc.length
        ? ibc.map(({ value, symbol, icon }) => (
            <Amount amount={value} denom={symbol} iconUrl={icon} key={symbol} />
          ))
        : null}
    </>
  );
};

export default IBCAmount;
