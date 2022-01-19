import { useMemo } from "react";
import { atom, useRecoilValue } from "recoil";
import {
  createLogMatcherForActions,
  createLogMatcherForAmounts,
  LogFindersActionRuleSet,
  LogFindersAmountRuleSet,
} from "testing-wonjm-rules";

export const LogfinderActionRuleSet = atom<LogFindersActionRuleSet[]>({
  key: "LogfinderActionRuleSetState",
  default: [],
});

export const LogfinderAmountRuleSet = atom<LogFindersAmountRuleSet[]>({
  key: "LogfinderAmountRuleSetState",
  default: [],
});

export const useActionLogMatcher = () => {
  const rules = useRecoilValue(LogfinderActionRuleSet);
  const logMatcher = useMemo(() => createLogMatcherForActions(rules), [rules]);
  return logMatcher;
};

export const useAmountLogMatcher = () => {
  const rules = useRecoilValue(LogfinderAmountRuleSet);
  const logMatcher = useMemo(() => createLogMatcherForAmounts(rules), [rules]);
  return logMatcher;
};
