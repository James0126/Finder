import { ContractInfo } from "@terra-money/terra.js";
import Card from "../components/Card";
import ContractDetails from "../containers/contract/ContractDetails";
import AddressDetail from "./AddressDetail";
import s from "./Contract.module.scss";

interface Props {
  contractInfo: ContractInfo;
  address: string;
}

const Contract = ({ contractInfo, address }: Props) => (
  <section>
    <h1 className={s.title}>Contract</h1>
    <Card bordered className={s.info}>
      <ContractDetails contractInfo={contractInfo} />
    </Card>
    <AddressDetail address={address} />
  </section>
);

export default Contract;
