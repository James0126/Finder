import { SearchOutlined } from "@mui/icons-material";
import { useState } from "react";
import s from "./SearchInput.module.scss";

interface Props {
  onSearch: (input: string) => void;
  placeholder?: string;
}

const SearchInput = (props: Props) => {
  const { onSearch, placeholder } = props;
  const [input, setInput] = useState("");

  return (
    <div className={s.wrapper}>
      <button onClick={() => onSearch(input)} className={s.button}>
        <SearchOutlined />
      </button>
      <input
        inputMode="search"
        autoComplete="off"
        onChange={(e) => setInput(e.target.value)}
        placeholder={placeholder}
        className={s.input}
      />
    </div>
  );
};

export default SearchInput;
