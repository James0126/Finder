import { ListColumn } from "../../components/List";
import { isTerraAddress } from "../../scripts/utility";
import TerraAddress from "../global/TerraAddress";
import s from "./EventLog.module.scss";

const EventLog = ({ log }: { log: TxLog }) => {
  const { events } = log;

  const getAddress = (value: string) =>
    isTerraAddress(value) ? <TerraAddress address={value} /> : value;

  return (
    <article>
      {events.map(({ type, attributes }) => {
        const dataSource = attributes.map(({ key, value }) => {
          const content = getAddress(value);
          return {
            title: <span className={s.key}>{key}</span>,
            content: content,
          };
        });

        return (
          <div key={type}>
            <h2 className={s.type}>{type}</h2>
            <ListColumn
              dataSource={dataSource}
              rowClassname={s.row}
              mainClassname={s.list}
            />
          </div>
        );
      })}
    </article>
  );
};

export default EventLog;
