import { useParams } from "react-router";
import Loading from "../components/Loading";
import { useContractInfo } from "../queries/contract";
import Account from "./Account";
import SmartContract from "./SmartContract";

const Address = () => {
  const { address = "" } = useParams();
  const isContract = useContractInfo(address);

  if (isContract.status === "loading") {
    return <Loading />;
  }

  return isContract.status === "error" ? <SmartContract /> : <Account />;
};

export default Address;
