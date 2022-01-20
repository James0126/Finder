import { TxDescription } from "@terra-money/react-base-components";
import { getTxCanonicalMsgs } from "@terra-money/log-finder-ruleset";
import { useNetworkName } from "../../contexts/ChainsContext";
import { useLCDClient } from "../../queries/lcdClient";
import { useActionLogMatcher } from "../../store/LogfinderRuleSet";

const Action = ({ logs, msgs }: { logs: TxLog[]; msgs: Message[] }) => {
  const chain = useNetworkName();
  const lcd = useLCDClient();
  const logMatcher = useActionLogMatcher();
  const txAction = getTxCanonicalMsgs(logs, msgs, logMatcher, true);

  /* TODO: Remove div tag */
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
