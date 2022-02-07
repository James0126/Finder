import { ReactNode, useState } from "react";
import Card from "../../components/Card";
import FinderLink from "../../components/FinderLink";
import { useTxsByAddress } from "../../queries/transaction";
import TxsComponent from "../global/TxsComponent";
import Fee from "../transaction/Fee";

interface Data {
  hash: ReactNode;
  msgType: string;
  chainId: string;
  fee: ReactNode;
}

const Txs = ({ address }: { address: string }) => {
  const [pageOffset, setOffset] = useState<string>();
  const { data, ...state } = useTxsByAddress(address, pageOffset);

  const offset = data?.tx.byAddress.offset;
  const txInfos = data?.tx.byAddress.txInfos;

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
    <Card title="Transactions">
      <TxsComponent
        columns={columns}
        getTxRow={getTxRow}
        pagination={() => setOffset(offset)}
        dataSource={txInfos}
        offset={offset}
        state={state}
      />
    </Card>
  );
};

export default Txs;
