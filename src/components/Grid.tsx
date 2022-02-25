import { FC, ReactNode } from "react";
import classNames from "classnames/bind";
import styles from "./Grid.module.scss";

const cx = classNames.bind(styles);

interface RowProps {
  align?: "start";
  className?: string;
}

export const Row: FC<RowProps> = ({ align, children, className }) => {
  return <div className={cx(styles.row, align, className)}>{children}</div>;
};

interface ColProps {
  span?: number;
}

export const Col: FC<ColProps> = ({ span = 1, children }) => {
  return (
    <div className={styles.col} style={{ flex: span }}>
      {children}
    </div>
  );
};

interface Props {
  gap?: number;
  className?: string;
  columns?: number;
  rows?: number;
}

const Grid: FC<Props> = ({ gap, className, columns, rows, children }) => {
  const style = {
    gap,
    gridTemplateColumns: columns && `repeat(${columns}, 1fr)`,
    gridTemplateRows: rows && `repeat(${rows}, 1fr)`,
  };

  return (
    <div className={classNames(styles.grid, className)} style={style}>
      {children}
    </div>
  );
};

export default Grid;

/* derive */
interface AutoProps {
  columns: [ReactNode, ReactNode];
  firstSpan: number;
  lastSpan: number;
  className?: string;
}

export const Auto = (props: AutoProps) => {
  const { columns, firstSpan, lastSpan, className } = props;
  const [component0, component1] = columns;

  return (
    <Row align="start" className={className}>
      <Col span={firstSpan}>{component0}</Col>
      <Col span={lastSpan}>{component1}</Col>
    </Row>
  );
};
