import Delegations from "../components/Delegations";
import TokenBalance from "../components/TokenBalance";
import Transactions from "../components/Transactions";
import Undelegations from "../components/Undelegations";

const Account = () => {
  return (
    <section>
      <h1>Account</h1>
      <TokenBalance />
      <Delegations />
      <Undelegations />
      <Transactions />
    </section>
  );
};

export default Account;
