import { useState } from "react";
import Card from "../../components/Card";
import FinderLink from "../../components/FinderLink";
import { useTxsByAddress } from "../../queries/transaction";
import TxsComponent from "../Txs/TxsComponent";
import Fee from "../transaction/Fee";

interface Data {
  txhash: string;
  msgType: string;
  chainId: string;
  height: string;
  fee: CoinData[];
  raw_log: string;
}

const Txs = ({ address }: { address: string }) => {
  const [pageOffset, setOffset] = useState<string>();
  const { data, ...state } = useTxsByAddress(address, pageOffset);

  const offset = data?.tx.byAddress.offset;
  const txInfos = data?.tx.byAddress.txInfos;

  const columns = [
    {
      title: "hash",
      key: "txhash",
      render: (txhash: string) => <FinderLink tx short children={txhash} />,
    },
    {
      title: "type",
      key: "msgType",
    },
    {
      title: "chian ID",
      key: "chainId",
    },
    {
      title: "height",
      key: "height",
      render: (height: string) => <FinderLink block children={height} />,
    },
    {
      title: "fee",
      key: "fee",
      render: (fee: CoinData[]) => <Fee coins={fee} slice={3} />,
    },
  ];

  const getTxRow = (tx: TxInfo): Data => {
    const { chainId, compactFee, txhash, compactMessage, height, raw_log } = tx;
    const { type } = compactMessage[0];
    const { amounts } = compactFee;
    const msgType = type.slice(type.indexOf("/") + 1);
    return { txhash, msgType, chainId, height, fee: amounts, raw_log };
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
