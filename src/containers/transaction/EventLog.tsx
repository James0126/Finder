import { AccAddress, ValAddress } from "@terra-money/terra.js";
import FinderLink from "../../components/FinderLink";
import List from "../../components/List";

const getAddress = (value: string) =>
  AccAddress.validate(value) ? (
    <FinderLink short>{value}</FinderLink>
  ) : ValAddress.validate(value) ? (
    <FinderLink short validator>
      {value}
    </FinderLink>
  ) : (
    value
  );

const EventLog = ({ log }: { log: TxLog }) => {
  const { events } = log;
  return (
    <article>
      {events.map(({ type, attributes }) => {
        const data = attributes.map(({ key, value }) => {
          const content = getAddress(value);
          return { title: key, content: content };
        });

        return (
          <div key={type}>
            <h2>{type}</h2>
            <List data={data} />
          </div>
        );
      })}
    </article>
  );
};

export default EventLog;
