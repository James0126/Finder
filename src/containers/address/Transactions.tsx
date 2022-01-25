import { useCallback, useEffect, useState } from "react";
import { Coin } from "@terra-money/terra.js";
import { getTxAmounts } from "@terra-money/log-finder-ruleset";
import { readAmount, readDenom } from "@terra.kitchen/utils";
import Amount from "../../components/Amount";
import FinderLink from "../../components/FinderLink";
import Table from "../../components/Table";
import PaginationButton from "../../components/PaginationButton";
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
  const [value, setValue] = useState<string>("");
  const { data, ...status } = useTxsByAddress(address, pageOffset);
  const logMatcher = useAmountLogMatcher();
  const { isLoading } = combineState(status);
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

  const getTxRow = useCallback(
    (txInfos: TxInfo[]) =>
      txInfos.map((tx) => {
        const { compactFee, compactMessage, logs, height, txhash, raw_log } =
          tx;
        const { amounts } = compactFee;
        const { type } = compactMessage[0];
        const matchedLogs = getTxAmounts(
          logs,
          compactMessage,
          logMatcher,
          address
        );
        const [amountIn, amountOut] = totalAmounts(address, matchedLogs);
        const classname = raw_log.includes(value) ? undefined : s.hide;
        const data = {
          ...tx,
          type,
          fee: <Fee coins={amounts} />,
          amountIn: renderCoins(amountIn),
          amountOut: renderCoins(amountOut),
          height: <FinderLink block children={height} />,
          hash: <FinderLink tx short children={txhash} />,
        };
        return { data, classname };
      }),
    [address, logMatcher, value]
  );

  useEffect(() => {
    if (data) {
      const { txInfos } = data.tx.byAddress;
      const dataSource = getTxRow(txInfos);
      setTxs((txs) => [...txs, ...dataSource]);
    }
  }, [data, getTxRow]);

  const onSearch = (input: string) => {
    const searchTx = txs.map((tx) => {
      const { raw_log } = tx.data;
      raw_log.includes(input)
        ? (tx.classname = undefined)
        : (tx.classname = s.hide);
      return tx;
    });

    setValue(input);
    setTxs(searchTx);
  };

  return (
    <section>
      <h2>Transactions</h2>
      <SearchInput onSearch={onSearch} />
      {txs.length ? (
        <PaginationButton
          action={() => setOffset(offset)}
          offset={offset}
          loading={isLoading}
        >
          <Table columns={columns} dataSource={txs} />
        </PaginationButton>
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
