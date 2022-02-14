import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import {
  createActionRuleSet,
  createAmountRuleSet,
} from "@terra-money/log-finder-ruleset";
import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./containers/global/Header";
import { useNetworkName } from "./contexts/ChainsContext";
import {
  LogfinderActionRuleSet,
  LogfinderAmountRuleSet,
} from "./store/LogfinderRuleSet";
import routes from "./routes";
import s from "./App.module.scss";

const App = () => {
  const network = useNetworkName();
  const setActionRules = useSetRecoilState(LogfinderActionRuleSet);
  const setAmountRules = useSetRecoilState(LogfinderAmountRuleSet);

  useEffect(() => {
    const actionRules = createActionRuleSet(network);
    const amountRules = createAmountRuleSet();
    setActionRules(actionRules);
    setAmountRules(amountRules);
  }, [setActionRules, setAmountRules, network]);

  return (
    <section className={s.app}>
      <Header />
      <ErrorBoundary>{routes}</ErrorBoundary>
    </section>
  );
};

export default App;
