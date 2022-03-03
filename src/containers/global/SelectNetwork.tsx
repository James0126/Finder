import { useNavigate, useParams } from "react-router-dom";
import RadioGroup from "../../components/form/RadioGroup";
import { useChains, useCurrentChain } from "../../contexts/ChainsContext";

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
    <RadioGroup
      options={chains.map((chain) => {
        return { value: chain.name, label: chain.name };
      })}
      value={currentChain.name}
      onChange={(value) => changeChain(value)}
    />
  );
};

export default SelectNetworks;
