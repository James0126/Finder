import { ReactNode } from "react";
import NotFound from "../pages/NotFound";
import Loading from "./Loading";

interface Props {
  children: ReactNode;
  state: QueryState;
}

const State = ({ children, state }: Props) =>
  state.isLoading ? <Loading /> : state.error ? <NotFound /> : <>{children}</>;

export default State;
