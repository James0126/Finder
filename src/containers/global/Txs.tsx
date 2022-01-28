import { useEffect, useState } from "react";
import PaginationButton from "../../components/PaginationButton";
import SearchInput from "../../components/SearchInput";
import Table from "../../components/Table";
import s from "./Txs.module.scss";

interface Props {
  txInfos?: TxInfo[];
  loading?: boolean;
  offset?: string;
  height?: string;
  getTxRow: (txInfos: TxInfo[], value?: string) => any[];
  pagination: () => void;
  columns: Column[];
}
//TODO: Refactor

const Txs = (props: Props) => {
  const { txInfos, columns, loading, offset, getTxRow, pagination, height } =
    props;
  const [txData, setTxData] = useState<Data<TxInfo>[]>([]);
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    setTxData([]);
  }, [height, value]);

  useEffect(() => {
    if (txInfos) {
      const dataSource = getTxRow(txInfos, value);
      setTxData((data) => [...data, ...dataSource]);
    }
  }, [txInfos, getTxRow, value]);

  //transaction search
  const onSearch = (input: string) => {
    const searchTx = txData.map((tx) => {
      const { raw_log } = tx.data;
      raw_log.includes(input)
        ? (tx.classname = undefined)
        : (tx.classname = s.hide);
      return tx;
    });

    setValue(input);
    setTxData(searchTx);
  };

  return (
    <>
      {txData.length ? (
        <>
          <SearchInput onSearch={onSearch} />
          <Table columns={columns} dataSource={txData} />
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
