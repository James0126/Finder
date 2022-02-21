import { FC, useState } from "react";

const Dropdown: FC = (props) => {
  const { children } = props;
  const [isOpen, setOpen] = useState<boolean>(false);
  const button = (
    <button onClick={() => setOpen(!isOpen)}>{isOpen ? "Hide" : "Show"}</button>
  );

  return (
    <>
      {isOpen ? children : null}
      {button}
    </>
  );
};

export default Dropdown;
