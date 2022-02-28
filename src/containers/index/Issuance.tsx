import { Coin } from "@terra-money/terra.js";
import { isDenomIBC } from "@terra.kitchen/utils";
import Card from "../../components/layout/Card";
import Read from "../../components/Read";
import Modal from "../../components/Modal";
import { useSupply } from "../../queries/bank";
import { useMemoizedCalcValue } from "../../queries/oracle";
import NativeBalance from "../address/NativeBalance";
import s from "./Issuance.module.scss";

const Issuance = () => {
  const { data } = useSupply();
  const calcValue = useMemoizedCalcValue();

  const render = () => {
    if (!data) return null;

    const amount = data.find((item) => item.denom === "uluna")?.amount ?? "0";
    const value = <Read amount={String(amount)} denom="uluna" prefix />;

    const list = data
      .map((item) => ({ ...item, value: calcValue(item) }))
      .sort(({ value: a }, { value: b }) => Number(b) - Number(a))
      .filter(({ denom }) => !isDenomIBC(denom))
      .map(({ denom, amount }) =>
        Coin.fromData({ denom, amount: amount.toString() })
      );

    return (
      <>
        {value}
        <Modal
          buttonLabel="Show all"
          modalTitle="Issuance"
          mainClassname={s.modal}
          titleClassname={s.modalTitle}
        >
          <NativeBalance prefix coins={list} className={s.list} />
        </Modal>
      </>
    );
  };

  return (
    <Card title="Issuance" small titleClassname={s.title}>
      {render()}
    </Card>
  );
};

export default Issuance;
