import { FC, ReactNode } from "react";
import classNames from "classnames";
import Flex from "./layout/Flex";
import s from "./Page.module.scss";

interface Props {
  title: ReactNode;
  tag?: ReactNode;
  sentence?: ReactNode;
  mainClassName?: string;
  titleClassName?: string;
  alignCenter?: boolean;
}

const Page: FC<Props> = (props) => {
  const {
    children,
    title,
    tag,
    mainClassName,
    titleClassName,
    sentence,
    alignCenter,
  } = props;

  return (
    <section className={mainClassName}>
      <Flex start={!alignCenter} className={s.wrapper}>
        <h1 className={classNames(s.title, titleClassName)}>{title}</h1>
        <div className={s.tag}>{tag}</div>
      </Flex>
      <span>{sentence}</span>
      {children}
    </section>
  );
};

export default Page;
