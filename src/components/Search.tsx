import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentChain } from "../contexts/chainsContext";
import { getEndpointByKeyword } from "../scripts/utility";

type Props = {
  className?: string;
};

const Search = ({ className }: Props) => {
  const [value, setValue] = useState("");
  const { name } = useCurrentChain();
  const navigate = useNavigate();

  const handleSubmit: (e: FormEvent<HTMLFormElement>) => void = async (e) => {
    e.preventDefault();

    if (value) {
      navigate(`/${name}${getEndpointByKeyword(value.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={"Search Block / Tx / Account"}
        autoFocus
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
