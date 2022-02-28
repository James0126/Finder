import FinderLink from "../../components/FinderLink";
import Card from "../../components/layout/Card";
import { useLatestBlock } from "../../queries/tendermint";
import s from "./BlockHeight.module.scss";

const BlockHeight = () => {
  const { data } = useLatestBlock();
  const render = () => {
    if (!data) return null;
    const { height } = data.block.header;
    return <FinderLink block>{height}</FinderLink>;
  };
  return (
    <Card title="Block Height" small titleClassname={s.title}>
      {render()}
    </Card>
  );
};

export default BlockHeight;
