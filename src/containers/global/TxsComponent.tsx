import { useEffect, useState } from "react";
import PaginationButton from "../../components/PaginationButton";
import Table from "../../components/Table";

interface Props<T> {
  dataSource?: TxInfo[];
  offset?: string;
  state: QueryState;
  pagination: () => void;
  getTxRow: (tx: TxInfo) => T;
  columns: Column[];
}

function TxsComponent<T>(props: Props<T>) {
  const [data, setData] = useState<T[]>([]);
  const { dataSource, offset, state, pagination, getTxRow, columns } = props;
  const { isLoading, isSuccess } = state;

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
