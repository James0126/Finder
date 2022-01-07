import ContractInfo from "../components/ContractInfo";
import Delegations from "../components/Delegations";
import TokenBalance from "../components/TokenBalance";
import Transactions from "../components/Transactions";
import Undelegations from "../components/Undelegations";

const SmartContract = () => {
  return (
    <section>
      <h1>SmartContract</h1>
      <ContractInfo />
      <TokenBalance />
      <Delegations />
      <Undelegations />
      <Transactions />
    </section>
  );
};

export default SmartContract;
