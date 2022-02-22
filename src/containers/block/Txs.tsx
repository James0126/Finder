import { useState } from "react";
import FinderLink from "../../components/FinderLink";
import { useTxsByHeight } from "../../queries/transaction";
import TxHistory from "../txs/TxHistory";
import TxTypes from "../txs/table/TxTypes";
import Fee from "../transaction/Fee";
import s from "./Txs.module.scss";
import { fromNow } from "../../scripts/date";

interface Data {
  txhash: string;
  compactMessage: Message[];
  raw_log: string;
  fee: CoinData[];
  time: string;
}

const Txs = ({ height }: { height: string }) => {
  const [pageOffset, setOffset] = useState<string>();
  const { data, ...state } = useTxsByHeight(height, pageOffset);

  const offset = data?.tx.byHeight.offset;
  const txInfos = data?.tx.byHeight.txInfos;

  const columns = [
    {
      title: "TxHash",
      key: "txhash",
      render: (hash: string) => <FinderLink tx short children={hash} />,
    },
    {
      title: "Type",
      key: "compactMessage",
      render: (msgs: Message[]) => <TxTypes messages={msgs} />,
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
    const { compactFee, txhash, compactMessage, raw_log, timestamp } = tx;
    const { amounts } = compactFee;
    const time = fromNow(new Date(timestamp));
    return { txhash, compactMessage, raw_log, fee: amounts, time };
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
