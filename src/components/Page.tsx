import { FC, ReactNode } from "react";
import s from "./Page.module.scss";

interface Props {
  title: ReactNode;
}

const Page: FC<Props> = (props) => {
  const { children, title } = props;
  return (
    <section>
      <h1 className={s.title}>{title}</h1>
      {children}
    </section>
  );
};

export default Page;
