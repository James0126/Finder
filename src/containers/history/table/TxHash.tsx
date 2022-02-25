import { memo } from "react";
import { Error } from "@mui/icons-material";
import Flex from "../../../components/layout/Flex";
import FinderLink from "../../../components/FinderLink";
import s from "./TxHash.module.scss";

const TxHash = ({ txhash, code }: { txhash: string; code?: number }) => (
  <Flex start>
    {code ? (
      <Error style={{ width: "13px", height: "13px" }} className={s.error} />
    ) : null}
    <FinderLink tx short children={txhash} />
  </Flex>
);

export default memo(TxHash);
