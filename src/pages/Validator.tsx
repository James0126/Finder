import { useParams } from "react-router";
import { useValidator } from "../queries/validator";
import ValidatorDetails from "../containers/validator/ValidatorDetails";
import NotFound from "./NotFound";

const Validator = () => {
  const { address = "" } = useParams();
  const { data: validator } = useValidator(address);

  if (!validator) {
    return <NotFound />;
  }

  return (
    <article>
      <h1>Validator Page</h1>
      <ValidatorDetails validator={validator} />
    </article>
  );
};

export default Validator;
