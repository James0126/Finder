import { FC, ReactNode } from "react";
import Flex from "./Flex";
import s from "./Page.module.scss";

interface Props {
  title: ReactNode;
  tag?: ReactNode;
}

const Page: FC<Props> = (props) => {
  const { children, title, tag } = props;
  return (
    <section className={s.wrapper}>
      <Flex start>
        <h1 className={s.title}>{title}</h1>
        <div className={s.tag}>{tag}</div>
      </Flex>
      {children}
    </section>
  );
};

export default Page;
