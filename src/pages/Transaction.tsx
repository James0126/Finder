import { useParams } from "react-router";
import Fee from "../containers/transaction/Fee";
import Message from "../containers/transaction/Message";
import { useTxByHash } from "../queries/transaction";

const Transaction = () => {
  const { hash = "" } = useParams();
  const data = useTxByHash(hash);

  if (!data) {
    return null;
  }

  const { chainId, code, compactFee, compactMessage, raw_log, logs } =
    data.tx.byHash;

  const { amounts } = compactFee;
  const isSuccess = !code;

  return (
    <section>
      <h1>Trasaction Detail</h1>
      <span>chain ID : {chainId}</span>
      <br />
      <span>status : {isSuccess ? "Success" : "Failed"}</span>
      {!isSuccess ?? raw_log}
      <Fee coins={amounts} />
      <Message msgs={compactMessage} logs={logs} isSuccess={isSuccess} />
    </section>
  );
};

export default Transaction;
