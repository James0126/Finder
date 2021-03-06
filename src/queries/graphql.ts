import { ApolloClient, InMemoryCache, DocumentNode } from "@apollo/client";
import { useQuery } from "react-query";
import { useNetworkName } from "../contexts/ChainsContext";
import { RefetchOptions } from "./query";

//TODO: Change url
const TEST_URL = "https://finder.test-alpac4.com/graphql";

export const useGraphQL = (query: DocumentNode, queryKey?: string) => {
  const network = useNetworkName();
  const client = new ApolloClient({
    uri: TEST_URL,
    cache: new InMemoryCache(),
  });

  return useQuery(
    [network, query, "graphql", queryKey],
    async () => {
      const { data } = await client.query({ query });
      return data;
    },
    { ...RefetchOptions.INFINITY, cacheTime: 0 }
  );
};
