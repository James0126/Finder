import Delegations from "../components/Delegations";
import TokenBalance from "../components/TokenBalance";

const Account = () => {
  return (
    <section>
      Account
      <TokenBalance />
      <Delegations />
    </section>
  );
};

export default Account;
