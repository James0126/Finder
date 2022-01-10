import { ContractInfo } from "@terra-money/terra.js";
import ContractDetails from "../containers/ContractDetails";
import Delegations from "../containers/Delegations";
import TokenBalance from "../containers/TokenBalance";
import Transactions from "../containers/Transactions";
import Undelegations from "../containers/Undelegations";
import WhitelistContract from "../containers/WhitelistContract";

interface Props {
  contractInfo: ContractInfo;
  address: string;
}

const Contract = ({ contractInfo, address }: Props) => {
  return (
    <section>
      <h1>Contract</h1>
      <WhitelistContract address={address} />
      <ContractDetails contractInfo={contractInfo} />
      <TokenBalance address={address} />
      <Delegations address={address} />
      <Undelegations address={address} />
      <Transactions />
    </section>
  );
};

export default Contract;
