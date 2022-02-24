import { SearchOutlined } from "@mui/icons-material";
import { FormEvent, useState } from "react";
import classNames from "classnames";
import s from "./SearchInput.module.scss";

interface Props {
  onSearch: (input: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchInput = (props: Props) => {
  const { onSearch, placeholder, className } = props;
  const [isFocus, setFocus] = useState(false);
  const [input, setInput] = useState("");

  const onSubmit: (e: FormEvent<HTMLFormElement>) => void = async (e) => {
    e.preventDefault();
    onSearch(input);
    return isFocus;
  };

  return (
    <form
      onSubmit={onSubmit}
      className={classNames(className, s.wrapper)}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    >
      <button className={s.button}>
        <SearchOutlined className={s.icon} />
      </button>
      <input
        inputMode="search"
        autoComplete="off"
        onChange={(e) => setInput(e.target.value)}
        placeholder={placeholder}
        className={s.input}
      />
    </form>
  );
};

export default SearchInput;
