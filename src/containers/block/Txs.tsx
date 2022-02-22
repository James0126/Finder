import { useState } from "react";
import FinderLink from "../../components/FinderLink";
import { useTxsByHeight } from "../../queries/transaction";
import TxHistory from "../Txs/TxHistory";
import Fee from "../transaction/Fee";
import TxTypes from "../transaction/table/TxTypes";
import s from "./Txs.module.scss";

interface Data {
  txhash: string;
  compactMessage: Message[];
  raw_log: string;
  fee: CoinData[];
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
      render: (fee: CoinData[]) => (
        <Fee coins={fee} slice={3} className={s.textAlignEnd} />
      ),
      titleClassName: s.textAlignEnd,
    },
  ];

  const getTxRow = (tx: TxInfo): Data => {
    const { compactFee, txhash, compactMessage, raw_log } = tx;
    const { amounts } = compactFee;
    return { txhash, compactMessage, raw_log, fee: amounts };
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
