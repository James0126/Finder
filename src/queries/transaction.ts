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
