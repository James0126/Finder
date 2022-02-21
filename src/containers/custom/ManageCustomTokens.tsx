import { AccAddress } from "@terra-money/terra.js";
import WithSearchInput from "./WithSearchInput";
import TokenList from "./TokenList";
import {
  useCustomTokensCW20,
  useCustomTokensIBC,
} from "../settings/CustomTokens";
import { useTokenInfoCW20 } from "../../queries/wasm";
import { useCW20Whitelist, useIBCWhitelist } from "../../queries/assets";
import { combineState } from "../../queries/query";
import { useNetworkName } from "../../contexts/ChainsContext";
import Fetching from "./Fetching";

//station component

interface Props {
  whitelist: { ibc: IBCTokenResponse; cw20: CW20TokenResponse };
  keyword: string;
}

const Component = ({ whitelist, keyword }: Props) => {
  const network = useNetworkName();
  const ibc = useCustomTokensIBC();
  const cw20 = useCustomTokensCW20();

  type AddedIBC = Record<string, CustomTokenIBC>;
  type AddedCW20 = Record<string, CustomTokenCW20>;
  const added = {
    ibc: ibc.list.reduce<AddedIBC>(
      (acc, item) => ({ ...acc, [item.denom.replace("ibc/", "")]: item }),
      {}
    ),
    cw20: cw20.list.reduce<AddedCW20>(
      (acc, item) => ({ ...acc, [item.token]: item }),
      {}
    ),
  };

  const merged = {
    ...added.cw20,
    ...added.ibc,
    ...whitelist.ibc[network],
    ...whitelist.cw20[network],
  };

  // if listed
  const listedItem = merged[keyword];

  // if not listed
  const { data: tokenInfo, ...state } = useTokenInfoCW20(
    !listedItem ? keyword : ""
  );

  const responseItem = tokenInfo ? { token: keyword, ...tokenInfo } : undefined;

  // conclusion
  const result = listedItem ?? responseItem;

  const results = AccAddress.validate(keyword)
    ? result
      ? [result]
      : []
    : Object.values(merged).filter((item) => {
        if ("base_denom" in item) {
          // IBC
          const { base_denom } = item;
          return base_denom.includes(keyword.toLowerCase());
        } else {
          // CW20
          const { symbol, name } = item;
          return [symbol, name].some((word) =>
            word?.toLowerCase().includes(keyword.toLowerCase())
          );
        }
      });

  const manage = {
    list: [...ibc.list, ...cw20.list],
    getIsAdded: (item: CustomTokenIBC | CustomTokenCW20) => {
      if ("base_denom" in item) return ibc.getIsAdded(item);
      else return cw20.getIsAdded(item);
    },
    add: (item: CustomTokenIBC | CustomTokenCW20) => {
      if ("base_denom" in item) return ibc.add(item);
      else return cw20.add(item);
    },
    remove: (item: CustomTokenIBC | CustomTokenCW20) => {
      if ("base_denom" in item) return ibc.remove(item);
      else return cw20.remove(item);
    },
  };

  const renderTokenItem = (item: CustomTokenIBC | CustomTokenCW20) => {
    if ("base_denom" in item) {
      const { symbol, denom, ...rest } = item;
      return { ...rest, token: denom, title: symbol, key: denom };
    } else {
      const { token, symbol, ...rest } = item;
      return { ...rest, token, title: symbol, contract: token, key: token };
    }
  };

  return (
    <TokenList
      {...state}
      {...manage}
      results={results}
      renderTokenItem={renderTokenItem}
    />
  );
};

const ManageCustomTokens = () => {
  const { data: ibc, ...ibcWhitelistState } = useIBCWhitelist();
  const { data: cw20, ...cw20WhitelistState } = useCW20Whitelist();
  const state = combineState(ibcWhitelistState, cw20WhitelistState);

  const render = () => {
    if (!(ibc && cw20)) return null;

    return (
      <WithSearchInput>
        {(input) => <Component whitelist={{ ibc, cw20 }} keyword={input} />}
      </WithSearchInput>
    );
  };

  return (
    <Fetching {...state} height={2}>
      {render()}
    </Fetching>
  );
};

export default ManageCustomTokens;
