interface Column {
  title: string;
  key: string;
}

interface Props<T> {
  columns: Column[];
  dataSource: T[];
}

function Table<T>(props: Props<T>) {
  const { columns, dataSource } = props;
  return (
    <table>
      <thead>
        <tr>
          {columns.map(({ title, key }) => (
            <th key={key}>{title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataSource.map((data, index) => (
          <tr key={index}>
            {columns.map(({ key }) => {
              const render = data[key as keyof T];
              return <td key={key}>{render}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
