import { FC } from "react";
import classNames from "classnames/bind";
import s from "./Button.module.scss";

const cx = classNames.bind(s);

interface Props {
  primary?: boolean;
  danger?: boolean;
  small?: boolean;
}

const Button: FC<Props> = (props) => {
  const { children, primary, danger, small } = props;
  const style = {
    small,
    primary,
    danger,
    default: !small,
  };
  return <button className={cx(s.button, style)}>{children}</button>;
};

export default Button;
