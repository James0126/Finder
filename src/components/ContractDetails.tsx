import { ContractInfo } from "@terra-money/terra.js";
import Dropdown from "./Dropdown";
import FinderLink from "./FinderLink";
import ModalWithButton from "./ModalWithButton";
import Query from "./Query";

const ContractDetails = ({ contractInfo }: { contractInfo: ContractInfo }) => {
  const { init_msg, admin, code_id } = contractInfo;
  const msg = JSON.stringify(init_msg, undefined, 2);

  return (
    <article>
      <ModalWithButton buttonLabel={"Query"} modalContent={<Query />} />
      {/* TODO: Table */}
      <div>code ID : {code_id}</div>
      {admin && (
        <div>
          admin : <FinderLink q="address">{admin}</FinderLink>
        </div>
      )}
      <div>
        init msg :
        <Dropdown>
          <pre>{msg}</pre>
        </Dropdown>
      </div>
    </article>
  );
};

export default ContractDetails;
