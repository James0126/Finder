import { isTerraAddress } from "../../scripts/utility";
import List from "../../components/List";
import Card from "../../components/Card";
import TerraAddress from "../global/TerraAddress";
import EventLog from "./EventLog";
import WasmMsg from "./WasmMsg";

interface Props {
  msgs: Message[];
  logs: TxLog[];
  isSuccess: boolean;
}

//TODO: Refactor codes
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
    {msgs.map(({ type, message }, key) => {
      const keys = Object.keys(message);
      const dataSource = keys.map((key) => {
        const render = getContent(message, key);
        return { title: key, content: render };
      });

      return (
        <Card header={type} key={key}>
          <List dataSource={dataSource} />
          {isSuccess && <EventLog log={logs[key]} />}
        </Card>
      );
    })}
  </article>
);

export default Message;
