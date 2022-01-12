import { AccAddress, ValAddress } from "@terra-money/terra.js";
import FinderLink from "../../components/FinderLink";

const getAddress = (value: string) =>
  AccAddress.validate(value) ? (
    <FinderLink>{value}</FinderLink>
  ) : ValAddress.validate(value) ? (
    <FinderLink validator>{value}</FinderLink>
  ) : (
    value
  );

const EventLog = ({ log }: { log: TxLog }) => {
  const { events } = log;
  return (
    <article>
      {events.map(({ type, attributes }, key) => (
        <div key={key}>
          <h2>{type}</h2>
          <span>
            {attributes.map(({ key, value }, index) => (
              <div key={index}>
                {`${key} : `}
                {getAddress(value)}
              </div>
            ))}
          </span>
        </div>
      ))}
    </article>
  );
};

export default EventLog;
