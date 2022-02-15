import { useState } from "react";
import classnames from "classnames/bind";
import Delegations from "../containers/address/Delegations";
import Balance from "../containers/address/Balance";
import Undelegations from "../containers/address/Undelegations";
import Txs from "../containers/address/Txs";
import Flex from "../components/Flex";
import s from "./AddressDetail.module.scss";

const cx = classnames.bind(s);

const AddressDetail = ({ address }: { address: string }) => {
  type Page = "Asset" | "Delegations" | "Transactions";
  const [page, setPage] = useState<Page>("Asset");

  return (
    <>
      <Flex start className={s.buttons}>
        <button
          onClick={() => setPage("Asset")}
          className={cx(s.tap, { active: page === "Asset" })}
        >
          Assets
        </button>
        <button
          onClick={() => setPage("Delegations")}
          className={cx(s.tap, { active: page === "Delegations" })}
        >
          Delegations
        </button>
        <button
          onClick={() => setPage("Transactions")}
          className={cx(s.tap, { active: page === "Transactions" })}
        >
          Transactions
        </button>
      </Flex>

      {page === "Delegations" ? (
        <>
          <Delegations address={address} />
          <Undelegations address={address} />
        </>
      ) : page === "Transactions" ? (
        <Txs address={address} />
      ) : (
        <Balance address={address} />
      )}
    </>
  );
};

export default AddressDetail;
