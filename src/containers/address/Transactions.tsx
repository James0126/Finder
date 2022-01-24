import { useState } from "react";
import { Coin } from "@terra-money/terra.js";
import { getTxAmounts } from "@terra-money/log-finder-ruleset";
import { readAmount, readDenom } from "@terra.kitchen/utils";
import Amount from "../../components/Amount";
import FinderLink from "../../components/FinderLink";
import Table from "../../components/Table";
import Pagenation from "../../components/Pagination";
import SearchInput from "../../components/SearchInput";
import { useTxsByAddress } from "../../queries/transaction";
import { combineState } from "../../queries/query";
import { totalAmounts } from "../../scripts/utility";
import { useAmountLogMatcher } from "../../store/LogfinderRuleSet";
import Fee from "../transaction/Fee";
import s from "./Transactions.module.scss";

const Transactions = ({ address }: { address: string }) => {
  const [pageOffset, setOffset] = useState<string>();
  const [txs, setTxs] = useState<Data<any>[]>([]);
  const { data, ...status } = useTxsByAddress(address, pageOffset);
  const logMatcher = useAmountLogMatcher();
  const state = combineState(status);

  const txInfos = data?.tx.byAddress.txInfos;
  const offset = data?.tx.byAddress.offset;

  const columns = [
    {
      title: "Hash",
      key: "hash",
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
    },
    {
      title: "Amount In",
      key: "amountIn",
    },
    {
      title: "Amount Out",
      key: "amountOut",
    },
    {
      title: "Fee",
      key: "fee",
    },
  ];

  const dataSource = txInfos?.map((tx) => {
    const { compactFee, compactMessage, logs, height, txhash } = tx;
    const { amounts } = compactFee;
    const { type } = compactMessage[0];
    const matchedLogs = getTxAmounts(logs, compactMessage, logMatcher, address);
    const [amountIn, amountOut] = totalAmounts(address, matchedLogs);
    const inCoins = renderCoins(amountIn);
    const OutCoins = renderCoins(amountOut);
    const fee = <Fee coins={amounts} />;
    const block = <FinderLink block children={height} />;
    const hash = <FinderLink tx short children={txhash} />;
    const data = {
      ...tx,
      fee,
      type,
      hash,
      amountIn: inCoins,
      amountOut: OutCoins,
      height: block,
    };
    return { data };
  });

  if (!txs.length) {
    dataSource && setTxs(dataSource);
  }

  const pagenation = () => {
    setOffset(offset);
    if (dataSource) {
      setTxs((txs) => [...txs, ...dataSource]);
    }
  };

  const onSearch = (input: string) => {
    const txFilter = txs.map((tx) => {
      const { raw_log } = tx.data;
      raw_log.includes(input)
        ? (tx.classname = undefined)
        : (tx.classname = s.hide);
      return tx;
    });

    setTxs(txFilter);
  };

  return (
    <section>
      <h2>Transactions</h2>
      <SearchInput onSearch={onSearch} />
      {txs?.length ? (
        <Pagenation
          action={pagenation}
          offset={offset}
          loading={state.isLoading}
        >
          <Table columns={columns} dataSource={txs} />
        </Pagenation>
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
    {coins?.map((coin, key) => {
      const amount = readAmount(coin.amount.toString(), { comma: true });
      const denom = coin.denom.length > 20 ? "Tokens" : readDenom(coin.denom);
      return <Amount key={key} amount={amount} denom={denom} />;
    })}
  </>
);
