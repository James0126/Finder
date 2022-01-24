import { useState } from "react";

const SearchInput = ({ onSearch }: { onSearch: (input: string) => void }) => {
  const [input, setInput] = useState("");
  return (
    <div>
      <input
        inputMode="search"
        autoComplete="off"
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={() => onSearch(input)}>Search</button>
    </div>
  );
};

export default SearchInput;
