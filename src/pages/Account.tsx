import Delegations from "../containers/address/Delegations";
import Balance from "../containers/address/Balance";
import Undelegations from "../containers/address/Undelegations";
import Txs from "../containers/address/Txs";

const Account = ({ address }: { address: string }) => (
  <section>
    <h1>Account</h1>
    <Balance address={address} />
    <Delegations address={address} />
    <Undelegations address={address} />
    <Txs address={address} />
  </section>
);

export default Account;
