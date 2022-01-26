import {
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import SearchIcon from "@mui/icons-material/Search";
import { WithTokenItem } from "./tokens";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  token?: Token;
  selectBefore?: ReactNode;
}

const Input = forwardRef(
  (
    { selectBefore, token, ...attrs }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div>
        {selectBefore}

        <input {...attrs} autoComplete="off" ref={ref} />

        {token && (
          <WithTokenItem token={token}>
            {({ symbol }) => <>{symbol}</>}
          </WithTokenItem>
        )}
      </div>
    );
  }
);

export default Input;

/* search */
export const SearchInput = forwardRef(
  (
    attrs: InputHTMLAttributes<HTMLInputElement>,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div>
        <input {...attrs} inputMode="search" autoComplete="off" ref={ref} />

        <SearchIcon />
      </div>
    );
  }
);
