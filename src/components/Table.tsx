interface Column {
  title: string;
  key: string;
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
          {columns.map(({ key }) => {
            const render = data[key as keyof T];
            return <td key={key}>{render}</td>;
          })}
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;
