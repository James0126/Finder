import { gql, ApolloClient, InMemoryCache } from "@apollo/client";
import { useQuery } from "react-query";
import { useNetworkName } from "../contexts/ChainsContext";

const test = "https://finder.test-alpac4.com/graphql";

export const query = (address: string) => gql`
  query {
    tx {
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
    }
  }
`;

export const useTxsByAddress = (address: string): TxsByAddress => {
  const network = useNetworkName();
  const queries = query(address);

  const client = new ApolloClient({
    uri: test,
    cache: new InMemoryCache(),
  });

  const { data } = useQuery([address, "txs", network], async () => {
    const { data } = await client.query({
      query: queries,
      errorPolicy: "ignore",
    });

    return data;
  });

  return data;
};
