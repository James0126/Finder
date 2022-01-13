import { useParams } from "react-router";
import Transactions from "../containers/block/Transactions";

const Block = () => {
  const { height = "" } = useParams();
  return (
    <section>
      <h1>Block Page</h1>
      <Transactions height={height} />
    </section>
  );
};

export default Block;
