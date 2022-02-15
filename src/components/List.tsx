interface Content {
  title?: string;
  content: any;
  render?: (data: any) => JSX.Element | string;
  hide?: boolean;
}

interface Props {
  itemClassName?: string;
  mainClassName?: string;
  dataSource: Content[];
}

//TODO: Refactor codes
const List = ({ dataSource, itemClassName, mainClassName }: Props) => (
  <article className={mainClassName}>
    {dataSource.map(({ title, content, render, hide }, key) => {
      const data = render ? render(content) : content;
      return !hide ? (
        <div key={key} className={itemClassName}>
          {title && <b>{title}</b>} <span>{data}</span>
        </div>
      ) : null;
    })}
  </article>
);

export default List;
