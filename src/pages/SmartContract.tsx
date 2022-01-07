import ContractInfo from "../components/ContractDetails";
import Delegations from "../components/Delegations";
import TokenBalance from "../components/TokenBalance";
import Transactions from "../components/Transactions";
import Undelegations from "../components/Undelegations";
import WhitelistContract from "../components/WhitelistContract";

const SmartContract = () => {
  return (
    <section>
      <h1>SmartContract</h1>
      <WhitelistContract />
      <ContractInfo />
      <TokenBalance />
      <Delegations />
      <Undelegations />
      <Transactions />
    </section>
  );
};

export default SmartContract;
