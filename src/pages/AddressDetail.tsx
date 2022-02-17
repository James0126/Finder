import { useLocation, useNavigate } from "react-router-dom";
import classnames from "classnames/bind";
import Delegations from "../containers/address/Delegations";
import Balance from "../containers/address/Balance";
import Undelegations from "../containers/address/Undelegations";
import Txs from "../containers/address/Txs";
import Flex from "../components/Flex";
import s from "./AddressDetail.module.scss";

const cx = classnames.bind(s);

const AddressDetail = ({ address }: { address: string }) => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const state = params.get("state") || "Asset";

  return (
    <>
      <Flex start className={s.buttons}>
        <button
          onClick={() => navigate("?state=Asset")}
          className={cx(s.tap, { active: state === "Asset" })}
        >
          Assets
        </button>
        <button
          onClick={() => navigate("?state=Delegations")}
          className={cx(s.tap, { active: state === "Delegations" })}
        >
          Delegations
        </button>
        <button
          onClick={() => navigate("?state=Transactions")}
          className={cx(s.tap, { active: state === "Transactions" })}
        >
          Transactions
        </button>
      </Flex>

      {state === "Delegations" ? (
        <>
          <Delegations address={address} />
          <Undelegations address={address} />
        </>
      ) : state === "Transactions" ? (
        <Txs address={address} />
      ) : (
        <Balance address={address} />
      )}
    </>
  );
};

export default AddressDetail;
