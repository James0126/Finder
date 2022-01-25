interface PaginationProps {
  offset?: string;
  loading?: boolean;
  action: (offset: string) => void;
  status?: QueryState;
}

const PaginationButton = (props: PaginationProps) => {
  const { action, loading, offset } = props;
  return loading || offset ? (
    <button
      style={{ width: "100%" }}
      onClick={() => offset && action(offset)}
      disabled={loading}
    >
      {loading ? "Loading..." : "more"}
    </button>
  ) : null;
};

export default PaginationButton;
