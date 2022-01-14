interface Column {
  title: string;
  key: string;
  render?: (data: any) => any;
}

interface Props<T> {
  columns: Column[];
  dataSource: T[];
}

const Table = <T extends object>({ columns, dataSource }: Props<T>) => (
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
          {columns.map(({ key, render }) => {
            const source = data[key as keyof T];
            const renderFn = render && render(source);
            return <td key={key}>{renderFn || source}</td>;
          })}
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;
