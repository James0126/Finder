import { FC, ReactNode } from "react";
import classnames from "classnames/bind";
import s from "./Card.module.scss";

interface Props {
  title?: ReactNode;
  className?: string;
  bordered?: boolean;
  titleBackground?: boolean;
  small?: boolean;
  onClick?: () => void;
}

const cx = classnames.bind(s);

const Card: FC<Props> = (props) => {
  const {
    title,
    children,
    className,
    bordered,
    titleBackground,
    small,
    onClick,
  } = props;

  const style = {
    default: !small || !bordered,
    small,
    bordered,
  };

  return (
    <div className={cx(s.card, style, className)} onClick={onClick}>
      {title && (
        <div className={cx(s.header, { titleBackground })}>{title}</div>
      )}
      {children && <div className={cx({ content: bordered })}>{children}</div>}
    </div>
  );
};

export default Card;
