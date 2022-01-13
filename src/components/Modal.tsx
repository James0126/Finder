import { ReactNode, useState } from "react";
import ReactModal from "react-modal";
import s from "./Modal.module.scss";

ReactModal.setAppElement("#root");

type Props = {
  modalContent: ReactNode;
  buttonLabel: string;
};

const Modal = ({ modalContent, buttonLabel }: Props) => {
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

        {modalContent}
      </ReactModal>
    </article>
  );
};

export default Modal;
