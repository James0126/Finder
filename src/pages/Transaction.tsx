import { useParams } from "react-router";
import Fee from "../containers/transaction/Fee";
import Message from "../containers/transaction/Message";
import Action from "../containers/transaction/Action";
import FinderLink from "../components/FinderLink";
import State from "../components/State";
import List from "../components/List";
import { useTxByHash } from "../queries/transaction";
import { combineState } from "../queries/query";

const Transaction = () => {
  const { hash = "" } = useParams();
  const { data, ...state } = useTxByHash(hash);

  const status = combineState(state);

  const render = () => {
    if (!data) {
      return null;
    }

    const { chainId, code, parsed_fee, parsed_message, raw_log, logs, height } =
      data.tx.by_hash;

    const { amounts } = parsed_fee;
    const isSuccess = !code;

    const dataSource = [
      {
        title: "chain ID",
        content: chainId,
      },
      {
        title: "status",
        content: isSuccess ? "Success" : "Failed",
      },
      {
        content: raw_log,
        hide: isSuccess,
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
        content: <Action logs={logs} msgs={parsed_message} />,
      },
    ];
    return (
      <>
        <h1>Trasaction Detail</h1>
        <List dataSource={dataSource} />
        <Message msgs={parsed_message} logs={logs} isSuccess={isSuccess} />
      </>
    );
  };

  return <State state={status}>{render()}</State>;
};

export default Transaction;
