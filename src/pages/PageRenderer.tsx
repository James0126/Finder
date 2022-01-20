import { ReactNode } from "react";
import Loading from "../components/Loading";
import NotFound from "./NotFound";

interface Props {
  state: QueryState;
  children: ReactNode;
}

const PageRenderer = ({ state, children }: Props) => {
  const { isLoading, error } = state;

  return isLoading ? <Loading /> : error ? <NotFound /> : <>{children}</>;
};

export default PageRenderer;
