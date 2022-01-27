import { isNil } from "ramda";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import { truncate } from "@terra.kitchen/utils";
import FinderLink from "../../components/FinderLink";
import Token from "./Token";

export interface TokenItemProps {
  token: string;
  title: string; // ibc:symbol | cw20:symbol | cw721:name
  icon?: string;
  contract?: string; // cw20 | cw721
  decimals?: number;
  key: string;
}

interface Props extends TokenItemProps {
  added: boolean;
  onAdd: () => void;
  onRemove: () => void;
}

const TokenItem = ({ added, onAdd, onRemove, ...props }: Props) => {
  const { token, contract, decimals, ...rest } = props;

  const link = contract && (
    <FinderLink value={contract}>
      {truncate(contract)}
      {!isNil(decimals) && ` (decimals: ${decimals ?? "6"})`}
    </FinderLink>
  );

  return (
    <Token
      {...rest}
      token={token}
      description={link}
      extra={
        <button type="button" onClick={added ? onRemove : onAdd}>
          {added ? (
            <CheckIcon style={{ fontSize: 16 }} />
          ) : (
            <AddIcon style={{ fontSize: 16 }} />
          )}
        </button>
      }
    />
  );
};

export default TokenItem;
