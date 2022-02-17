import AddressDetail from "./AddressDetail";
import s from "./Account.module.scss";

const Account = ({ address }: { address: string }) => (
  <section>
    <h1 className={s.title}>Account</h1>
    <AddressDetail address={address} />
  </section>
);

export default Account;
