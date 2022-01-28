interface Content {
  title?: string;
  content: any;
  render?: (data: any) => JSX.Element | string;
  hide?: boolean;
}

//TODO: Refactor codes
const List = ({ dataSource }: { dataSource: Content[] }) => (
  <article>
    {dataSource.map(({ title, content, render, hide }, key) => {
      const data = render && render(content);

      return !hide ? (
        <div key={key}>
          {title && <b>{title}</b>} <span>{data || content}</span>
        </div>
      ) : null;
    })}
  </article>
);

export default List;
