import { useEffect, useState } from "react";
import PaginationButton from "../../components/PaginationButton";
import SearchInput from "../../components/SearchInput";
import Table from "../../components/Table";
import s from "./Txs.module.scss";

interface Props {
  txInfos?: TxInfo[];
  loading?: boolean;
  offset?: string;
  getTxRow: (txInfos: TxInfo[], value?: string) => any;
  pagination: () => void;
  columns: Column[];
}

const Txs = (props: Props) => {
  const { txInfos, columns, loading, offset, getTxRow, pagination } = props;
  const [txs, setTxs] = useState<Data<any>[]>([]);
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    if (txInfos) {
      const dataSource = getTxRow(txInfos, value);
      setTxs((txs) => [...txs, ...dataSource]);
    }
  }, [txInfos, getTxRow, value]);

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
    <>
      {txs.length ? (
        <>
          <SearchInput onSearch={onSearch} />
          <Table columns={columns} dataSource={txs} />
          <PaginationButton
            action={pagination}
            offset={offset}
            loading={loading}
          />
        </>
      ) : (
        "No more transaction"
      )}
    </>
  );
};

export default Txs;
