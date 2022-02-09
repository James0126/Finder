import { ReactNode } from "react";

type Props = {
  title?: string;
  header?: ReactNode;
  children: ReactNode;
};

//TODO: Design
const Card = ({ title, header, children }: Props) => {
  const head =
    header ||
    (title && (
      <>
        <h2>{title}</h2>
        <hr />
      </>
    ));

  return (
    <section>
      {head}
      {children}
    </section>
  );
};

export default Card;
