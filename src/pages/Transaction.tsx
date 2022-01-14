import { useParams } from "react-router";
import Fee from "../containers/transaction/Fee";
import Message from "../containers/transaction/Message";
import List from "../components/List";
import { useTxByHash } from "../queries/transaction";
import NotFound from "./NotFound";

const Transaction = () => {
  const { hash = "" } = useParams();
  const data = useTxByHash(hash);

  if (!data) {
    return <NotFound />;
  }

  const { chainId, code, compactFee, compactMessage, raw_log, logs } =
    data.tx.byHash;

  const { amounts } = compactFee;
  const isSuccess = !code;

  const contents = [
    {
      title: "chain ID",
      content: chainId,
    },
    {
      title: "status",
      content: isSuccess ? "Success" : "Failed",
    },
    {
      title: "Fee",
      content: <Fee coins={amounts} />,
    },
  ];

  return (
    <section>
      <h1>Trasaction Detail</h1>
      {!isSuccess ?? raw_log}
      <List data={contents} />
      <Message msgs={compactMessage} logs={logs} isSuccess={isSuccess} />
    </section>
  );
};

export default Transaction;
