import { ReactNode } from "react";
import { Auto } from "./layout/Grid";

interface Content {
  title?: ReactNode;
  content: ReactNode;
  render?: (data: ReactNode) => ReactNode;
  hide?: boolean;
}

interface Props {
  itemClassName?: string;
  mainClassName?: string;
  dataSource: Content[];
}

const List = (props: Props) => {
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

interface ColumnProps {
  dataSource: Content[];
  mainClassname?: string;
  titleClassname?: string;
  itemClassname?: string;
  rowClassname?: string;
}

export const ListColumn = (props: ColumnProps) => {
  const {
    dataSource,
    mainClassname,
    titleClassname,
    itemClassname,
    rowClassname,
  } = props;
  return (
    <div className={mainClassname}>
      {dataSource.map(
        ({ title, content, hide }, key) =>
          !hide && (
            <Auto
              firstSpan={1}
              lastSpan={5}
              columns={[
                <span className={titleClassname}>{title}</span>,
                <span className={itemClassname}>{content}</span>,
              ]}
              className={rowClassname}
              key={key}
            />
          )
      )}
    </div>
  );
};
