import { ReactNode } from "react";
import Image from "../../components/Image";
import { DefaultCW20Icon } from "../../config/constants";

//station component

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
  const tokenIcon = icon ?? DefaultCW20Icon;
  return (
    <>
      <header>
        <h1>{title}</h1>
        <Image url={tokenIcon} />
        {name && <h2>{name}</h2>}
        {description && <p>{description}</p>}
      </header>

      {extra && <aside>{extra}</aside>}
    </>
  );
};

export default Token;
