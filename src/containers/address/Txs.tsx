import { useState } from "react";
import Card from "../../components/Card";
import FinderLink from "../../components/FinderLink";
import Table from "../../components/Table";
import { useTxsByAddress } from "../../queries/transaction";
import Fee from "../transaction/Fee";

const Txs = ({ address }: { address: string }) => {
  const [pageOffset, setOffset] = useState<string>();
  const { data, ...state } = useTxsByAddress(address, pageOffset);
  const { isSuccess } = state;
  const offset = data?.tx.byAddress.offset;
  const txInfos = data?.tx.byAddress.txInfos;

  const columns = [
    { title: "hash", key: "hash" },
    { title: "type", key: "msgType" },
    { title: "chian ID", key: "chainId" },
    { title: "fee", key: "fee" },
  ];

  const getTxRow = (tx: TxInfo) => {
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
      {isSuccess && !txInfos ? (
        <p>No more transaction</p>
      ) : (
        <Table
          columns={columns}
          dataSource={txInfos?.map(getTxRow)}
          pagination={() => setOffset(offset)}
          offset={offset}
          state={state}
        />
      )}
    </Card>
  );
};

export default Txs;
