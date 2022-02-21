import { FC, ReactNode } from "react";
import classnames from "classnames/bind";
import s from "./Card.module.scss";

interface Props {
  header?: ReactNode;
  className?: string;
  bordered?: boolean;
  headerUnderline?: boolean;
  onClick?: () => void;
}

const cx = classnames.bind(s);

const Card: FC<Props> = (props) => {
  const { header, children, className, bordered, onClick } = props;
  return (
    <div className={cx(className, { bordered: bordered })} onClick={onClick}>
      {header}
      {children}
    </div>
  );
};

export default Card;
