import { ValAddress } from "@terra-money/terra.js";
import FinderLink from "../../components/FinderLink";
import { useNetworkName } from "../../contexts/ChainsContext";
import { useCW20Contracts, useCW20Tokens } from "../../queries/assets";

const TerraAddress = ({ address }: { address: string }) => {
  const network = useNetworkName();
  const { data: cw20Tokens } = useCW20Tokens();
  const { data: cw20Contracts } = useCW20Contracts();

  if (!cw20Tokens || !cw20Contracts) {
    return ValAddress.validate(address) ? (
      <FinderLink short validator children={address} />
    ) : (
      <FinderLink short children={address} />
    );
  }

  if (ValAddress.validate(address)) {
    return <FinderLink short validator children={address} />;
  }

  const token = cw20Tokens[network][address];
  const contract = cw20Contracts[network][address];

  return token ? (
    <FinderLink value={address} children={token.symbol} />
  ) : contract ? (
    <>
      {contract.protocol}{" "}
      <FinderLink value={address} children={`(${contract.name} Contract)`} />
    </>
  ) : (
    <FinderLink short value={address} children={address} />
  );
};

export default TerraAddress;
