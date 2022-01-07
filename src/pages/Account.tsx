import Delegations from "../components/Delegations";
import TokenBalance from "../components/TokenBalance";
import Transactions from "../components/Transactions";
import Undelegations from "../components/Undelegations";

const Account = ({ address }: { address: string }) => (
  <section>
    <h1>Account</h1>
    <TokenBalance address={address} />
    <Delegations address={address} />
    <Undelegations address={address} />
    <Transactions />
  </section>
);

export default Account;
