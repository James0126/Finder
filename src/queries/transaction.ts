import { gql } from "@apollo/client";
import { UseQueryResult } from "react-query";
import { useGraphQL } from "./graphql";

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
              memo
            }
        }
    }
`;

const queryLatestTxs = (offset?: string, limit?: number) => {
  const field =
    offset && limit
      ? `(offset:"${offset}" limit:${limit})`
      : offset
      ? `(offset:"${offset}")`
      : limit
      ? `(limit:${limit})`
      : "";

  return gql`
    query {
      tx {
        latest_txs${field} {
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
  // TODO: Fix chainID variable
  // 4724000 is last block height of columbus-4
  const chainID = Number(height) > 4724000 ? "columbus-5" : "columbus-4";
  const queryMsg = queryTxsByHeight(height, chainID, offset);
  return useGraphQL(queryMsg, height);
};

export const useTxByHash = (hash: string): UseQueryResult<TxByHash> => {
  const queryMsg = queryTxByHash(hash);
  return useGraphQL(queryMsg);
};

export const useLatestTxs = (
  offset?: string,
  limit?: number
): UseQueryResult<LatestTxs> => {
  const queryMsg = queryLatestTxs(offset, limit);
  return useGraphQL(queryMsg);
};
