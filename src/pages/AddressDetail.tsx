import { useLocation, useNavigate } from "react-router-dom";
import classnames from "classnames/bind";
import Assets from "../containers/address/Assets";
import Txs from "../containers/address/Txs";
import Flex from "../components/layout/Flex";
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
          onClick={() => navigate("?state=Transactions")}
          className={cx(s.tap, { active: state === "Transactions" })}
        >
          Transactions
        </button>
      </Flex>

      {state === "Transactions" ? (
        <Txs address={address} />
      ) : (
        <Assets address={address} />
      )}
    </>
  );
};

export default AddressDetail;
