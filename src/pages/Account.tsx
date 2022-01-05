import Delegations from "../components/Delegations";
import TokenBalance from "../components/TokenBalance";
import Undelegations from "../components/Undelegations";

const Account = () => {
  return (
    <section>
      <h1>Account</h1>
      <TokenBalance />
      <Delegations />
      <Undelegations />
    </section>
  );
};

export default Account;
