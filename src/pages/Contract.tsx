import { ContractInfo } from "@terra-money/terra.js";
import Card from "../components/Card";
import Page from "../components/Page";
import ContractDetails from "../containers/contract/ContractDetails";
import AddressDetail from "./AddressDetail";
import s from "./Contract.module.scss";

interface Props {
  contractInfo: ContractInfo;
  address: string;
}

const Contract = ({ contractInfo, address }: Props) => (
  <Page title="Contract">
    <Card bordered className={s.info}>
      <ContractDetails contractInfo={contractInfo} />
    </Card>
    <AddressDetail address={address} />
  </Page>
);

export default Contract;
