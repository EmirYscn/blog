import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";

import { useOutsideClick } from "../hooks/useOutsideClick";
import { useDarkMode } from "../contexts/DarkMode/ThemeContextProvider";

const StyledModal = styled.div<{ $isDarkMode?: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-100);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
  z-index: 300;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-500);
  }
`;

type ModalContextType = {
  openName: string;
  close: () => void;
  open: React.Dispatch<React.SetStateAction<string>>;
  isDarkMode?: boolean;
};

const ModalContext = createContext({} as ModalContextType);

type ModalProps = {
  children: React.ReactNode;
};

function Modal({ children }: ModalProps) {
  const { isDarkMode } = useDarkMode();
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open, isDarkMode }}>
      {children}
    </ModalContext.Provider>
  );
}

type OpenProps = {
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  opens: string;
};

function Open({ children, opens: opensWindowName }: OpenProps) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

type WindowProps = {
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  name: string;
};

function Window({ children, name }: WindowProps) {
  const { openName, close, isDarkMode } = useContext(ModalContext);

  const ref = useOutsideClick<HTMLDivElement>(close);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref} $isDarkMode={isDarkMode}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
