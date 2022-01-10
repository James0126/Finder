import { useParams } from "react-router";
import Loading from "../components/Loading";
import { useAccountInfo, useContractInfo } from "../queries/address";
import Account from "./Account";
import NotFound from "./NotFound";
import Contract from "./Contract";

const Address = () => {
  const { address = "" } = useParams();
  const contract = useContractInfo(address);
  const account = useAccountInfo(address);

  if (contract.status === "loading" || account.status === "loading") {
    return <Loading />;
  }

  return contract.data ? (
    <Contract contractInfo={contract.data} address={address} />
  ) : account.data ? (
    <Account address={address} />
  ) : (
    <NotFound />
  );
};

export default Address;
