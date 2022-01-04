import { useParams } from "react-router";
import { useContractInfo } from "../queries/contract";
import Account from "./Account";
import SmartContract from "./SmartContract";

const Address = () => {
  const { address = "" } = useParams();
  const isContract = useContractInfo(address);
  return isContract.status === "success" ? <SmartContract /> : <Account />;
};

export default Address;
