import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { useEffect, useState } from "react";
import { useQuery, UseQueryResult } from "react-query";
import { useNetworkName } from "../contexts/ChainsContext";
import { TEST_URL, useGraphQL } from "./graphql";

//TODO: Refactor codes
const queryTxsByAddress = (address: string, offset?: string) => {
  const offsetField = offset ? `offset:"${offset}"` : "";
  return gql`
    query {
        tx {
            by_address(address:"${address}" ${offsetField}) {
              offset
              tx_infos {
                chain_id
                parsed_message {
                  type
                  message
                }
                parsed_fee {
                  amounts {
                    denom
                    amount
                  }
                }
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
                txhash
                height
                raw_log
                timestamp
                code
              }
            }
        }
    }
`;
};

const queryTxsByHeight = (height: string, chainId: string, offset?: string) => {
  const offsetField = offset ? `offset:"${offset}"` : "";
  return gql`
    query {
        tx {
            by_height(height: ${height}, chainId: "${chainId}", ${offsetField}) {
                header {
                  proposer_address
                  chain_id
                  time
                  tx_count
                }
                offset
                tx_infos {
                  chain_id
                  parsed_message {
                    type
                    message
                  }
                  parsed_fee {
                    amounts {
                      denom
                      amount
                    }
                  }
                  logs {
                    events {
                      attributes {
                        key
                        value
                      }
                      type
                    }
                  }
                  txhash
                  height
                  raw_log
                  code
                  timestamp
                }
            }
        }
    }
  `;
};

const queryTxByHash = (hash: string) => gql`
    query {
        tx {
            by_hash(txHash:"${hash}") {
                chain_id
                code
                parsed_message {
                  type
                  message
                }
                parsed_fee {
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
              height
            }
        }
    }
`;

const queryLatestTxs = (offset?: string) => {
  const offsetField = offset ? `(offset:"${offset}")` : "";
  return gql`
    query {
      tx {
        latest_txs${offsetField} {
          offset
          tx_infos {
            chain_id
            parsed_message {
              type
              message
            }
            parsed_fee {
              amounts {
                denom
                amount
              }
            }
            logs {
              events {
                attributes {
                  key
                  value
                }
                type
              }
            }
            txhash
            height
            raw_log
            code
            timestamp
          }
        }
      }
    }
  `;
};

const queryMempool = (hash: string) => gql`
  query{
    mempool(tx_hash:"${hash}"){
      chain_id
      parsed_fee{
        amounts{
          amount
          denom
        }
        gaslimit
      }
      parsed_message{
        type
        message
        timestamp
      }
    }
  }
`;

export const useTxsByAddress = (
  address: string,
  offset?: string
): UseQueryResult<TxsByAddress> => {
  const queryMsg = queryTxsByAddress(address, offset);
  return useGraphQL(queryMsg);
};

export const useTxsByHeight = (
  height: string,
  offset?: string
): UseQueryResult<TxsByHeight> => {
  const chainID = Number(height) > 1378000 ? "columbus-5" : "columbus-4";
  const queryMsg = queryTxsByHeight(height, chainID, offset);
  return useGraphQL(queryMsg, height);
};

export const useTxByHash = (hash: string): UseQueryResult<TxByHash> => {
  const queryMsg = queryTxByHash(hash);
  return useGraphQL(queryMsg);
};

export const useLatestTxs = (offset?: string): UseQueryResult<LatestTxs> => {
  const queryMsg = queryLatestTxs(offset);
  return useGraphQL(queryMsg);
};

// refetch
const INTERVAL = 1000;

export const usePollTxHash = (hash: string) => {
  const network = useNetworkName();
  const client = new ApolloClient({
    uri: TEST_URL,
    cache: new InMemoryCache(),
  });

  const mempoolQuery = queryMempool(hash);
  const txQuery = queryTxByHash(hash);

  const [stored, setStored] = useState<TxByHash>();

  /* polling tx */
  const [refetchTx, setRefetchTx] = useState<boolean>(true);

  /* polling mempool tx */
  const [refetchMempool, setRefetchMempool] = useState<boolean>(false);

  /* query: tx */
  const tx = useQuery(
    [network, hash, "graphql", "tx"],
    async () => {
      const { data } = await client.query({ query: txQuery });
      return data;
    },
    {
      refetchInterval: INTERVAL,
      refetchOnWindowFocus: false,
      enabled: refetchTx,
      onSuccess: (data) => data.data && setStored(data.data),
    }
  );

  const mempool = useQuery(
    [network, mempoolQuery, hash, "graphql", "mempool"],
    async () => {
      const { data } = await client.query({ query: mempoolQuery });
      return data;
    },
    {
      refetchInterval: INTERVAL,
      refetchOnWindowFocus: false,
      enabled: refetchMempool,
      onSuccess: (data) => data.data && setStored(data.data),
    }
  );

  // if tx not exists(null or no height), start polling mempool tx
  useEffect(() => {
    if (tx.data?.data) {
      setRefetchTx(false);
      setRefetchMempool(false);
    }

    if (!tx.isFetching && !tx.data?.data) {
      setRefetchMempool(true);
    }

    if (mempool.data?.data) {
      setRefetchMempool(false);
    }
  }, [mempool.data, tx.data, tx.isFetching, hash]);

  return stored;
};
