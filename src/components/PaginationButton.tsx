interface PaginationProps {
  offset?: string;
  loading?: boolean;
  action: (offset: string) => void;
}

const PaginationButton = (props: PaginationProps) => {
  const { action, loading, offset } = props;
  return offset || loading ? (
    <button
      style={{ width: "100%" }}
      onClick={() => offset && action(offset)}
      disabled={loading}
    >
      {loading ? "Loading..." : "Load more"}
    </button>
  ) : null;
};

export default PaginationButton;
