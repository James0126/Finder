import { ReactNode } from "react";

type Props = {
  title?: string;
  children: ReactNode;
};

const Card = (props: Props) => {
  const { title, children } = props;
  return (
    <div>
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default Card;
