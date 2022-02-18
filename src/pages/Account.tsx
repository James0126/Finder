import { ValAddress } from "@terra-money/terra.js";
import Flex from "../components/Flex";
import { useValidator } from "../queries/staking";
import AddressDetail from "./AddressDetail";
import s from "./Account.module.scss";

const Account = ({ address }: { address: string }) => {
  const validatorAddress = ValAddress.fromAccAddress(address);
  const { data: validator } = useValidator(validatorAddress);
  return (
    <section>
      <Flex start className={s.title}>
        <h1 className={s.account}>Account</h1>
        {validator && <span className={s.validator}>Validator</span>}
      </Flex>
      <AddressDetail address={address} />
    </section>
  );
};

export default Account;
