import { FC } from "react";
import NotFound from "../pages/NotFound";
import Loading from "./Loading";

interface Prop {
  state: QueryState;
}

const State: FC<Prop> = ({ children, state }) =>
  state.isLoading ? <Loading /> : state.error ? <NotFound /> : <>{children}</>;

export default State;
