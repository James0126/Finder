import classnames from "classnames";

interface Props<T> extends TableSource<T> {
  tableClassname?: string;
}

function Table<T>(props: Props<T>) {
  const { columns, dataSource, tableClassname } = props;
  return (
    <>
      <table className={tableClassname}>
        <thead>
          <tr>
            {columns.map(({ title, key }) => (
              <th key={key}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataSource?.map((data, index) => {
            const classname = data["classname" as keyof T];
            return (
              <tr className={classnames(String(classname))} key={index}>
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
    </>
  );
}

export default Table;
