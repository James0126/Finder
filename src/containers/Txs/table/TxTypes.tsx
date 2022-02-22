import classnames from "classnames";
import s from "./TxTypes.module.scss";

const TxTypes = ({ messages }: { messages: Message[] }) => {
  const types = messages.map(({ type }) => type.slice(type.indexOf("/") + 1));
  const leftMsgLength = messages.length - 1;
  return (
    <>
      <span className={s.type}>{types[0]}</span>
      {leftMsgLength ? (
        <span className={classnames(s.type, s.more)}>+{leftMsgLength}</span>
      ) : null}
    </>
  );
};

export default TxTypes;
