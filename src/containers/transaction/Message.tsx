import { AccAddress, ValAddress } from "@terra-money/terra.js";
import FinderLink from "../../components/FinderLink";
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
    return <FinderLink>{data}</FinderLink>;
  } else if (ValAddress.validate(data)) {
    return <FinderLink validator>{data}</FinderLink>;
  }

  return data;
};

const Message = ({ msgs, logs, isSuccess }: Props) => (
  <article>
    {msgs.map(({ type, message }, key) => {
      const keys = Object.keys(message);
      return (
        <Card title={type}>
          {keys.map((key: string, index: number) => (
            <div key={index}>
              {`${key} : `}
              {getContent(message, key)}
            </div>
          ))}
          {isSuccess && <EventLog log={logs[key]} />}
        </Card>
      );
    })}
  </article>
);

export default Message;
