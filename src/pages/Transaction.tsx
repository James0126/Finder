import { useParams } from "react-router";
import Fee from "../containers/transaction/Fee";
import Message from "../containers/transaction/Message";
import Action from "../containers/transaction/Action";
import List from "../components/List";
import { useTxByHash } from "../queries/transaction";
import { combineState } from "../queries/query";
import PageRenderer from "./PageRenderer";

const Transaction = () => {
  const { hash = "" } = useParams();
  const { data, ...status } = useTxByHash(hash);
  const state = combineState(status);

  const render = () => {
    if (!data) {
      return null;
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
      {
        title: "Action",
        content: <Action logs={logs} msgs={compactMessage} />,
      },
    ];

    return (
      <>
        {!isSuccess ?? raw_log}
        <List data={contents} />
        <Message msgs={compactMessage} logs={logs} isSuccess={isSuccess} />
      </>
    );
  };

  return (
    <PageRenderer state={state}>
      <section>
        <h1>Trasaction Detail</h1>
        {render()}
      </section>
    </PageRenderer>
  );
};

export default Transaction;
