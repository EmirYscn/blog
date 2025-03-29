import React, { createContext, useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { HiEllipsisVertical } from "react-icons/hi2";

import { useOutsideClick } from "../hooks/useOutsideClick";
import { useDarkMode } from "../contexts/DarkMode/ThemeContextProvider";
import { createPortal } from "react-dom";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  /* position: relative; */
`;

const StyledToggle = styled.button<{ $isDarkMode?: boolean }>`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-900);
  }
`;

const StyledList = styled.ul<{ position: Position; $isDarkMode?: boolean }>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props?.position!.x}px;
  top: ${(props) => props?.position!.y}px;

  z-index: 1;
  width: max-content;
`;

const StyledButton = styled.button<{
  $isDarkMode?: boolean;
  selected?: boolean;
}>`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  ${(props) =>
    props.selected &&
    css`
      background-color: var(--color-brand-900);
    `}
`;

type Position = { x: number; y: number } | null;

type MenusContextType = {
  openId: number | string;
  close: () => void;
  open: React.Dispatch<React.SetStateAction<number | string>>;
  position: Position;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
  isDarkMode?: boolean;
};

type MenusProps = {
  children: React.ReactNode;
};

const MenusContext = createContext<MenusContextType | undefined>(undefined);

function Menus({ children }: MenusProps) {
  const { isDarkMode } = useDarkMode();
  const [openId, setOpenId] = useState<number | string>("");
  const [position, setPosition] = useState<Position>(null);

  const close = () => setOpenId("");
  const open = setOpenId;

  // Close menu when user scrolls
  useEffect(() => {
    function handleScroll() {
      close();
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition, isDarkMode }}
    >
      {children}
    </MenusContext.Provider>
  );
}

type ToggleProps = {
  id: number | string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
};

function Toggle({ id, children, icon }: ToggleProps) {
  const context = useContext(MenusContext);
  if (!context) {
    throw new Error("Toggle must be used within a MenusProvider");
  }
  const { openId, close, open, setPosition, isDarkMode } = context;

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    const button = (e.target as HTMLElement).closest("button");
    if (button) {
      const rect = button.getBoundingClientRect();
      setPosition({
        x: window.innerWidth - rect.width - rect.x,
        y: rect.y + rect.height + 8,
      });
      if (openId === "" || openId !== id) open(id);
      else close();
    }
  }

  if (children) {
    return (
      <StyledToggle onClick={handleClick} $isDarkMode={isDarkMode}>
        {children}
      </StyledToggle>
    );
  }

  return (
    <StyledToggle onClick={handleClick} $isDarkMode={isDarkMode}>
      {icon ? icon : <HiEllipsisVertical />}
    </StyledToggle>
  );
}

type ListProps = {
  id: number | string;
  children: React.ReactNode;
};

function List({ id, children }: ListProps) {
  const context = useContext(MenusContext);
  if (!context) {
    throw new Error("Toggle must be used within a MenusProvider");
  }
  const { openId, position, close, isDarkMode } = context;

  const ref = useOutsideClick<HTMLUListElement>(close);

  if (openId !== id) return null;

  return createPortal(
    <StyledList position={position} ref={ref} $isDarkMode={isDarkMode}>
      {children}
    </StyledList>,
    document.body
  );
}

type ButtonProps = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean | undefined;
  isSelected?: boolean | undefined;
};

function Button({
  children,
  icon,
  onClick,
  isSelected,
  disabled,
}: ButtonProps) {
  const context = useContext(MenusContext);
  if (!context) {
    throw new Error("Toggle must be used within a MenusProvider");
  }
  const { close, isDarkMode } = context;

  if (!context) {
    throw new Error("Toggle must be used within a MenusProvider");
  }

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton
        onClick={handleClick}
        $isDarkMode={isDarkMode}
        selected={isSelected}
        disabled={disabled}
      >
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
