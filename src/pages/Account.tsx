import Delegations from "../containers/address/Delegations";
import TokenBalance from "../containers/address/TokenBalance";
import Transactions from "../containers/address/Transactions";
import Undelegations from "../containers/address/Undelegations";

const Account = ({ address }: { address: string }) => (
  <section>
    <h1>Account</h1>
    <TokenBalance address={address} />
    <Delegations address={address} />
    <Undelegations address={address} />
    <Transactions address={address} />
  </section>
);

export default Account;
