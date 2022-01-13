import { readAmount } from "@terra.kitchen/utils";
import {
  getFindMoniker,
  useUndelegations,
  useValidators,
} from "../../queries/validator";
import Card from "../../components/Card";
import Table from "../../components/Table";
import Amount from "../../components/Amount";
import { toNow } from "../../scripts/date";

const Undelegations = ({ address }: { address: string }) => {
  const { data: validators } = useValidators();
  const { data: undelegations } = useUndelegations(address);

  if (!undelegations || !validators) {
    return null;
  }

  const title = [
    {
      title: "Moniker",
      key: "moniker",
    },
    {
      title: "Amount",
      key: "amount",
    },
    {
      title: "Release date",
      key: "release",
    },
  ];

  const data = undelegations.map((validator) => {
    const { entries, validator_address } = validator;
    const [entry] = entries;
    const { balance, completion_time } = entry;
    const amount = balance.toString();

    //TODO: Fix date
    const release = toNow(completion_time);
    const moniker = getFindMoniker(validators)(validator_address);
    const render = (
      <Amount amount={readAmount(amount, { comma: true })} denom={"Luna"} />
    );

    return { moniker: moniker, amount: render, release: release };
  });

  return undelegations.length ? (
    <Card title={"Undelegations"}>
      <Table columns={title} dataSource={data} />
    </Card>
  ) : null;
};

export default Undelegations;
