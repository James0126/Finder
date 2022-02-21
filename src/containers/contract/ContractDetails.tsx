import { ContractInfo } from "@terra-money/terra.js";
import Dropdown from "../../components/Dropdown";
import FinderLink from "../../components/FinderLink";
import List from "../../components/List";
import Modal from "../../components/Modal";
import Query from "./Query";

const ContractDetails = ({ contractInfo }: { contractInfo: ContractInfo }) => {
  const { init_msg, admin, code_id } = contractInfo;
  const msg = JSON.stringify(init_msg, undefined, 2);

  const dataSource = [
    { title: "code ID", content: code_id },
    {
      title: "admin",
      content: <FinderLink>{admin}</FinderLink>,
      hide: !admin,
    },
    {
      title: "init msg",
      content: (
        <Dropdown>
          <pre>{msg}</pre>
        </Dropdown>
      ),
    },
  ];

  return (
    <article>
      <Modal buttonLabel={"Query"}>
        <Query />
      </Modal>
      <List dataSource={dataSource} />
    </article>
  );
};

export default ContractDetails;
