type hashData = {
  txhash: string;
  code?: number;
};

interface TxRowData {
  hashData: hashData;
  parsed_message: Message[];
  raw_log: string;
  fee: CoinData[];
  time: string;
}

type LogData = {
  logs: TxLog[];
  msgs: Message[];
};
