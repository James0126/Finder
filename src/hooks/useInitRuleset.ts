import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import {
  createActionRuleSet,
  createAmountRuleSet,
} from "@terra-money/log-finder-ruleset";
import {
  LogfinderActionRuleSet,
  LogfinderAmountRuleSet,
} from "../store/LogfinderRuleSet";
import { useNetworkName } from "../contexts/ChainsContext";

const useInitRuleset = () => {
  const network = useNetworkName();
  const setActionRules = useSetRecoilState(LogfinderActionRuleSet);
  const setAmountRules = useSetRecoilState(LogfinderAmountRuleSet);

  useEffect(() => {
    const actionRules = createActionRuleSet(network);
    const amountRules = createAmountRuleSet();
    setActionRules(actionRules);
    setAmountRules(amountRules);
  }, [setActionRules, setAmountRules, network]);
};

export default useInitRuleset;
