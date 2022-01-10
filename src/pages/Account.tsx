import Delegations from "../containers/Delegations";
import TokenBalance from "../containers/TokenBalance";
import Transactions from "../containers/Transactions";
import Undelegations from "../containers/Undelegations";

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
