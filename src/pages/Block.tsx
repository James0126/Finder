import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Transactions from "../containers/block/Transactions";

const Block = () => {
  const { height = "" } = useParams();
  return (
    <section>
      <h1>Block Page</h1>
      <span>height : {height}</span>
      {heightButton(Number(height))}
      <Transactions height={height} />
    </section>
  );
};

export default Block;

const heightButton = (height: number) => (
  <div>
    <Link to={`../blocks/${height - 1}`}>
      <button>Prev</button>
    </Link>
    <Link to={`../blocks/${height + 1}`}>
      <button>Next</button>
    </Link>
  </div>
);
