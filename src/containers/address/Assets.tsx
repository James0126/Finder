import { useState } from "react";
import classnames from "classnames/bind";
import { isDenomIBC } from "@terra.kitchen/utils";
import { useBankBalance } from "../../queries/bank";
import Card from "../../components/layout/Card";
import Flex from "../../components/layout/Flex";
import Modal from "../../components/Modal";
import AddTokens from "../custom/AddTokens";
import NFTAssets from "../custom/nft/NFTAssets";
import ManageCustomTokens from "../custom/ManageCustomTokens";
import ManageCustomTokensCW721 from "../custom/ManageCustomTokensCW721";
import NativeBalance from "./NativeBalance";
import s from "./Assets.module.scss";

const cx = classnames.bind(s);

type Page = "Coins" | "CW20" | "NFT";

const Assets = ({ address }: { address: string }) => {
  const [state, setState] = useState<Page>("Coins");
  const { data: balance } = useBankBalance(address);
  const native = balance?.filter((coin) => !isDenomIBC(coin.denom)).toArray();

  const header = (
    <Flex start className={s.buttons}>
      <button
        onClick={() => setState("Coins")}
        className={cx(s.tap, { active: state === "Coins" })}
      >
        Coins
      </button>
      <button
        onClick={() => setState("CW20")}
        className={cx(s.tap, { active: state === "CW20" })}
      >
        Tokens
      </button>
      <button
        onClick={() => setState("NFT")}
        className={cx(s.tap, { active: state === "NFT" })}
      >
        NFT
      </button>
    </Flex>
  );

  return (
    <section>
      <Card title={header} bordered>
        {state === "CW20" ? (
          <>
            <Modal buttonLabel="Add">
              <ManageCustomTokens />
            </Modal>
            <AddTokens address={address} />
          </>
        ) : state === "NFT" ? (
          <>
            <Modal buttonLabel="Add">
              <ManageCustomTokensCW721 />
            </Modal>
            <NFTAssets address={address} />
          </>
        ) : (
          <NativeBalance coins={native} />
        )}
      </Card>
    </section>
  );
};

export default Assets;
