import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import classnames from "classnames/bind";
import { SearchOutlined } from "@mui/icons-material";
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

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [isFocus, setFocus] = useState(false);
  const network = useNetworkName();
  const navigate = useNavigate();

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
      <ul className={s.list} onMouseDown={(e) => e.preventDefault()}>
        {result.map((contract, key) => {
          const { protocol, name, symbol, address } = contract;
          return (
            <li key={key} className={cx(s.item)}>
              <FinderLink value={address} onClick={() => setKeyword("")}>
                {protocol} {name} {symbol && `(${symbol})`}
              </FinderLink>
            </li>
          );
        })}
      </ul>
    );
  };

  const handleSubmit: (e: FormEvent<HTMLFormElement>) => void = async (e) => {
    e.preventDefault();

    if (keyword) {
      navigate(`/${network}${getEndpointByKeyword(keyword.trim())}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={s.form}>
        <button type="submit" className={s.button}>
          <SearchOutlined />
        </button>
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
        {isFocus && render()}
      </form>
    </div>
  );
};

export default Search;
