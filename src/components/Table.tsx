function Table<T>(props: TableSource<T>) {
  const { columns, dataSource } = props;
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
          {dataSource?.map((data, index) => {
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
    </>
  );
}

export default Table;
