import { useParams } from "react-router";
import Loading from "../components/Loading";
import { useAccountInfo, useContractInfo } from "../queries/contract";
import Account from "./Account";
import NotFound from "./NotFound";
import SmartContract from "./SmartContract";

const Address = () => {
  const { address = "" } = useParams();
  const contract = useContractInfo(address);
  const account = useAccountInfo(address);

  if (contract.status && account.status === "loading") {
    return <Loading />;
  }

  return contract.data ? (
    <SmartContract />
  ) : account.data ? (
    <Account />
  ) : (
    <NotFound />
  );
};

export default Address;
