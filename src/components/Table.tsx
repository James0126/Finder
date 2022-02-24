import { ReactNode } from "react";
import classNames from "classnames/bind";
import s from "./Table.module.scss";

export interface Column {
  title: ReactNode;
  key: string;
  render?: (data: any) => any;
  alignClassname?: string;
}

interface Props<T> {
  columns: Column[];
  dataSource?: T[];
  small?: boolean;
}

const cx = classNames.bind(s);

function Table<T>(props: Props<T>) {
  const { columns, dataSource, small } = props;
  return (
    <table className={cx(s.table, { small })}>
      <thead>
        <tr>
          {columns.map(({ title, key, alignClassname }) => (
            <th key={key} className={alignClassname}>
              {title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataSource?.map((data, index) => {
          const classname = data["classname" as keyof T];
          return (
            <tr className={String(classname)} key={index}>
              {columns.map(({ key, render, alignClassname }) => {
                const source = data[key as keyof T];
                const renderFn = render && render(source);
                return (
                  <td className={alignClassname} key={key}>
                    {renderFn || source}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
