import { useEffect, useState } from "react";
import { Coin } from "@terra-money/terra.js";
import { getTxAmounts } from "@terra-money/log-finder-ruleset";
import { readAmount, readDenom } from "@terra.kitchen/utils";
import Amount from "../../components/Amount";
import FinderLink from "../../components/FinderLink";
import Table from "../../components/Table";
import { useTxsByAddress } from "../../queries/transaction";
import { totalAmounts } from "../../scripts/utility";
import { useAmountLogMatcher } from "../../store/LogfinderRuleSet";
import Pagenation from "../../components/Pagination";
import Fee from "../transaction/Fee";
import s from "./Transactions.module.scss";

const Transactions = ({ address }: { address: string }) => {
  const [value, setValue] = useState("");
  const [pageOffset, setOffset] = useState<string>();
  const [txs, setTxs] = useState<TxInfo[]>([]);
  const { data } = useTxsByAddress(address, pageOffset);
  const logMatcher = useAmountLogMatcher();

  const txInfos = data?.tx.byAddress.txInfos;
  const offset = data?.tx.byAddress.offset;

  useEffect(() => {
    if (txInfos && !txs.length) {
      setTxs(txInfos);
      setOffset(offset);
    }
  }, [txInfos, txs, offset]);

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

  const dataSource = txs?.map((tx) => {
    const { compactFee, compactMessage, logs, raw_log } = tx;
    const { amounts: fee } = compactFee;
    const { type } = compactMessage[0];
    const matchedLogs = getTxAmounts(logs, compactMessage, logMatcher, address);
    const [amountIn, amountOut] = totalAmounts(address, matchedLogs);
    const classname = raw_log.includes(value) || !value ? undefined : s.hide;
    const data = { ...tx, type, amountIn, amountOut, fee };
    return { data, classname };
  });

  const pageNation = () => {
    setOffset(offset);
    if (txInfos) {
      setTxs([...txs, ...txInfos]);
    }
  };

  return (
    <section>
      <h2>Transactions</h2>
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value.trim())}
      />

      <Pagenation action={pageNation} offset={offset}>
        <Table columns={columns} dataSource={dataSource} />
      </Pagenation>
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
