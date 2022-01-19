import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { createActionRuleSet, createAmountRuleSet } from "testing-wonjm-rules";
import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./containers/global/Header";
import routes from "./routes";
import {
  LogfinderActionRuleSet,
  LogfinderAmountRuleSet,
} from "./store/LogfinderRuleSet";

const App = () => {
  const setActionRules = useSetRecoilState(LogfinderActionRuleSet);
  const setAmountRules = useSetRecoilState(LogfinderAmountRuleSet);

  useEffect(() => {
    const actionRules = createActionRuleSet();
    const amountRules = createAmountRuleSet();
    setActionRules(actionRules);
    setAmountRules(amountRules);
  }, [setActionRules, setAmountRules]);

  return (
    <section>
      <Header />
      <ErrorBoundary>{routes}</ErrorBoundary>
    </section>
  );
};

export default App;
