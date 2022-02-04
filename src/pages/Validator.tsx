import { useParams } from "react-router";
import { combineState } from "../queries/query";
import { useValidator } from "../queries/staking";
import ValidatorDetails from "../containers/validator/ValidatorDetails";
import State from "../components/State";

const Validator = () => {
  const { address = "" } = useParams();
  const { data: validator, ...state } = useValidator(address);
  const status = combineState(state);

  const render = () => {
    if (!validator) return null;

    return (
      <>
        <h1>Validator Page</h1>
        <ValidatorDetails validator={validator} />
      </>
    );
  };

  return <State state={status}>{render()}</State>;
};

export default Validator;
