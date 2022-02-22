import { getTxCanonicalMsgs } from "@terra-money/log-finder-ruleset";
import { memo } from "react";
import { useActionLogMatcher } from "../../store/LogfinderRuleSet";
import TxMessage from "./TxMessage";

interface Props {
  logs: TxLog[];
  msgs: Message[];
  limit?: number;
}

const Action = ({ logs, msgs, limit }: Props) => {
  const logMatcher = useActionLogMatcher();
  const canonicalMsgs = getTxCanonicalMsgs(logs, msgs, logMatcher, true);
  const txAction = canonicalMsgs.slice(0, limit);

  return (
    <>
      {txAction.map((msg) => {
        const limitMsgs = msg.slice(0, limit);
        return limitMsgs.map((data) =>
          data.transformed?.canonicalMsg.map((sentence, key) => (
            <TxMessage key={key}>{sentence}</TxMessage>
          ))
        );
      })}
    </>
  );
};

export default memo(Action);
