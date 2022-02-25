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
}

const Page: FC<Props> = (props) => {
  const { children, title, tag, mainClassName, titleClassName, sentence } =
    props;
  return (
    <section className={mainClassName}>
      <Flex start className={s.wrapper}>
        <h1 className={classNames(s.title, titleClassName)}>{title}</h1>
        <div className={s.tag}>{tag}</div>
      </Flex>
      <span>{sentence}</span>
      {children}
    </section>
  );
};

export default Page;
