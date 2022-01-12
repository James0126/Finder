import { gql, ApolloClient, InMemoryCache } from "@apollo/client";
import { useQuery } from "react-query";
import { useNetworkName } from "../contexts/ChainsContext";

const TEST_URL = "https://finder.test-alpac4.com/graphql";

const queryByAddress = (address: string) => `
    byAddress(address: "${address}") {
      offset
      txInfos {
        chainId
        compactMessage {
          type
          message
        }
        compactFee {
          amounts {
            denom
            amount
          }
        }
        txhash
      }
    }
`;

const queryByHash = (hash: string) => `
    byHash(txHash:"${hash}") {
        chainId
        code
        compactMessage {
          type
          message
        }
        compactFee {
          amounts {
            denom
            amount
          }
        }
        txhash
        logs {
         events {
          attributes {
            key
            value
          }
          type
        }
        log
      }
      timestamp
      raw_log
    }
`;

const setQuery = (queries: any) => gql` 
    query {
        tx {
            ${queries}
        }
    }
`;

const useTxsQuery = (queryMsg: string) => {
  const queries = setQuery(queryMsg);
  const network = useNetworkName();
  const client = new ApolloClient({
    uri: TEST_URL,
    cache: new InMemoryCache(),
  });

  const { data } = useQuery(["txs", network, queries], async () => {
    const { data } = await client.query({
      query: queries,
      errorPolicy: "ignore",
    });

    return data;
  });

  return data;
};

export const useTxsByAddress = (address: string): TxsByAddress => {
  const queryMsg = queryByAddress(address);
  const data = useTxsQuery(queryMsg);
  return data;
};

export const useTxByHash = (hash: string): TxByHash => {
  const queryMsg = queryByHash(hash);
  const data = useTxsQuery(queryMsg);
  return data;
};
