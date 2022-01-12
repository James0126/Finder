import { AccAddress, ValAddress } from "@terra-money/terra.js";
import FinderLink from "../../components/FinderLink";
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
    {msgs.map((msg, key) => {
      const { type, message } = msg;
      const msgKeys = Object.keys(message);
      return (
        <article key={key}>
          <h2>{type}</h2>
          <hr />
          {msgKeys.map((key: string, index: number) => (
            <section key={index}>
              <span>{`${key} : `}</span>
              {getContent(message, key)}
            </section>
          ))}

          {isSuccess && <EventLog log={logs[key]} />}
        </article>
      );
    })}
  </article>
);

export default Message;
