import { useState } from "react";
import classnames from "classnames/bind";
import { isDenomIBC } from "@terra.kitchen/utils";
import { useBankBalance } from "../../queries/bank";
import Card from "../../components/Card";
import Modal from "../../components/Modal";
import Flex from "../../components/Flex";
import AddTokens from "../custom/AddTokens";
import ManageCustomTokens from "../custom/ManageCustomTokens";
import ManageCustomTokensCW721 from "../custom/ManageCustomTokensCW721";
import NativeBalance from "./NativeBalance";
import NFTAssets from "../custom/nft/NFTAssets";
import s from "./Balance.module.scss";

const cx = classnames.bind(s);

const Balance = ({ address }: { address: string }) => {
  const { data: balance } = useBankBalance(address);
  const native = balance?.filter((coin) => !isDenomIBC(coin.denom)).toArray();
  const [isTokens, setTokens] = useState(false);
  const [isNFT, setNFT] = useState(false);

  const coins = () => {
    setTokens(false);
    setNFT(false);
  };

  const tokens = () => {
    setTokens(true);
    setNFT(false);
  };

  const nft = () => {
    setTokens(false);
    setNFT(true);
  };

  const header = (
    <Flex start className={s.buttons}>
      <button
        onClick={coins}
        className={cx(s.tap, { active: !isTokens && !isNFT })}
      >
        Coins
      </button>
      <button onClick={tokens} className={cx(s.tap, { active: isTokens })}>
        Tokens
      </button>
      <button onClick={nft} className={cx(s.tap, { active: isNFT })}>
        NFT
      </button>
    </Flex>
  );

  return (
    <section>
      <Card header={header} className={s.coins}>
        {isTokens ? (
          <>
            <Modal modalContent={<ManageCustomTokens />} buttonLabel="Add" />
            <AddTokens address={address} />
          </>
        ) : isNFT ? (
          <>
            <Modal
              modalContent={<ManageCustomTokensCW721 />}
              buttonLabel="Add"
            />
            <NFTAssets address={address} />
          </>
        ) : (
          <NativeBalance coins={native} />
        )}
      </Card>
    </section>
  );
};

export default Balance;
