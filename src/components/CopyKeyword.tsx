import { FC } from "react";
import Copy from "./Copy";

interface Prop {
  className?: string;
}

const CopyKeyword: FC<Prop> = (props) => {
  const { children, className } = props;
  return (
    <section className={className}>
      {children} <Copy text={String(children)} />
    </section>
  );
};

export default CopyKeyword;
