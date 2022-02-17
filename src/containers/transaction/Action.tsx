import { TxDescription } from "@terra-money/react-base-components";
import { getTxCanonicalMsgs } from "@terra-money/log-finder-ruleset";
import { useActionLogMatcher } from "../../store/LogfinderRuleSet";
import { useNetworkName } from "../../contexts/ChainsContext";
import { useLCDClient } from "../../queries/lcdClient";

interface Props {
  logs: TxLog[];
  msgs: Message[];
  showNum?: number;
}

const Action = ({ logs, msgs, showNum }: Props) => {
  const chain = useNetworkName();
  const lcd = useLCDClient();
  const logMatcher = useActionLogMatcher();
  const canonicalMsgs = getTxCanonicalMsgs(logs, msgs, logMatcher, true);
  const txAction = canonicalMsgs.slice(0, showNum);

  return (
    <>
      {txAction.map((msg) =>
        msg.map((data) =>
          data.transformed?.canonicalMsg.map((sentence, key) => (
            <div key={key}>
              <TxDescription
                network={{ ...lcd.config, name: chain }}
                config={{ printCoins: 3 }}
              >
                {sentence}
              </TxDescription>
            </div>
          ))
        )
      )}
    </>
  );
};

export default Action;
