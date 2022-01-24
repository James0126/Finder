interface Column {
  title: string;
  key: string;
  render?: (data: any) => any;
}

interface Data<T> {
  data: T;
  classname?: string;
}

interface TableSource<T> {
  columns: Column[];
  dataSource: Data<T>[];
}
