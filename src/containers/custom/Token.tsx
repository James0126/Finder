import { ReactNode } from "react";
import Image from "../../components/Image";
import Card from "../../components/layout/Card";
import { DEFAULT_CW20_ICON } from "../../config/constants";
import s from "./Token.module.scss";

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
  const tokenIcon = icon ?? DEFAULT_CW20_ICON;
  return (
    <Card small mainClassname={s.card}>
      <header className={s.header}>
        <Image url={tokenIcon} />
        <section>
          <h1>{title}</h1>
          {name && <h2>{name}</h2>}
          {description && <p>{description}</p>}
        </section>
      </header>
      {extra && <aside>{extra}</aside>}
    </Card>
  );
};

export default Token;
