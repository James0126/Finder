import { FC } from "react";
import classNames from "classnames/bind";
import s from "./Tag.module.scss";

const cx = classNames.bind(s);

interface Props {
  danger?: boolean;
  success?: boolean;
  small?: boolean;
  className?: string;
}

const Tag: FC<Props> = (props) => {
  const { children, danger, success, small, className } = props;
  return (
    <span className={cx(className, s.wrapper, { small, danger, success })}>
      {children}
    </span>
  );
};

export default Tag;
