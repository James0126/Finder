import { useCallback, useEffect, useState } from "react";
import Table from "../../components/Table";
import FinderLink from "../../components/FinderLink";
import PaginationButton from "../../components/PaginationButton";
import { useTxsByHeight } from "../../queries/transaction";
import Fee from "../transaction/Fee";
import s from "./Transactions.module.scss";
import { combineState } from "../../queries/query";
import SearchInput from "../../components/SearchInput";

const Transactions = ({ height }: { height: string }) => {
  const [pageOffset, setOffset] = useState<string>();
  const [txs, setTxs] = useState<Data<any>[]>([]);
  const [value, setValue] = useState<string>("");
  const { data, ...state } = useTxsByHeight(height, pageOffset);
  const { isLoading } = combineState(state);
  const offset = data?.tx.byHeight.offset;

  const getTxRow = useCallback(
    (txInfos: TxInfo[]) =>
      txInfos.map((tx) => {
        const { chainId, compactFee, compactMessage, txhash, raw_log } = tx;
        const { amounts } = compactFee;
        const { type } = compactMessage[0];
        const fee = <Fee coins={amounts} />;
        const hash = <FinderLink tx short children={txhash} />;
        const data = { chainId, hash, type, fee, raw_log };
        const classname = raw_log.includes(value) ? undefined : s.hide;
        return { data, classname };
      }),
    [value]
  );

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
      title: "Chain id",
      key: "chainId",
    },
    {
      title: "Fee",
      key: "fee",
    },
  ];

  useEffect(() => {
    if (data) {
      const { txInfos } = data.tx.byHeight;
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
