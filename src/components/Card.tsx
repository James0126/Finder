import { ReactNode } from "react";

type Props = {
  title?: string;
  children: ReactNode;
};

const Card = ({ title, children }: Props) => (
  <div>
    <h2>{title}</h2>
    {children}
  </div>
);

export default Card;
