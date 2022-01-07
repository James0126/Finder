import { Link } from "react-router-dom";
import { useCurrentChain } from "../contexts/chainsContext";

type Props = {
  q: string;
  v?: string;
  children: string;
};

const FinderLink = ({ q, v, children }: Props) => {
  const { name } = useCurrentChain();

  return (
    <Link to={`/${name}/${q}/${v || children}`} rel="noopener noreferrer">
      {children}
    </Link>
  );
};

export default FinderLink;
