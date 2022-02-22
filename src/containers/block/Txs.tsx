import { useState } from "react";
import { fromNow } from "../../scripts/date";
import FinderLink from "../../components/FinderLink";
import { useTxsByHeight } from "../../queries/transaction";
import TxHistory from "../txs/TxHistory";
import TxTypes from "../txs/table/TxTypes";
import Action from "../transaction/Action";
import Fee from "../transaction/Fee";
import s from "./Txs.module.scss";

type LogData = {
  logs: TxLog[];
  msgs: Message[];
};

interface Data {
  txhash: string;
  parsed_message: Message[];
  raw_log: string;
  fee: CoinData[];
  time: string;
  logData: LogData;
}

const Txs = ({ height }: { height: string }) => {
  const [pageOffset, setOffset] = useState<string>();
  const { data, ...state } = useTxsByHeight(height, pageOffset);

  const offset = data?.tx.by_height.offset;
  const txInfos = data?.tx.by_height.tx_infos;

  const columns = [
    {
      title: "TxHash",
      key: "txhash",
      render: (hash: string) => <FinderLink tx short children={hash} />,
    },
    {
      title: "Type",
      key: "parsed_message",
      render: (msgs: Message[]) => <TxTypes messages={msgs} />,
    },
    {
      title: "Description",
      key: "logData",
      render: (logData: LogData) => <Action {...logData} limit={1} />,
    },
    {
      title: "Fee",
      key: "fee",
      render: (fee: CoinData[]) => <Fee coins={fee} slice={3} />,
      alignClassname: s.textAlignEnd,
    },
    {
      title: "Time",
      key: "time",
      alignClassname: s.textAlignEnd,
    },
  ];

  const getTxRow = (tx: TxInfo): Data => {
    const {
      parsed_fee,
      txhash,
      parsed_message,
      raw_log,
      timestamp,
      code,
      logs,
    } = tx;
    const { amounts } = parsed_fee;
    const time = fromNow(new Date(timestamp));
    //TODO: Fix message
    const msgs = code ? [parsed_message[0]] : parsed_message;
    const logData = { logs, msgs };
    return { txhash, parsed_message, raw_log, fee: amounts, time, logData };
  };

  return (
    <TxHistory
      columns={columns}
      getTxRow={getTxRow}
      pagination={() => setOffset(offset)}
      dataSource={txInfos}
      offset={offset}
      state={state}
    />
  );
};

export default Txs;
