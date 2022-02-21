import { FC, useState } from "react";
import ReactModal from "react-modal";
import s from "./Modal.module.scss";

ReactModal.setAppElement("#root");

interface Prop {
  buttonLabel: string;
}

const Modal: FC<Prop> = ({ children, buttonLabel }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const modal = {
    onAfterOpen: () => (document.body.style.overflow = "hidden"),
    onAfterClose: () => (document.body.style.overflow = "auto"),
    onRequestClose: close,
    className: s.content,
    overlayClassName: s.overlay,
    isOpen,
  };

  return (
    <article>
      <button onClick={open} className={s.button}>
        {buttonLabel}
      </button>

      <ReactModal {...modal}>
        <button className={s.close} onClick={close}>
          Close
        </button>

        {children}
      </ReactModal>
    </article>
  );
};

export default Modal;
