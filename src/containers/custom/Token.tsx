import { ReactNode } from "react";

interface Props extends Partial<CW20TokenItem> {
  // customizable
  token: string;
  extra?: ReactNode;
  className?: string;

  /* customize */
  title?: string;
  description?: ReactNode;
}

// Custom token search result
const Token = ({ token, icon, symbol, name, ...props }: Props) => {
  const { extra, title = symbol, description } = props;

  return (
    <>
      <header>
        <h1>{title}</h1>
        {name && <h2>{name}</h2>}
        {description && <p>{description}</p>}
      </header>

      {extra && <aside>{extra}</aside>}
    </>
  );
};

export default Token;
