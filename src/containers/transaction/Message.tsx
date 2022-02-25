import { isTerraAddress } from "../../scripts/utility";
import Card from "../../components/layout/Card";
import { ListColumn } from "../../components/List";
import TerraAddress from "../global/TerraAddress";
import EventLog from "./EventLog";
import WasmMsg from "./WasmMsg";
import Action from "./Action";
import s from "./Message.module.scss";

interface Props {
  msgs: Message[];
  logs: TxLog[];
  isSuccess: boolean;
}

const getContent = (msg: any, key: string) => {
  const data = msg[key];

  if (typeof data === "object") {
    return <WasmMsg msg={data} />;
  } else if (isTerraAddress(data)) {
    return <TerraAddress address={data} />;
  }

  return data;
};

const Message = ({ msgs, logs, isSuccess }: Props) => (
  <article>
    {msgs.map((msg, key) => {
      const { message, type } = msg;
      const keys = Object.keys(message);

      const dataSource = keys.map((key) => {
        const render = getContent(message, key);
        return { title: <span className={s.key}>{key}</span>, content: render };
      });

      const title = <Action logs={logs} msgs={msgs} />;
      return (
        <Card
          title={title}
          className={s.message}
          bordered
          titleBackground
          key={key}
        >
          <h2 className={s.messageType}>{type}</h2>
          <ListColumn
            dataSource={dataSource}
            rowClassname={s.row}
            itemClassname={s.item}
            mainClassname={s.list}
          />
          {isSuccess && <EventLog log={logs[key]} />}
        </Card>
      );
    })}
  </article>
);

export default Message;
