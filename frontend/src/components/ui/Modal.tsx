import * as React from "react";
import { forwardRef, useImperativeHandle, useRef } from "react";

export type ModalHandle = {
  show: () => void;
  close: () => void;
  resetForm: () => void;
};

type ModalProps = {
  children?: React.ReactNode;
  title: string;
  actions?: React.ReactNode;
  isForm?: boolean;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

const Modal = forwardRef<ModalHandle, ModalProps>(
  (
    {
      children = null,
      title,
      actions = null,
      isForm = false,
      onSubmit = () => {},
    },
    ref,
  ) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    useImperativeHandle(
      ref,
      () => ({
        show: () => {
          dialogRef.current?.showModal();
        },
        close: () => {
          dialogRef.current?.close();
        },
        resetForm: () => {
          formRef.current?.reset();
        },
      }),
      [],
    );

    return (
      <dialog ref={dialogRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <Wrapper isForm={isForm} onSubmit={onSubmit} formRef={formRef}>
            {children}
            {actions && <div className="modal-action">{actions}</div>}
          </Wrapper>
        </div>
      </dialog>
    );
  },
);

export default Modal;

function Wrapper({
  children,
  isForm,
  onSubmit,
  formRef,
}: {
  children: React.ReactNode;
  isForm: boolean;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  formRef?: React.RefObject<HTMLFormElement | null>;
}) {
  if (isForm) {
    return (
      <form onSubmit={onSubmit} ref={formRef}>
        {children}
      </form>
    );
  } else {
    return <>{children}</>;
  }
}
