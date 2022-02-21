import { ReactNode, useMemo } from "react";
import capitalize from "@mui/utils/capitalize";
import { isDenom, truncate } from "@terra.kitchen/utils";
import { AccAddress, Coin, Coins, ValAddress } from "@terra-money/terra.js";
import FinderLink from "../../components/FinderLink";
import { useValidators } from "../../queries/staking";
import Read from "../../components/Read";
import { WithTokenItem } from "../custom/tokens";
import { useNetworkName } from "../../contexts/ChainsContext";
import { useCW20Contracts, useCW20Whitelist } from "../../queries/assets";

const ValidatorAddress = ({ children: address }: { children: string }) => {
  const { data: validators } = useValidators();
  const moniker = validators?.find(
    ({ operator_address }) => operator_address === address
  )?.description.moniker;

  return (
    <FinderLink value={address} short={!moniker} validator>
      {moniker ?? address}
    </FinderLink>
  );
};

const TerraAddress = ({ children: address }: { children: string }) => {
  const { data: contracts } = useCW20Contracts();
  const { data: tokens } = useCW20Whitelist();
  const network = useNetworkName();
  const name = useMemo(() => {
    if (!(contracts && tokens)) return;
    const cw20Token = tokens[network];
    const cw20Contract = contracts[network];
    const contract = cw20Token[address] ?? cw20Contract[address];
    if (!contract) return;
    const { protocol, name, symbol } = contract;
    return symbol ?? [protocol, name].join(" ");
  }, [address, contracts, tokens, network]);

  return <FinderLink value={address}>{name ?? truncate(address)}</FinderLink>;
};

const Tokens = ({ children: coins }: { children: string }) => {
  const list = new Coins(coins).toArray();

  return (
    <>
      {list.length > 1
        ? "multiple tokens" // Do not translate this
        : list.map((coin) => {
            const data = coin.toData();
            const { denom } = data;

            return (
              <WithTokenItem token={denom} key={denom}>
                {({ decimals }) => <Read {...data} decimals={decimals} />}
              </WithTokenItem>
            );
          })}
    </>
  );
};

interface Props {
  children?: string;
  className?: string;
}

const TxMessage = ({ children: sentence, className }: Props) => {
  if (!sentence) return null;

  const parse = (word: string, index: number): ReactNode => {
    if (!word) return null;
    if (word.endsWith(",")) return <>{parse(word.slice(0, -1), index)},</>;

    return validateTokens(word) ? (
      <Tokens>{word}</Tokens>
    ) : AccAddress.validate(word) ? (
      <TerraAddress>{word}</TerraAddress>
    ) : ValAddress.validate(word) ? (
      <ValidatorAddress>{word}</ValidatorAddress>
    ) : !index ? (
      capitalize(word)
    ) : (
      word
    );
  };

  return (
    <p className={className}>
      {sentence
        .split(" ")
        .filter((word, index) => index || word)
        .map((word, index) => {
          const parsed = parse(word, index);

          return !index ? (
            <strong key={index}>{parsed}</strong>
          ) : (
            <span key={index}> {parsed}</span>
          );
        })}
    </p>
  );
};

export default TxMessage;

/* helpers */
const validateTokens = (tokens: any) => {
  const validate = ({ denom }: Coin) =>
    isDenom(denom) || AccAddress.validate(denom);

  try {
    const coins = new Coins(tokens);
    return coins.toArray().every(validate);
  } catch {
    return false;
  }
};
