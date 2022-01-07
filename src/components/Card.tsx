import { ReactNode } from "react";

type Props = {
  title?: string;
  children: ReactNode;
};

//TODO: Design
const Card = ({ title, children }: Props) => (
  <div>
    <h2>{title}</h2>
    {children}
  </div>
);

export default Card;
