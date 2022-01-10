// Station component
import { FC, ForwardedRef, forwardRef, HTMLAttributes } from "react";
import { Link } from "react-router-dom";
import { truncate } from "@terra.kitchen/utils";

interface Props extends HTMLAttributes<HTMLAnchorElement> {
  network: string;
  value?: string;

  /* path (default: address) */
  block?: boolean;
  tx?: boolean;
  validator?: boolean;

  /* customize */
  short?: boolean;
}

const FinderLink: FC<Props> = forwardRef(
  ({ children, short, ...rest }, ref: ForwardedRef<HTMLAnchorElement>) => {
    const { block, tx, validator, network, ...attrs } = rest;
    const path = tx
      ? "tx"
      : block
      ? "block"
      : validator
      ? "validator"
      : "address";

    const value = rest.value ?? children;
    const link = [network, path, value].join("/");

    return (
      <Link {...attrs} to={`/${link}`} ref={ref}>
        {short && typeof children === "string" ? truncate(children) : children}
      </Link>
    );
  }
);

export default FinderLink;
