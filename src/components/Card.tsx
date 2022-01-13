import { ReactNode } from "react";

type Props = {
  title?: string;
  children: ReactNode;
};

//TODO: Design
const Card = ({ title, children }: Props) => {
  const header = title && (
    <>
      <h2>{title}</h2>
      <hr />
    </>
  );

  return (
    <section>
      {header}
      {children}
    </section>
  );
};

export default Card;
