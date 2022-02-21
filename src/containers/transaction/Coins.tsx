import {
  isDenomTerraNative,
  readAmount,
  readDenom,
} from "@terra.kitchen/utils";
import { useCW20Whitelist, useIBCWhitelist } from "../../queries/assets";
import { useNetworkName } from "../../contexts/ChainsContext";
import Amount from "../../components/Amount";
import Flex from "../../components/Flex";

interface Props {
  coins: CoinData[];
  sign: string;
  className?: string;
  limit?: number;
}

const Coins = (props: Props) => {
  const { coins, sign, className, limit } = props;
  const network = useNetworkName();
  const { data: cw20Response } = useCW20Whitelist();
  const { data: ibcResponse } = useIBCWhitelist();

  const render = (denom: string) => {
    if (!cw20Response || !ibcResponse) return "Tokens";
    const ibc = ibcResponse[network];
    const cw20 = cw20Response[network];

    const symbol =
      cw20[denom]?.symbol || ibc[denom.replace("ibc/", "")]?.symbol;

    return symbol
      ? symbol
      : isDenomTerraNative(denom)
      ? readDenom(denom)
      : "Tokens";
  };

  return (
    <>
      {coins?.slice(0, limit).map(({ amount, denom }, key) => {
        return (
          <Flex className={className} key={key}>
            <span>{sign}</span>
            <Amount
              amount={readAmount(amount.toString(), { comma: true })}
              denom={render(denom)}
              className={className}
            />
          </Flex>
        );
      })}
    </>
  );
};

export default Coins;
