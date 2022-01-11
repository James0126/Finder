import { ContractInfo } from "@terra-money/terra.js";
import Delegations from "../containers/address/Delegations";
import TokenBalance from "../containers/address/TokenBalance";
import Transactions from "../containers/address/Transactions";
import Undelegations from "../containers/address/Undelegations";
import ContractDetails from "../containers/contract/ContractDetails";
import WhitelistContract from "../containers/contract/WhitelistContract";

interface Props {
  contractInfo: ContractInfo;
  address: string;
}

const Contract = ({ contractInfo, address }: Props) => (
  <section>
    <h1>Contract</h1>
    <WhitelistContract address={address} />
    <ContractDetails contractInfo={contractInfo} />
    <TokenBalance address={address} />
    <Delegations address={address} />
    <Undelegations address={address} />
    <Transactions address={address} />
  </section>
);

export default Contract;
