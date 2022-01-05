import { ReactNode, useState } from "react";

type Props = {
  children: ReactNode;
  classname?: string;
};

const Dropdown = (props: Props) => {
  const { children } = props;
  const [isOpen, setOpen] = useState<boolean>(false);

  const action = (
    <button onClick={() => setOpen(!isOpen)}>{isOpen ? "Hide" : "Show"}</button>
  );

  return (
    <>
      {isOpen ? children : ""}
      {action}
    </>
  );
};

export default Dropdown;
