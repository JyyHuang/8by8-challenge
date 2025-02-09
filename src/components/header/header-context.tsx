import { useState, useRef, RefObject, PropsWithChildren } from 'react';
import { createNamedContext } from '../../hooks/functions/create-named-context';

export type HeaderContextType = {
  hamburgerMenuState: HamburgerMenuState;
  isSignoutModalShown: boolean;
  openHamburgerMenu: () => void;
  closeHamburgerMenu: () => void;
  openSignoutModal: () => void;
  closeSignoutModal: () => void;
  hamburgerMenuRef: RefObject<HTMLElement>;
  openHamburgerMenuBtnRef: RefObject<HTMLButtonElement>;
  closeHamburgerMenuBtnRef: RefObject<HTMLButtonElement>;
};

export enum HamburgerMenuState {
  open,
  opening,
  closing,
  closed,
}

export const HeaderContext =
  createNamedContext<HeaderContextType>('HeaderContext');

export function HeaderContextProvider({ children }: PropsWithChildren) {
  const [hamburgerMenuState, setHamburgerMenuState] = useState(
    HamburgerMenuState.closed,
  );
  const [isSignoutModalShown, setIsSignoutModalShown] = useState(false);
  const hamburgerMenuRef = useRef<HTMLElement>(null);
  const openHamburgerMenuBtnRef = useRef<HTMLButtonElement>(null);
  const closeHamburgerMenuBtnRef = useRef<HTMLButtonElement>(null);
  const openHamburgerMenu = () => {
    setHamburgerMenuState(HamburgerMenuState.opening);
    hamburgerMenuRef.current?.addEventListener(
      'animationend',
      () => {
        setHamburgerMenuState(HamburgerMenuState.open);
        closeHamburgerMenuBtnRef.current?.focus();
      },
      { once: true },
    );
  };
  const closeHamburgerMenu = () => {
    setHamburgerMenuState(HamburgerMenuState.closing);
    hamburgerMenuRef.current?.addEventListener(
      'animationend',
      () => {
        setHamburgerMenuState(HamburgerMenuState.closed);
        openHamburgerMenuBtnRef.current?.focus();
      },
      { once: true },
    );
  };
  const openSignoutModal = () => {
    setIsSignoutModalShown(true);
  };
  const closeSignoutModal = () => {
    setIsSignoutModalShown(false);
  };

  return (
    <HeaderContext.Provider
      value={{
        hamburgerMenuState,
        hamburgerMenuRef,
        openHamburgerMenuBtnRef,
        closeHamburgerMenuBtnRef,
        openHamburgerMenu,
        closeHamburgerMenu,
        isSignoutModalShown,
        openSignoutModal,
        closeSignoutModal,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
}
