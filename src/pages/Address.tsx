import { useParams } from "react-router";
import Loading from "../components/Loading";
import { useAccountInfo } from "../queries/auth";
import { useContractInfo } from "../queries/wasm";
import { combineState } from "../queries/query";
import Account from "./Account";
import NotFound from "./NotFound";
import Contract from "./Contract";

const Address = () => {
  const { address = "" } = useParams();
  const { data: contract, ...contractState } = useContractInfo(address);
  const { data: account, ...accountState } = useAccountInfo(address);
  const { isLoading } = combineState(contractState, accountState);

  const render = contract ? (
    <Contract contractInfo={contract} address={address} />
  ) : account ? (
    <Account address={address} />
  ) : (
    <NotFound />
  );

  return isLoading ? <Loading /> : render;
};

export default Address;
