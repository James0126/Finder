import FinderLink from "../../components/FinderLink";
import Card from "../../components/layout/Card";
import { useBlockInfo } from "../../queries/tendermint";
import s from "./BlockHeight.module.scss";

const BlockHeight = () => {
  //Latest block info
  const { data } = useBlockInfo();

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
