import List from "../../components/List";
import { isTerraAddress } from "../../scripts/utility";
import TerraAddress from "../global/TerraAddress";

const EventLog = ({ log }: { log: TxLog }) => {
  const { events } = log;

  const getAddress = (value: string) =>
    isTerraAddress(value) ? <TerraAddress address={value} /> : value;

  return (
    <article>
      {events.map(({ type, attributes }) => {
        const dataSource = attributes.map(({ key, value }) => {
          const content = getAddress(value);
          return { title: key, content: content };
        });

        return (
          <div key={type}>
            <h2>{type}</h2>
            <List dataSource={dataSource} />
          </div>
        );
      })}
    </article>
  );
};

export default EventLog;
