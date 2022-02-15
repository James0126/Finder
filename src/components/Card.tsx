import { ReactNode } from "react";
import classnames from "classnames/bind";
import s from "./Card.module.scss";

type Props = {
  header?: ReactNode;
  className?: string;
  bordered?: boolean;
  headerUnderline?: boolean;
  onClick?: () => void;
  children: ReactNode;
};

const cx = classnames.bind(s);

//TODO: Design
const Card = (props: Props) => {
  const { header, children, className, bordered, onClick } = props;
  return (
    <div className={cx(className, { bordered: bordered })} onClick={onClick}>
      {header}
      {children}
    </div>
  );
};

export default Card;
