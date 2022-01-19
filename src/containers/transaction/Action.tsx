import { TxDescription } from "@terra-money/react-base-components";
import { useNetworkName } from "../../contexts/ChainsContext";
import { useLCDClient } from "../../queries/lcdClient";

const Action = ({ children }: { children: string }) => {
  const chain = useNetworkName();
  const lcd = useLCDClient();

  /* TODO: Remove div tag */
  return (
    <div>
      <TxDescription
        network={{ ...lcd.config, name: chain }}
        config={{ printCoins: 3 }}
      >
        {children}
      </TxDescription>
    </div>
  );
};

export default Action;
