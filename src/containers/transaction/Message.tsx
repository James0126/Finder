import { AccAddress, ValAddress } from "@terra-money/terra.js";
import FinderLink from "../../components/FinderLink";
import List from "../../components/List";
import Card from "../../components/Card";
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
  } else if (AccAddress.validate(data)) {
    return <FinderLink short>{data}</FinderLink>;
  } else if (ValAddress.validate(data)) {
    return (
      <FinderLink short validator>
        {data}
      </FinderLink>
    );
  }

  return data;
};

const Message = ({ msgs, logs, isSuccess }: Props) => (
  <article>
    {msgs.map(({ type, message }, key) => {
      const keys = Object.keys(message);
      const data = keys.map((key) => {
        const render = getContent(message, key);
        return { title: key, content: render };
      });

      return (
        <Card title={type} key={key}>
          <List data={data} />
          {isSuccess && <EventLog log={logs[key]} />}
        </Card>
      );
    })}
  </article>
);

export default Message;
