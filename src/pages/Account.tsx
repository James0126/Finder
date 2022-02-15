import AddressDetail from "./AddressDetail";

const Account = ({ address }: { address: string }) => (
  <section>
    <h1>Account</h1>
    <AddressDetail address={address} />
  </section>
);

export default Account;
