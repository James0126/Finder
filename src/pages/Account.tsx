import Delegations from "../containers/address/Delegations";
import Balance from "../containers/address/Balance";
import Transactions from "../containers/address/Transactions";
import Undelegations from "../containers/address/Undelegations";

const Account = ({ address }: { address: string }) => (
  <section>
    <h1>Account</h1>
    <Balance address={address} />
    <Delegations address={address} />
    <Undelegations address={address} />
    <Transactions address={address} />
  </section>
);

export default Account;
