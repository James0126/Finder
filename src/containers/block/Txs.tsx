import { ReactNode, useState } from "react";
import FinderLink from "../../components/FinderLink";
import { useTxsByHeight } from "../../queries/transaction";
import TxsComponent from "../../components/Txs/TxsComponent";
import Fee from "../transaction/Fee";

interface Data {
  hash: ReactNode;
  msgType: string;
  chainId: string;
  raw_log: string;
  fee: ReactNode;
}

const Txs = ({ height }: { height: string }) => {
  const [pageOffset, setOffset] = useState<string>();
  const { data, ...state } = useTxsByHeight(height, pageOffset);

  const offset = data?.tx.byHeight.offset;
  const txInfos = data?.tx.byHeight.txInfos;

  const columns = [
    { title: "hash", key: "hash" },
    { title: "type", key: "msgType" },
    { title: "chian ID", key: "chainId" },
    { title: "fee", key: "fee" },
  ];

  const getTxRow = (tx: TxInfo): Data => {
    const { chainId, compactFee, txhash, compactMessage, raw_log } = tx;
    const { type } = compactMessage[0];
    const { amounts } = compactFee;
    const msgType = type.slice(type.indexOf("/") + 1);
    const hash = <FinderLink tx short children={txhash} />;
    const fee = <Fee coins={amounts} slice={3} />;
    return { hash, msgType, chainId, fee, raw_log };
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
