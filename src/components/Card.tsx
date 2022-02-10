import { ReactNode } from "react";

type Props = {
  title?: ReactNode;
  header?: ReactNode;
  children: ReactNode;
};

//TODO: Design
const Card = ({ title, children }: Props) => {
  const head = title && (
    <>
      <h2>{title}</h2>
      <hr />
    </>
  );

  return (
    <section>
      {head}
      {children}
    </section>
  );
};

export default Card;
