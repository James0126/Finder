import { useEffect, useState } from "react";
import useWorker from "../../hooks/useWorker";
import PaginationButton from "../../components/PaginationButton";
import SearchInput from "../../components/SearchInput";
import Card from "../../components/Card";
import Table, { Column } from "../../components/Table";
import txSearch from "../../worker/txSearch";
import s from "./TxHistory.module.scss";

interface Props<T> {
  dataSource?: TxInfo[];
  offset?: string;
  state: QueryState;
  pagination: () => void;
  getTxRow: (tx: TxInfo, classname?: string) => T;
  columns: Column[];
}

function TxHistory<T>(props: Props<T>) {
  const { dataSource, offset, state, pagination, getTxRow, columns } = props;
  const [row, setRow] = useState<T[]>([]);
  const [input, setInput] = useState<string>();
  const [isSearch, setSearch] = useState<boolean>(false);
  const worker = useWorker(txSearch);
  const { isSuccess, isLoading } = state;

  useEffect(() => {
    if (dataSource && isSuccess) {
      const rows = dataSource.map((tx) => getTxRow(tx));
      input ? onSearch(input, rows) : setRow((stack) => [...stack, ...rows]);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [dataSource, isSuccess]);

  const onSearch = (input: string, txs: T[], replace?: boolean) => {
    setSearch(true);
    setInput(input);
    worker.postMessage({ txs, input, style: s.hide });
    worker.onmessage = (message) => {
      const { data } = message;
      replace ? setRow(data) : setRow((stack) => [...stack, ...data]);
      setSearch(false);
    };
  };

  return isSuccess && !row.length ? (
    <p>No more transaction.</p>
  ) : (
    <>
      <SearchInput
        onSearch={(input) => onSearch(input, row, true)}
        placeholder="Search"
      />
      <Card bordered className={s.card}>
        <section className={s.tableWrapper}>
          <Table columns={columns} dataSource={row} tableClassname={s.table} />
          <PaginationButton
            action={pagination}
            offset={offset}
            isLoading={isLoading}
          />
          {isSearch && "Searching..."}
        </section>
      </Card>
    </>
  );
}

export default TxHistory;
