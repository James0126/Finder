import { ValAddress } from "@terra-money/terra.js";
import { useValidator } from "../queries/staking";
import Page from "../components/Page";
import Copy from "../components/Copy";
import AddressDetail from "./AddressDetail";
import s from "./Account.module.scss";

const Account = ({ address }: { address: string }) => {
  const validatorAddress = ValAddress.fromAccAddress(address);
  const { data: validator } = useValidator(validatorAddress);
  return (
    <Page title="Account">
      <section className={s.copy}>
        {address} <Copy text={address} />
      </section>
      {validator && <span className={s.validator}>Validator</span>}
      <AddressDetail address={address} />
    </Page>
  );
};

export default Account;
