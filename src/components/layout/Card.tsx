import { FC, ReactNode } from "react";
import classnames from "classnames/bind";
import s from "./Card.module.scss";
import Flex from "./Flex";

interface Props {
  title?: ReactNode;
  mainClassname?: string;
  titleClassname?: string;
  bordered?: boolean;
  titleBackground?: boolean;
  small?: boolean;
  extra?: ReactNode;
  onClick?: () => void;
}

const cx = classnames.bind(s);

const Card: FC<Props> = (props) => {
  const {
    title,
    children,
    mainClassname,
    titleClassname,
    bordered,
    titleBackground,
    small,
    extra,
    onClick,
  } = props;

  const style = {
    default: !small || !bordered,
    small,
    bordered,
  };

  return (
    <div className={cx(s.card, style, mainClassname)} onClick={onClick}>
      {title && (
        <header className={cx(s.header, { titleBackground })}>
          <div className={titleClassname}>{title}</div>
          <Flex end className={s.extra}>
            {extra}
          </Flex>
        </header>
      )}
      {children && <div className={cx({ main: bordered })}>{children}</div>}
    </div>
  );
};

export default Card;
