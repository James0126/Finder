import { readAmount } from "@terra.kitchen/utils";
import { useIBCWhitelist } from "../../queries/assets";
import { useBankBalance } from "../../queries/bank";
import Amount from "../../components/Amount";
import { useNetworkName } from "../../contexts/ChainsContext";

const IBCAmount = ({ address, denom }: { address: string; denom: string }) => {
  const network = useNetworkName();
  const { data: ibcWhitelist } = useIBCWhitelist();
  const { data: balance } = useBankBalance(address);

  if (!ibcWhitelist) return null;

  const whitelist = ibcWhitelist[network];
  const key = denom.replace("ibc/", "");
  const { symbol, icon } = whitelist[key];
  const ibc = balance?.get(denom);
  const amount = readAmount(ibc?.amount.toString(), { comma: true });

  return <Amount amount={amount} denom={symbol} iconUrl={icon} key={symbol} />;
};

export default IBCAmount;
