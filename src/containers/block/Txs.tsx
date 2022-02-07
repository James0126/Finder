import { ReactNode, useState } from "react";
import FinderLink from "../../components/FinderLink";
import { useTxsByHeight } from "../../queries/transaction";
import TxsComponent from "../global/TxsComponent";
import Fee from "../transaction/Fee";
import s from "./Txs.module.scss";

interface Data {
  hash: ReactNode;
  msgType: string;
  chainId: string;
  fee: ReactNode;
}

//query
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
    const { chainId, compactFee, txhash, compactMessage } = tx;
    const { type } = compactMessage[0];
    const { amounts } = compactFee;
    const msgType = type.slice(type.indexOf("/") + 1);
    const hash = <FinderLink tx short children={txhash} />;
    const fee = <Fee coins={amounts} slice={3} />;
    return { hash, msgType, chainId, fee };
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
