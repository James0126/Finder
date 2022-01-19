interface Content {
  title?: string;
  content: any;
  render?: (data: any) => JSX.Element | string;
}

//TODO: Refactor codes
const List = ({ data }: { data: Content[] }) => (
  <article>
    {data.map(({ title, content, render }, key) => {
      const data = render && render(content);
      return (
        <div key={key}>
          {title && <b>{title}</b>} <span>{data || content}</span>
        </div>
      );
    })}
  </article>
);

export default List;
