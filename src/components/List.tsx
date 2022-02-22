import { ReactNode } from "react";

interface Content {
  title?: string;
  content: ReactNode;
  render?: (data: ReactNode) => ReactNode;
  hide?: boolean;
}

interface Props {
  itemClassName?: string;
  mainClassName?: string;
  dataSource: Content[];
}

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
