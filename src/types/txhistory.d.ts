interface TxRowData {
  hashData: hashData;
  parsed_message: Message[];
  raw_log: string;
  fee: CoinData[];
  time: string;
}

type HashData = {
  txhash: string;
  code?: number;
};

type LogData = {
  logs: TxLog[];
  msgs: Message[];
};
