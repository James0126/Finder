type Props = {
  action?: (offset: string) => void;
  offset?: string;
  loading?: boolean;
};

const PaginationButtons = ({ action, offset, loading }: Props) =>
  offset ? <div>{renderAction("MORE", offset, action, loading)}</div> : null;

export default PaginationButtons;

const renderAction = (
  children: string,
  offset: string | undefined,
  action: ((offset: string) => void) | undefined,
  loading?: boolean
) => (
  <button
    style={{ width: "100%" }}
    onClick={() => action && offset && action(offset)}
    disabled={loading}
  >
    {loading ? "Loading..." : children}
  </button>
);
