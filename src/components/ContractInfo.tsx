import { useParams } from "react-router";
import { useContractInfo } from "../queries/address";
import Dropdown from "./Dropdown";
import ModalWithButton from "./ModalWithButton";
import Query from "./Query";

const ContractInfo = () => {
  const { address = "" } = useParams();
  const { data } = useContractInfo(address);

  if (!data) {
    return null;
  }

  const { init_msg, admin, code_id } = data;
  const msg = JSON.stringify(init_msg, undefined, 2);

  return (
    <article>
      <ModalWithButton buttonLabel={"Query"} modalContent={<Query />} />
      <div>code ID : {code_id}</div>
      {admin && <div>admin : {admin}</div>}
      <div>
        init msg :
        <Dropdown>
          <pre>{msg}</pre>
        </Dropdown>
      </div>
    </article>
  );
};

export default ContractInfo;
