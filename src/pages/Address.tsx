import { useParams } from "react-router";
import Loading from "../components/Loading";
import { useAccountInfo, useContractInfo } from "../queries/address";
import Account from "./Account";
import NotFound from "./NotFound";
import SmartContract from "./SmartContract";

const Address = () => {
  const { address = "" } = useParams();
  const contract = useContractInfo(address);
  const account = useAccountInfo(address);

  if (contract.status === "loading" || account.status === "loading") {
    return <Loading />;
  }

  return contract.data ? (
    <SmartContract contractInfo={contract.data} address={address} />
  ) : account.data ? (
    <Account address={address} />
  ) : (
    <NotFound />
  );
};

export default Address;
