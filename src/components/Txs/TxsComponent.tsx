import { useEffect, useState } from "react";
import PaginationButton from "../PaginationButton";
import SearchInput from "../SearchInput";
import Table from "../Table";
import s from "./Txs.module.scss";

type Row = {
  raw_log: string;
};

interface Props<T> {
  dataSource?: TxInfo[];
  offset?: string;
  state: QueryState;
  pagination: () => void;
  getTxRow: (tx: TxInfo) => T;
  columns: Column[];
}

function TxsComponent<T extends Row>(props: Props<T>) {
  const { dataSource, offset, state, pagination, getTxRow, columns } = props;
  const [data, setData] = useState<T[]>([]);
  const [input, setInput] = useState<string>();
  const { isLoading, isSuccess } = state;

  useEffect(() => {
    if (input) {
      const txs = data.map((row) => {
        const { raw_log } = row;
        const classname = raw_log.includes(input) ? undefined : s.hide;
        return { ...row, classname };
      });

      setData(txs);
    }
    /* eslint-disable-next-line */
  }, [input]);

  useEffect(() => {
    if (dataSource && isSuccess) {
      const txs = dataSource.map(getTxRow);
      setData((stack) => [...stack, ...txs]);
    }
  }, [dataSource, isSuccess, getTxRow]);

  return isSuccess && !data.length ? (
    <p>No more transaction.</p>
  ) : (
    <>
      <SearchInput onSearch={(value) => setInput(value)} />
      <Table columns={columns} dataSource={data} />
      <PaginationButton
        action={pagination}
        offset={offset}
        loading={isLoading}
      />
    </>
  );
}

export default TxsComponent;
