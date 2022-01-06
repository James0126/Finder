import { useParams } from "react-router";
import { useContractInfo } from "../queries/address";
import Dropdown from "./Dropdown";

const ContractInfo = () => {
  const { address = "" } = useParams();
  const { data } = useContractInfo(address);

  if (!data) {
    return null;
  }

  const { init_msg, admin, code_id } = data;
  const msg = JSON.stringify(init_msg, undefined, 2);

  return (
    <div>
      <span>code ID : {code_id}</span>
      <br />
      <span>admin : {admin}</span>
      <br />
      <span>
        init msg :
        <Dropdown>
          <pre>{msg}</pre>
        </Dropdown>
      </span>
    </div>
  );
};

export default ContractInfo;
