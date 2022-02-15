import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNetworkName } from "../../contexts/ChainsContext";
import FinderLink from "../../components/FinderLink";
import Flex from "../../components/Flex";
import Card from "../../components/Card";
import { getEndpointByKeyword } from "../../scripts/utility";
import {
  useCW20Contracts,
  useCW20Tokens,
  useCW721Contracts,
} from "../../queries/assets";
import s from "./Search.module.scss";

const Search = ({ className }: { className?: string }) => {
  const [keyword, setKeyword] = useState("");
  const network = useNetworkName();
  const navigate = useNavigate();

  const handleSubmit: (e: FormEvent<HTMLFormElement>) => void = async (e) => {
    e.preventDefault();

    if (keyword) {
      navigate(`/${network}${getEndpointByKeyword(keyword.trim())}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={className}>
        <input
          type="search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder={"Search Block / Tx / Account"}
          autoFocus
        />
        <button type="submit">Search</button>
      </form>
      <Component
        network={network}
        keyword={keyword}
        onClick={() => setKeyword("")}
      />
    </div>
  );
};

export default Search;

interface Props {
  network: string;
  keyword: string;
  onClick: () => void;
}

const Component = (props: Props) => {
  const { network, keyword, onClick } = props;
  const { data: cw20Contract } = useCW20Contracts();
  const { data: cw20Tokens } = useCW20Tokens();
  const { data: cw721Contract } = useCW721Contracts();

  const render = () => {
    if (!cw20Contract || !cw20Tokens || !cw721Contract || !keyword) {
      return null;
    }

    const whitelist = {
      ...cw20Tokens[network],
      ...cw20Contract[network],
      ...cw721Contract[network],
    };

    const result = Object.entries(whitelist)
      .map(([key, value]) => {
        const values = Object.values(value).join().toLowerCase();
        if (!values.includes(keyword.toLowerCase())) return null;
        return { ...value, address: key };
      })
      .flat()
      .filter(Boolean);

    return (
      <div className={s.list}>
        {result.map((contract, key) => {
          const { protocol, name, symbol, address } = contract;
          return (
            <Card bordered key={key}>
              <FinderLink value={address} onClick={onClick}>
                <Flex start>
                  <span>
                    {protocol} {name} {symbol && `(${symbol})`}
                  </span>
                </Flex>
              </FinderLink>
            </Card>
          );
        })}
      </div>
    );
  };
  return render();
};
