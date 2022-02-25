import Read from "../../components/Read";
import Card from "../../components/layout/Card";
import { useSupply } from "../../queries/bank";

const Issuance = () => {
  const { data } = useSupply();
  // const calcValue = useMemoizedCalcValue();

  const render = () => {
    if (!data) return null;

    const amount = data.find((item) => item.denom === "uluna")?.amount ?? "0";
    const value = <Read amount={String(amount)} denom="uluna" prefix />;

    // const list = data
    //   .map((item) => ({ ...item, value: calcValue(item) }))
    //   .sort(({ value: a }, { value: b }) => Number(b) - Number(a));

    return value;
  };

  return (
    <Card title="Issuance" bordered>
      {render()}
    </Card>
  );
};

export default Issuance;
