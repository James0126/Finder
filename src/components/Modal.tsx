import { FC, useState } from "react";
import ReactModal from "react-modal";
import Card from "./layout/Card";
import Button from "./Button";
import s from "./Modal.module.scss";

ReactModal.setAppElement("#root");

interface Prop {
  buttonLabel: string;
  modalTitle?: string;
  mainClassname?: string;
  titleClassname?: string;
  buttonClassname?: string;
}

const Modal: FC<Prop> = (props) => {
  const {
    children,
    buttonLabel,
    mainClassname,
    modalTitle,
    titleClassname,
    buttonClassname,
  } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const modal = {
    onAfterOpen: () => (document.body.style.overflow = "hidden"),
    onAfterClose: () => (document.body.style.overflow = "auto"),
    onRequestClose: close,
    mainClassname: s.content,
    overlayClassName: s.overlay,
    isOpen,
  };

  const closeButton = <button onClick={close}>Close</button>;

  return (
    <article>
      <Button onClick={open} className={buttonClassname}>
        {buttonLabel}
      </Button>

      <ReactModal {...modal} className={mainClassname}>
        <Card
          title={modalTitle}
          titleClassname={titleClassname}
          extra={closeButton}
        >
          {children}
        </Card>
      </ReactModal>
    </article>
  );
};

export default Modal;
