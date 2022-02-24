import { ReactNode } from "react";
import Flex from "./Flex";
import s from "./List.module.scss";

interface Content {
  title?: ReactNode;
  content: ReactNode;
  render?: (data: ReactNode) => ReactNode;
  hide?: boolean;
}

interface ListData {
  itemClassName?: string;
  mainClassName?: string;
  dataSource: Content[];
}

const List = (props: ListData) => {
  const { itemClassName, mainClassName, dataSource } = props;
  return (
    <article className={mainClassName}>
      {dataSource.map(({ title, content, render, hide }, key) => {
        const data = render ? render(content) : content;
        return !hide ? (
          <div key={key} className={itemClassName}>
            {title && <span>{title}</span>} <span>{data}</span>
          </div>
        ) : null;
      })}
    </article>
  );
};

export default List;

interface ColumnData {
  dataSource: Content[];
  mainClassname?: string;
}

export const ListColumn = (props: ColumnData) => {
  const { dataSource, mainClassname } = props;
  return (
    <div className={mainClassname}>
      {dataSource.map(({ title, content, hide }, key) => (
        <Flex start key={key} className={s.row}>
          {!hide && (
            <>
              <div className={s.title}>{title}</div>
              <div className={s.content}>{content}</div>
            </>
          )}
        </Flex>
      ))}
    </div>
  );
};
