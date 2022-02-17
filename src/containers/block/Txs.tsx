import { useState } from "react";
import FinderLink from "../../components/FinderLink";
import { useTxsByHeight } from "../../queries/transaction";
import TxsComponent from "../Txs/TxsComponent";
import Fee from "../transaction/Fee";

interface Data {
  txhash: string;
  msgType: string;
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
      title: "hash",
      key: "txhash",
      render: (hash: string) => <FinderLink tx short children={hash} />,
    },
    {
      title: "type",
      key: "msgType",
    },
    {
      title: "fee",
      key: "fee",
      render: (fee: CoinData[]) => <Fee coins={fee} slice={3} />,
    },
  ];

  const getTxRow = (tx: TxInfo): Data => {
    const { compactFee, txhash, compactMessage, raw_log } = tx;
    const { type } = compactMessage[0];
    const { amounts } = compactFee;
    const msgType = type.slice(type.indexOf("/") + 1);
    return { txhash, msgType, raw_log, fee: amounts };
  };

  return (
    <TxsComponent
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
