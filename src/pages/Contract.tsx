import { ContractInfo } from "@terra-money/terra.js";
import Delegations from "../containers/address/Delegations";
import Balance from "../containers/address/Balance";
import Transactions from "../containers/address/Transactions";
import Undelegations from "../containers/address/Undelegations";
import ContractDetails from "../containers/contract/ContractDetails";
import ContractTitle from "../containers/contract/ContractTitle";

interface Props {
  contractInfo: ContractInfo;
  address: string;
}

const Contract = ({ contractInfo, address }: Props) => (
  <section>
    <h1>Contract</h1>
    <ContractTitle address={address} />
    <ContractDetails contractInfo={contractInfo} />
    <Balance address={address} />
    <Delegations address={address} />
    <Undelegations address={address} />
    <Transactions address={address} />
  </section>
);

export default Contract;
