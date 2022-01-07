import { ContractInfo } from "@terra-money/terra.js";
import ContractDetails from "../components/ContractDetails";
import Delegations from "../components/Delegations";
import TokenBalance from "../components/TokenBalance";
import Transactions from "../components/Transactions";
import Undelegations from "../components/Undelegations";
import WhitelistContract from "../components/WhitelistContract";

type Props = {
  contractInfo: ContractInfo;
  address: string;
};

const SmartContract = ({ contractInfo, address }: Props) => {
  return (
    <section>
      <h1>SmartContract</h1>
      <WhitelistContract />
      <ContractDetails contractInfo={contractInfo} />
      <TokenBalance address={address} />
      <Delegations address={address} />
      <Undelegations address={address} />
      <Transactions />
    </section>
  );
};

export default SmartContract;
