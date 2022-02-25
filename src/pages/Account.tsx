import { ValAddress } from "@terra-money/terra.js";
import { useValidator } from "../queries/staking";
import CopyAddress from "../components/CopyAddress";
import Tag from "../components/Tag";
import Page from "../components/Page";
import AddressDetail from "./AddressDetail";
import s from "./Account.module.scss";

const Account = ({ address }: { address: string }) => {
  const validatorAddress = ValAddress.fromAccAddress(address);
  const { data: validator } = useValidator(validatorAddress);
  const tag = validator && <Tag className={s.validator}>Validator</Tag>;
  return (
    <Page title="Account" tag={tag}>
      <CopyAddress className={s.copy}>{address}</CopyAddress>
      <AddressDetail address={address} />
    </Page>
  );
};

export default Account;
