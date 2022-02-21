import { memo } from "react";
import { isDenomIBC, readAmount, readDenom } from "@terra.kitchen/utils";
import Amount from "../../components/Amount";
import { sortByDenom } from "../../scripts/coin";
import { useIBCWhitelist } from "../../queries/assets";
import { useNetworkName } from "../../contexts/ChainsContext";

interface Props {
  coins: CoinData[];
  slice?: number;
  className?: string;
}

const Fee = ({ coins, slice, className }: Props) => {
  const network = useNetworkName();
  const { data: ibcResponse } = useIBCWhitelist();

  if (!ibcResponse) return null;

  const ibcWhitelist = ibcResponse[network];
  const fee = sortByDenom([...coins]).slice(0, slice);
  return (
    <div className={className}>
      {fee.map(({ amount, denom }, key) => {
        const coinDenom = readDenom(denom);
        const ibc =
          isDenomIBC(denom) && (ibcWhitelist[coinDenom]?.symbol || "Tokens");
        return (
          <Amount
            amount={readAmount(amount, { comma: true })}
            denom={ibc || coinDenom}
            key={key}
          />
        );
      })}
    </div>
  );
};

export default memo(Fee);
