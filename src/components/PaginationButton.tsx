interface PaginationProps {
  offset?: string;
  isLoading?: boolean;
  action: (offset: string) => void;
}

const PaginationButton = (props: PaginationProps) => {
  const { action, isLoading, offset } = props;

  return offset || isLoading ? (
    <button
      style={{ width: "100%" }}
      onClick={() => offset && action(offset)}
      disabled={isLoading}
    >
      {isLoading ? "Loading..." : "Load more"}
    </button>
  ) : null;
};

export default PaginationButton;
