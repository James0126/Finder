import { useNavigate, useParams } from "react-router-dom";
import { useChains, useCurrentChain } from "../contexts/ChainsContext";

const SelectNetworks = () => {
  const chains = useChains();
  const currentChain = useCurrentChain();
  const params = useParams();
  const navigate = useNavigate();

  const changeChain = (value = "") => {
    const prev = params["*"];
    const isIndex = !prev;
    const name = isIndex && value === "mainnet" ? "" : "/" + value;
    navigate(`${name}/${params["*"]}`);
  };

  return (
    <select
      value={currentChain.name}
      onChange={(e) => changeChain(e.target.value)}
    >
      {chains.map(({ name }) => (
        <option key={name}>{name}</option>
      ))}
    </select>
  );
};

export default SelectNetworks;
