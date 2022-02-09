import { useQueries, useQuery } from "react-query";
import { AccAddress } from "@terra-money/terra.js";
import { useLCDClient } from "./lcdClient";
import { RefetchOptions } from "./query";
import { getIpfsGateway } from "../scripts/utility";
import axios from "axios";

/* contract info */
export const useContractInfo = (address: string) => {
  const lcd = useLCDClient();
  return useQuery(
    ["ContractInfo", lcd.config, address],
    () => lcd.wasm.contractInfo(address),
    { ...RefetchOptions.INFINITY, enabled: AccAddress.validate(address) }
  );
};

/* contract query */
export const useGetContractQuery = () => {
  const lcd = useLCDClient();

  return <T>(contract?: AccAddress, query?: object) => ({
    queryKey: ["ContractQuery", lcd.config, contract, query],
    queryFn: async () => {
      if (!(contract && query)) return;
      return await lcd.wasm.contractQuery<T>(contract, query);
    },
    enabled: !!contract && AccAddress.validate(contract),
  });
};

export const useInitMsg = <T>(address: string) => {
  const lcd = useLCDClient();
  return useQuery<T>(
    ["ContractQuery", "initMsg", lcd.config, address],
    async () => {
      const d = await lcd.wasm.contractInfo(address);
      return d.init_msg;
    },
    { ...RefetchOptions.INFINITY, enabled: AccAddress.validate(address) }
  );
};

export const useContractQuery = <T>(contract?: AccAddress, query?: object) => {
  const getQuery = useGetContractQuery();
  return useQuery(getQuery<T>(contract, query));
};

/* token info */
export const useTokenInfoCW20 = (token: string, disabled = false) => {
  const getQuery = useGetContractQuery();
  return useQuery({
    ...getQuery<CW20TokenInfoResponse>(token, { token_info: {} }),
    ...RefetchOptions.INFINITY,
    enabled: AccAddress.validate(token) && !disabled,
  });
};

export const useTokenInfoCW721 = (contract: AccAddress, token_id: string) => {
  const lcd = useLCDClient();

  return useQuery(
    ["CW721ContractQuery", contract, token_id],
    async () => {
      const data = await lcd.wasm.contractQuery<NFTTokenItem>(contract, {
        nft_info: { token_id },
      });

      const { token_uri } = data;
      if (!token_uri) return data;

      try {
        const uri = getIpfsGateway(token_uri);
        const { data: extension } = await axios.get(uri);
        return { ...data, extension: { ...data.extension, ...extension } };
      } catch {
        return data;
      }
    },
    { ...RefetchOptions.INFINITY }
  );
};
/* token balance */
const useGetTokenBalanceQuery = () => {
  const lcd = useLCDClient();

  return (token: AccAddress, address: AccAddress) => ({
    queryKey: ["TokenBalanceQuery", token, { balance: address }],
    queryFn: async () => {
      if (!address) return "0";
      const { balance } = await lcd.wasm.contractQuery<{ balance: string }>(
        token,
        { balance: { address } }
      );

      return balance;
    },
    ...RefetchOptions.DEFAULT,
    retry: false, // Tokens that are not implemented fail to get the balance.
    enabled: AccAddress.validate(token),
  });
};

export const useTokenBalance = (token: AccAddress, address: AccAddress) => {
  const getQuery = useGetTokenBalanceQuery();
  return useQuery(getQuery(token, address));
};

export const useTokenBalances = (tokens: AccAddress[], address: AccAddress) => {
  const getQuery = useGetTokenBalanceQuery();
  return useQueries(tokens.map((token) => getQuery(token, address)));
};

export const useCW721Tokens = (contract: AccAddress, address: AccAddress) => {
  const getQuery = useGetContractQuery();
  return useQuery(
    getQuery<{ tokens: string[] }>(contract, { tokens: { owner: address } })
  );
};
