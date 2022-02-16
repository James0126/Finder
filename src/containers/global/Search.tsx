import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import classnames from "classnames/bind";
import { useNetworkName } from "../../contexts/ChainsContext";
import FinderLink from "../../components/FinderLink";
import { getEndpointByKeyword } from "../../scripts/utility";
import {
  useCW20Contracts,
  useCW20Tokens,
  useCW721Contracts,
} from "../../queries/assets";
import s from "./Search.module.scss";

const cx = classnames.bind(s);

const Search = ({ className }: { className?: string }) => {
  const [keyword, setKeyword] = useState("");
  const [isFocus, setFocus] = useState(false);
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
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className={s.input}
        />
        <button type="submit">Search</button>
      </form>
      <Component network={network} keyword={keyword} hide={!isFocus} />
    </div>
  );
};

export default Search;

interface Props {
  network: string;
  keyword: string;
  hide: boolean;
}

const Component = (props: Props) => {
  const { network, keyword, hide } = props;
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
      <ul className={cx(s.list, { hide })}>
        {result.map((contract, key) => {
          const { protocol, name, symbol, address } = contract;
          return (
            <FinderLink value={address}>
              <li key={key} className={s.item}>
                {protocol} {name} {symbol && `(${symbol})`}
              </li>
            </FinderLink>
          );
        })}
      </ul>
    );
  };
  return render();
};
