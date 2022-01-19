import { useParams } from "react-router";
import { getTxCanonicalMsgs, LogFinderActionResult } from "testing-wonjm-rules";
import Fee from "../containers/transaction/Fee";
import Message from "../containers/transaction/Message";
import Action from "../containers/transaction/Action";
import List from "../components/List";
import { useTxByHash } from "../queries/transaction";
import { useActionLogMatcher } from "../store/LogfinderRuleSet";
import NotFound from "./NotFound";

const Transaction = () => {
  const { hash = "" } = useParams();
  const data = useTxByHash(hash);
  const logMatcher = useActionLogMatcher();

  if (!data) {
    return <NotFound />;
  }

  const { chainId, code, compactFee, compactMessage, raw_log, logs } =
    data.tx.byHash;

  const { amounts } = compactFee;
  const isSuccess = !code;
  const matchedMsg = getTxCanonicalMsgs(logs, compactMessage, logMatcher);

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
      content: matchedMsg,
      render: (matchedMsg: LogFinderActionResult[][]) => (
        <>
          {matchedMsg.map((msg) =>
            msg.map((data) =>
              data.transformed?.canonicalMsg.map((sentence, key) => (
                <Action key={key}>{sentence}</Action>
              ))
            )
          )}
        </>
      ),
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
