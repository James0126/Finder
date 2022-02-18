import {
  isDenomTerraNative,
  readAmount,
  readDenom,
} from "@terra.kitchen/utils";
import { Coin } from "@terra-money/terra.js";
import { useCW20Tokens } from "../../queries/assets";
import { useNetworkName } from "../../contexts/ChainsContext";
import Amount from "../../components/Amount";
import Flex from "../../components/Flex";

interface Props {
  coins: Coin[];
  sign: string;
  className: string;
}

const Coins = (props: Props) => {
  const { coins, sign, className } = props;
  const network = useNetworkName();
  const { data } = useCW20Tokens();

  const render = (denom: string) => {
    if (!data) return "Tokens";
    const cw20 = data[network];
    const symbol = cw20[denom]?.symbol;
    return symbol
      ? symbol
      : isDenomTerraNative(denom)
      ? readDenom(denom)
      : "Tokens";
  };

  return (
    <>
      {coins.map(({ amount, denom }) => {
        return (
          <Flex className={className}>
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
