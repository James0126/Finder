import { readAmount } from "@terra.kitchen/utils";
import Card from "../../components/Card";
import Table from "../../components/Table";
import Amount from "../../components/Amount";
import { fromISOTime } from "../../scripts/date";
import { getFindMoniker } from "../../queries/validator";
import { useUndelegations, useValidators } from "../../queries/staking";
import { combineState } from "../../queries/query";

const Undelegations = ({ address }: { address: string }) => {
  const { data: validators, ...validatorsState } = useValidators();
  const { data: undelegations, ...undelegationsState } =
    useUndelegations(address);

  const status = combineState(validatorsState, undelegationsState);

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
      <Table columns={cols} dataSource={data} state={status} />
    </Card>
  ) : null;
};

export default Undelegations;
