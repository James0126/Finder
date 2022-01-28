import { FC, ReactNode, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import styles from "./Fetching.module.scss";
import useTimeout from "../settings/useTimeout";
import Card from "../../components/Card";

//station component

interface Props extends QueryState {
  height?: number;
}

// Use the component below to build layout on a page or a card
// Use the preset component at the bottom of this file for use elsewhere

interface WithFetchingProps extends Props {
  children: (progress?: ReactNode, wrong?: ReactNode) => ReactNode;
}

export const WithFetching = (props: WithFetchingProps) => {
  const { isFetching, error, height = 4, children } = props;
  /* Do not indicate for responses within 100 ms */
  const [showFetching, setShowFetching] = useState(false);
  useTimeout(() => setShowFetching(!!isFetching), isFetching ? 100 : 0);
  const progress = showFetching && isFetching;

  return (
    <>
      {children(
        /* Strategy: Since progress is displayed even during refetching,
           do not block the contents rendered with previous data */
        progress ? (
          <LinearProgress
            color="inherit"
            className={styles.progress}
            style={{ height }}
            sx={{ position: "absolute" /* to overwrite */ }}
          />
        ) : undefined,
        error ? "Error" : undefined
      )}
    </>
  );
};

const Fetching: FC<Props> = ({ children, ...state }) => {
  return (
    <WithFetching {...state}>
      {(progress, wrong) => (
        <>
          {progress}
          {/* TODO Error message */}
          {wrong ? <Card>Error</Card> : children}
        </>
      )}
    </WithFetching>
  );
};

export default Fetching;
