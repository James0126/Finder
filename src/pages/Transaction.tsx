import { useParams } from "react-router";
import Fee from "../containers/transaction/Fee";
import Message from "../containers/transaction/Message";
import Action from "../containers/transaction/Action";
import List from "../components/List";
import { useTxByHash } from "../queries/transaction";
import FinderLink from "../components/FinderLink";

const Transaction = () => {
  const { hash = "" } = useParams();
  const { data } = useTxByHash(hash);

  if (!data) {
    return null;
  }

  const { chainId, code, compactFee, compactMessage, raw_log, logs, height } =
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
      title: "height",
      content: <FinderLink block>{height}</FinderLink>,
    },
    {
      title: "fee",
      content: <Fee coins={amounts} />,
    },
    {
      title: "action",
      content: <Action logs={logs} msgs={compactMessage} />,
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
