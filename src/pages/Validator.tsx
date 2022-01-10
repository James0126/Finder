import { useParams } from "react-router";
import ValidatorInfo from "../containers/ValidatorDetails";
import { useValidator } from "../queries/validator";
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
      <ValidatorInfo validator={validator} />
    </article>
  );
};

export default Validator;
