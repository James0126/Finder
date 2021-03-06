import { AccAddress } from "@terra-money/terra.js";
import { useNetworkName } from "../../contexts/ChainsContext";
import { useCustomTokensCW721 } from "../settings/CustomTokens";
import { useCW721Whitelist } from "../../queries/assets";
import { useInitMsg } from "../../queries/wasm";
import WithSearchInput from "./WithSearchInput";
import TokenList from "./TokenList";
import Fetching from "./Fetching";

//station component

interface Props {
  whitelist: CW721Contracts;
  keyword: string;
}

const Component = ({ whitelist, keyword }: Props) => {
  const manage = useCustomTokensCW721();

  type Added = Record<string, CustomTokenCW721>;
  const added = manage.list.reduce<Added>(
    (acc, item) => ({ ...acc, [item.contract]: item }),
    {}
  );

  const merged = { ...added, ...whitelist };

  // if listed
  const listedItem = merged[keyword];

  // if not listed
  const { data: initMsg, ...state } = useInitMsg<CW721ContractInfoResponse>(
    !listedItem ? keyword : ""
  );

  const responseItem = initMsg ? { contract: keyword, ...initMsg } : undefined;

  // conclusion
  const result = listedItem ?? responseItem;

  // list
  const results = AccAddress.validate(keyword)
    ? result
      ? [result]
      : []
    : Object.values(merged).filter(({ name, symbol }) =>
        [symbol, name].some((word) =>
          word?.toLowerCase().includes(keyword.toLowerCase())
        )
      );

  return (
    <TokenList
      {...state}
      {...manage}
      results={results}
      renderTokenItem={({ contract, name, ...rest }) => {
        return {
          ...rest,
          token: contract,
          title: name,
          contract,
          key: contract,
        };
      }}
    />
  );
};

const ManageCustomTokensCW721 = () => {
  const network = useNetworkName();
  const { data: whitelist, ...state } = useCW721Whitelist();

  if (!whitelist) return null;
  const cw721 = whitelist[network];
  return (
    <Fetching {...state} height={2}>
      {whitelist && (
        <WithSearchInput>
          {(input) => <Component whitelist={cw721} keyword={input} />}
        </WithSearchInput>
      )}
    </Fetching>
  );
};

export default ManageCustomTokensCW721;
