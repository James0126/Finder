import { useParams } from "react-router";
import Fee from "../containers/transaction/Fee";
import Message from "../containers/transaction/Message";
import FinderLink from "../components/FinderLink";
import { ListColumn } from "../components/List";
import State from "../components/State";
import Page from "../components/Page";
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

    const { chain_id, code, parsed_fee, parsed_message, logs, height } =
      data.tx.by_hash;

    const { amounts } = parsed_fee;
    const isSuccess = !code;

    const dataSource = [
      {
        title: "chain ID",
        content: chain_id,
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
    ];
    return (
      <>
        {/* TODO: Failed Message */}
        <ListColumn dataSource={dataSource} />
        <Message msgs={parsed_message} logs={logs} isSuccess={isSuccess} />
      </>
    );
  };

  return (
    <Page title="Trasaction Detail">
      <State state={status}>{render()}</State>
    </Page>
  );
};

export default Transaction;
