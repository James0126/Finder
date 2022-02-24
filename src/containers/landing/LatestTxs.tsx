import { fromNow } from "../../scripts/date";
import { useLatestTxs } from "../../queries/transaction";
import TxHistory from "../history/TxHistory";
import TxTypes from "../history/table/TxTypes";
import TxHash from "../history/table/TxHash";
import Fee from "../transaction/Fee";
import s from "./LatestTxs.module.scss";

const LatestTxs = () => {
  const { data, ...state } = useLatestTxs();

  const offset = data?.tx.by_height.offset;
  const txInfos = data?.tx.by_height.tx_infos;

  const columns = [
    {
      title: "TxHash",
      key: "hashData",
      render: (hashData: hashData) => <TxHash {...hashData} />,
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
      dataSource={txInfos}
      offset={offset}
      state={state}
      hideSearch
    />
  );
};

export default LatestTxs;
