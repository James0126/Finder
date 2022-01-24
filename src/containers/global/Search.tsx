import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNetworkName } from "../../contexts/ChainsContext";
import { getEndpointByKeyword } from "../../scripts/utility";

const Search = ({ className }: { className?: string }) => {
  const [value, setValue] = useState("");
  const network = useNetworkName();
  const navigate = useNavigate();

  const handleSubmit: (e: FormEvent<HTMLFormElement>) => void = async (e) => {
    e.preventDefault();

    if (value) {
      navigate(`/${network}${getEndpointByKeyword(value.trim())}`);
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
