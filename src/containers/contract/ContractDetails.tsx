import { ContractInfo } from "@terra-money/terra.js";
import Dropdown from "../../components/Dropdown";
import FinderLink from "../../components/FinderLink";
import ModalWithButton from "../../components/ModalWithButton";
import { useNetworkName } from "../../contexts/ChainsContext";
import Query from "./Query";

const ContractDetails = ({ contractInfo }: { contractInfo: ContractInfo }) => {
  const network = useNetworkName();
  const { init_msg, admin, code_id } = contractInfo;
  const msg = JSON.stringify(init_msg, undefined, 2);

  return (
    <article>
      <ModalWithButton buttonLabel={"Query"} modalContent={<Query />} />
      {/* TODO: Table */}
      <div>code ID : {code_id}</div>
      {admin && (
        <div>
          admin : <FinderLink network={network}>{admin}</FinderLink>
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
