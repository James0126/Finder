import { ContractInfo } from "@terra-money/terra.js";
import Card from "../components/layout/Card";
import Page from "../components/Page";
import CopyKeyword from "../components/CopyKeyword";
import ContractDetails from "../containers/contract/ContractDetails";
import AddressDetail from "./AddressDetail";
import s from "./Contract.module.scss";

interface Props {
  contractInfo: ContractInfo;
  address: string;
}

const Contract = ({ contractInfo, address }: Props) => (
  <Page title="Contract">
    <CopyKeyword className={s.copy}>{address}</CopyKeyword>
    <Card className={s.info}>
      <ContractDetails contractInfo={contractInfo} />
    </Card>
    <AddressDetail address={address} />
  </Page>
);

export default Contract;
