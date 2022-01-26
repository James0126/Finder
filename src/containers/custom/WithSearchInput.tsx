import { ReactNode, useState } from "react";
import { SearchInput } from "./Input";

interface Props {
  children: (input: string) => ReactNode;
}

const WithSearchInput = ({ children }: Props) => {
  const [input, setInput] = useState("");

  return (
    <>
      <SearchInput
        value={input}
        onChange={(e) => setInput(e.target.value)}
        autoFocus
      />
      {children(input)}
    </>
  );
};

export default WithSearchInput;
