import { ContractInfo } from "@terra-money/terra.js";
import Delegations from "../containers/address/Delegations";
import Balance from "../containers/address/Balance";
import Undelegations from "../containers/address/Undelegations";
import ContractDetails from "../containers/contract/ContractDetails";
import Txs from "../containers/address/Txs";

interface Props {
  contractInfo: ContractInfo;
  address: string;
}

const Contract = ({ contractInfo, address }: Props) => (
  <section>
    <h1>Contract</h1>
    <ContractDetails contractInfo={contractInfo} />
    <Balance address={address} />
    <Delegations address={address} />
    <Undelegations address={address} />
    <Txs address={address} />
  </section>
);

export default Contract;
