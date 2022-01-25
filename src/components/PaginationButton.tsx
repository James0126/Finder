import { ReactNode } from "react";

export type PaginationProps = {
  offset?: string;
  loading?: boolean;
  action: (offset: string) => void;
  children: ReactNode;
  status?: QueryState;
};

const PaginationButton = (props: PaginationProps) => {
  const { children, action, loading, offset } = props;
  const moreButton =
    loading || offset ? (
      <button
        style={{ width: "100%" }}
        onClick={() => offset && action(offset)}
        disabled={loading}
      >
        {loading ? "Loading..." : "more"}
      </button>
    ) : null;
  return (
    <>
      {moreButton}
      {children}
      {moreButton}
    </>
  );
};

export default PaginationButton;
