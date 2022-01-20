import { Coin } from "@terra-money/terra.js";
import { getTxAmounts } from "@terra-money/log-finder-ruleset";
import { readAmount, readDenom } from "@terra.kitchen/utils";
import Amount from "../../components/Amount";
import FinderLink from "../../components/FinderLink";
import Table from "../../components/Table";
import { useTxsByAddress } from "../../queries/transaction";
import { totalAmounts } from "../../scripts/utility";
import { useAmountLogMatcher } from "../../store/LogfinderRuleSet";
import Action from "../transaction/Action";
import Fee from "../transaction/Fee";

const Transactions = ({ address }: { address: string }) => {
  const { data } = useTxsByAddress(address);
  const logMatcher = useAmountLogMatcher();

  if (!data) {
    return null;
  }

  const { txInfos } = data.tx.byAddress;
  const columns = [
    {
      title: "Hash",
      key: "txhash",
      render: (hash: string) => <FinderLink tx short children={hash} />,
    },
    {
      title: "Type",
      key: "type",
      render: (type: string) => type.slice(type.indexOf("/") + 1),
    },
    {
      title: "ChainID",
      key: "chainId",
    },
    {
      title: "Height",
      key: "height",
      render: (height: number) => <FinderLink block children={height} />,
    },
    {
      title: "Action",
      key: "action",
    },
    {
      title: "Amount In",
      key: "amountIn",
      render: renderCoins,
    },
    {
      title: "Amount Out",
      key: "amountOut",
      render: renderCoins,
    },
    {
      title: "Fee",
      key: "fee",
      render: (amounts: CoinData[]) => <Fee coins={amounts} />,
    },
  ];

  const dataSource = txInfos.map((data) => {
    const { chainId, compactFee, compactMessage, txhash, height, logs } = data;
    const { amounts: fee } = compactFee;
    const { type } = compactMessage[0];
    const action = <Action logs={logs} msgs={compactMessage} />;
    const matchedLogs = getTxAmounts(logs, compactMessage, logMatcher, address);
    const [amountIn, amountOut] = totalAmounts(address, matchedLogs);

    return { chainId, txhash, type, height, action, amountIn, amountOut, fee };
  });

  return (
    <section>
      <h2>Transactions</h2>
      {txInfos.length ? (
        <Table columns={columns} dataSource={dataSource} />
      ) : (
        "No more transaction"
      )}
    </section>
  );
};

export default Transactions;

//TODO: Refactor codes
const renderCoins = (coins: Coin[]) => (
  <>
    {coins.map((coin, key) => {
      const amount = readAmount(coin.amount.toString(), { comma: true });
      const denom = coin.denom.length > 20 ? "Tokens" : readDenom(coin.denom);
      return <Amount key={key} amount={amount} denom={denom} />;
    })}
  </>
);
