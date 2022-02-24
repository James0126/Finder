interface TxsByAddress {
  tx: {
    by_address: {
      tx_infos: TxInfo[];
      offset: string;
    };
  };
}

interface TxsByHeight {
  tx: {
    by_height: {
      header: BlockInfo;
      tx_infos: TxInfo[];
      offset: string;
    };
  };
}

interface TxByHash {
  tx: {
    by_hash: TxInfo;
  };
}

interface CoinData {
  amount: number;
  denom: string;
}

interface BlockInfo {
  proposer_address: string;
  chain_id: string;
  time: string;
  tx_count: number;
}

interface TxInfo {
  chain_id: string;
  code: number;
  parsed_fee: {
    amounts: CoinData[];
  };
  parsed_message: Message[];
  timestamp: string;
  raw_log: string;
  logs: TxLog[];
  height: string;
  txhash: string;
}

interface TxLog {
  events: EventLog[];
  log: string;
  msg_index: number;
}

interface EventLog {
  attributes: Attributes[];
  type: string;
}

interface Attributes {
  key: string;
  value: string;
}

interface Message {
  type: string;
  message: any;
}

interface ExecuteMsg {
  send: {
    amount: string;
    contract: string;
    msg: string;
  };
}
