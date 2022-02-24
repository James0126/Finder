import { memo } from "react";
import Tag from "../../../components/Tag";
import s from "./TxTypes.module.scss";

const TxTypes = ({ messages }: { messages: Message[] }) => {
  const types = messages.map(({ type }) => type.slice(type.indexOf("/") + 1));
  const leftMsgLength = messages.length - 1;
  return (
    <>
      <Tag small className={s.type}>
        {types[0]}
      </Tag>
      {leftMsgLength ? <Tag small>{`+${leftMsgLength}`}</Tag> : null}
    </>
  );
};

export default memo(TxTypes);
