import { ReactNode } from "react";

type Props = {
  title?: string;
  children: ReactNode;
};

//TODO: Design
const Card = ({ title, children }: Props) => (
  <section>
    <h2>{title}</h2>
    {children}
  </section>
);

export default Card;
