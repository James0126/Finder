import { Coin } from "@terra-money/terra.js";
import { readAmount, readDenom } from "@terra.kitchen/utils";
import { getTxAmounts, LogFinderAmountResult } from "testing-wonjm-rules";
import Amount from "../../components/Amount";
import FinderLink from "../../components/FinderLink";
import Table from "../../components/Table";
import { useTxsByAddress } from "../../queries/transaction";
import { useAmountLogMatcher } from "../../store/LogfinderRuleSet";
import Fee from "../transaction/Fee";

const Transactions = ({ address }: { address: string }) => {
  const data = useTxsByAddress(address);
  const logMatcher = useAmountLogMatcher();

  if (!data) {
    return null;
  }

  const { txInfos } = data.tx.byAddress;

  //TODO: Refactor codes
  const coinRender = (coins: Coin[]) => (
    <>
      {coins.map((coin, key) => {
        const amount = readAmount(coin.amount.toString(), { comma: true });
        const denom = coin.denom.length > 20 ? "Tokens" : readDenom(coin.denom);
        return <Amount key={key} amount={amount} denom={denom} />;
      })}
    </>
  );

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
      title: "Amount In",
      key: "amountIn",
      render: coinRender,
    },
    {
      title: "Amount Out",
      key: "amountOut",
      render: coinRender,
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

    const matchedLogs = getTxAmounts(logs, compactMessage, logMatcher, address);
    const [amountIn, amountOut] = totalAmounts(address, matchedLogs);

    return { chainId, txhash, type, height, amountIn, amountOut, fee };
  });

  return (
    <section>
      <h2>Transactions</h2>
      <Table columns={columns} dataSource={dataSource} />
    </section>
  );
};

export default Transactions;

const totalAmounts = (
  userAddress: string,
  matchedLogs?: LogFinderAmountResult[][]
) => {
  const amountIn: Coin[] = [];
  const amountOut: Coin[] = [];

  matchedLogs?.forEach((log) =>
    log.forEach((data) => {
      const { transformed } = data;
      if (transformed) {
        const { sender, recipient, amount } = transformed;
        const coins = amount.split(",").map((coin) => Coin.fromString(coin));
        if (sender === userAddress) {
          amountOut.push(...coins);
        } else if (recipient === userAddress) {
          amountIn.push(...coins);
        }
      }
    })
  );

  return [amountIn.slice(0, 3), amountOut.slice(0, 3)];
};
