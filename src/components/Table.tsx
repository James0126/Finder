import { useEffect, useState } from "react";
import PaginationButton from "./PaginationButton";

interface Props<T> extends TableSource<T> {
  queryState: QueryState;
  deps?: any[];
  offset?: string;
  pagination?: () => void;
}

function Table<T>(props: Props<T>) {
  const { columns, dataSource, offset, queryState, deps, pagination } = props;
  const [data, setData] = useState<T[]>([]);
  const { isLoading } = queryState;
  const hidePaginationButton = (!isLoading && !offset) || !pagination;

  useEffect(() => {
    setData([]);
  }, [deps]);

  useEffect(() => {
    if (dataSource) {
      if (pagination) {
        setData((stack) => [...stack, ...dataSource]);
      } else {
        setData(dataSource);
      }
    }
  }, [dataSource, pagination]);

  return (
    <>
      <table>
        <thead>
          <tr>
            {columns.map(({ title, key }) => (
              <th key={key}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((data, index) => {
            const classname = data["classname" as keyof T];
            return (
              <tr className={String(classname)} key={index}>
                {columns.map(({ key, render }) => {
                  const source = data[key as keyof T];
                  const renderFn = render && render(source);
                  return <td key={key}>{renderFn || source}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {!hidePaginationButton && (
        <PaginationButton
          action={pagination}
          offset={offset}
          loading={isLoading}
        />
      )}
    </>
  );
}

export default Table;
