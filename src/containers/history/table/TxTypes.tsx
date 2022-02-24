import { memo } from "react";
import Tag from "../../../components/Tag";
import s from "./TxTypes.module.scss";

const TxTypes = ({ messages }: { messages: Message[] }) => {
  const { type } = messages[0];
  const render = type.slice(type.indexOf("/") + 1).replace("Msg", "");
  const leftMsgLength = messages.length - 1;
  return (
    <>
      <Tag small className={s.type}>
        {render}
      </Tag>
      {leftMsgLength ? <Tag small>{`+${leftMsgLength}`}</Tag> : null}
    </>
  );
};

export default memo(TxTypes);
