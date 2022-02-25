import { FC } from "react";
import classNames from "classnames/bind";
import styles from "./Flex.module.scss";

const cx = classNames.bind(styles);

interface Props {
  gap?: number;
  className?: string;
  start?: boolean;
  end?: boolean;
  wrap?: boolean;
}

export const InlineFlex: FC<Props> = (props) => {
  const { gap, start, end, wrap, className, children } = props;
  return (
    <span
      className={cx(styles.inline, { start, wrap, end }, className)}
      style={{ gap }}
    >
      {children}
    </span>
  );
};

export const FlexColumn: FC<Props> = (props) => {
  const { gap, start, end, wrap, className, children } = props;
  return (
    <div
      className={cx(styles.column, { start, wrap, end }, className)}
      style={{ gap }}
    >
      {children}
    </div>
  );
};

const Flex: FC<Props> = (props) => {
  const { gap, start, end, wrap, className, children } = props;
  return (
    <div
      className={cx(styles.flex, { start, end, wrap }, className)}
      style={{ gap }}
    >
      {children}
    </div>
  );
};

export default Flex;
