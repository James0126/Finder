import { useParams } from "react-router";
import { useValidator } from "../queries/validator";
import NotFound from "./NotFound";

const Validator = () => {
  const { address = "" } = useParams();

  const { data: validator } = useValidator(address);

  if (!validator) {
    return <NotFound />;
  }

  const { moniker, details } = validator.description;

  return (
    <article>
      <h1>Validator Page</h1>
      <div>
        <h2>{moniker}</h2>
        <span>{validator.jailed ? "Jailed" : "Active"}</span>
        <p>{details}</p>
      </div>
    </article>
  );
};

export default Validator;
