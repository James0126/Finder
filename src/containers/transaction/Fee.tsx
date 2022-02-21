import { memo } from "react";
import { isDenomIBC, readAmount, readDenom } from "@terra.kitchen/utils";
import Amount from "../../components/Amount";
import { formatIBCDenom, sortByDenom } from "../../scripts/coin";
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
        const ibc =
          isDenomIBC(denom) && ibcWhitelist[formatIBCDenom(denom)]?.symbol;
        return (
          <Amount
            amount={readAmount(amount, { comma: true })}
            denom={ibc || readDenom(denom)}
            key={key}
          />
        );
      })}
    </div>
  );
};

export default memo(Fee);
