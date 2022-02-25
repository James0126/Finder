import { useState } from "react";
import { fromNow } from "../../scripts/date";
import { useLatestTxs } from "../../queries/transaction";
import TxHistory from "../history/TxHistory";
import TxTypes from "../history/table/TxTypes";
import TxHash from "../history/table/TxHash";
import Fee from "../transaction/Fee";
import s from "./LatestTxs.module.scss";

const LatestTxs = () => {
  const [pageOffset, setOffset] = useState<string>();
  const { data, ...state } = useLatestTxs(pageOffset);

  const offset = data?.tx.latest_txs.offset;
  const txInfos = data?.tx.latest_txs.tx_infos;

  const columns = [
    {
      title: "TxHash",
      key: "hashData",
      render: (hashData: HashData) => <TxHash {...hashData} />,
    },
    {
      title: "Type",
      key: "parsed_message",
      render: (msgs: Message[]) => <TxTypes messages={msgs} />,
    },
    {
      title: "Age",
      key: "time",
    },
    {
      title: "Fee",
      key: "fee",
      render: (fee: CoinData[]) => <Fee coins={fee} slice={3} />,
      alignClassname: s.textAlignEnd,
    },
  ];

  const getTxRow = (tx: TxInfo): TxRowData => {
    const { parsed_fee, txhash, parsed_message, raw_log, timestamp, code } = tx;
    const { amounts } = parsed_fee;
    const time = fromNow(new Date(timestamp));
    const hashData = { txhash, code };
    return { hashData, parsed_message, raw_log, fee: amounts, time };
  };

  return (
    <TxHistory
      columns={columns}
      getTxRow={getTxRow}
      pagination={() => setOffset(offset)}
      dataSource={txInfos}
      offset={offset}
      state={state}
      hideSearch
    />
  );
};

export default LatestTxs;
