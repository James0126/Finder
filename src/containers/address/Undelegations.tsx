import { readAmount } from "@terra.kitchen/utils";
import Card from "../../components/layout/Card";
import Table from "../../components/Table";
import Amount from "../../components/Amount";
import { fromISOTime } from "../../scripts/date";
import { getFindMoniker } from "../../queries/validator";
import { useUndelegations, useValidators } from "../../queries/staking";

const Undelegations = ({ address }: { address: string }) => {
  const { data: validators } = useValidators();
  const { data: undelegations } = useUndelegations(address);

  if (!undelegations || !validators) {
    return null;
  }

  const cols = [
    { title: "Moniker", key: "moniker" },
    { title: "Amount", key: "amount" },
    { title: "Release date", key: "release" },
  ];

  const data = undelegations.map((validator) => {
    const { entries, validator_address } = validator;
    const [entry] = entries;
    const { balance, completion_time } = entry;
    const moniker = getFindMoniker(validators)(validator_address);
    const release = fromISOTime(completion_time);
    const amount = (
      <Amount
        amount={readAmount(balance.toString(), { comma: true })}
        denom={"Luna"}
      />
    );
    return { moniker, amount, release };
  });

  return undelegations.length ? (
    <Card title={"Undelegations"}>
      <Table columns={cols} dataSource={data} />
    </Card>
  ) : null;
};

export default Undelegations;
