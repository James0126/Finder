import { ReactNode } from "react";
import PaginationButtons from "./PaginationButtons";

export type PaginationProps = {
  offset?: string;
  action?: (offset: string) => void;
  loading?: boolean;
  children: ReactNode;
};

const Pagination = (props: PaginationProps) => {
  const { children, action, loading, offset } = props;

  return (
    <>
      {children}
      <PaginationButtons action={action} offset={offset} loading={loading} />
    </>
  );
};

export default Pagination;
