interface Column {
  title: string;
  key: string;
  render?: (data: any) => any;
}

interface TableSource<T> {
  columns: Column[];
  dataSource?: T[];
}
