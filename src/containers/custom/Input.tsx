import {
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import SearchIcon from "@mui/icons-material/Search";
import { WithTokenItem } from "./tokens";
import Flex from "../../components/layout/Flex";

//station component

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  token?: string;
  selectBefore?: ReactNode;
}

const Input = forwardRef(
  (
    { selectBefore, token, ...attrs }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => (
    <div>
      {selectBefore}

      <input {...attrs} autoComplete="off" ref={ref} />

      {token && (
        <WithTokenItem token={token}>
          {({ symbol }) => <>{symbol}</>}
        </WithTokenItem>
      )}
    </div>
  )
);

export default Input;

/* search */
export const SearchInput = forwardRef(
  (
    attrs: InputHTMLAttributes<HTMLInputElement>,
    ref: ForwardedRef<HTMLInputElement>,
    className?: string
  ) => (
    <Flex start className={className}>
      <SearchIcon />
      <input {...attrs} inputMode="search" autoComplete="off" ref={ref} />
    </Flex>
  )
);
