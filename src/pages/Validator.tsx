import { useParams } from "react-router";
import { combineState } from "../queries/query";
import { useValidator } from "../queries/staking";
import ValidatorDetails from "../containers/validator/ValidatorDetails";
import State from "../components/State";
import Page from "../components/Page";

const Validator = () => {
  const { address = "" } = useParams();
  const { data: validator, ...state } = useValidator(address);
  const status = combineState(state);

  const render = () => {
    if (!validator) return null;
    return <ValidatorDetails validator={validator} />;
  };

  return (
    <Page title="Validator Details">
      <State state={status}>{render()}</State>
    </Page>
  );
};

export default Validator;
