import { createContext, useCallback, useContext, useState } from 'react';

type ModalState = {
  component: any | null;
};

type ModalContextType = {
  showModal: (component: any) => void;
  hideModal: () => void;
  modal: ModalState;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: any }) => {
  const [modal, setModal] = useState<ModalState>({ component: null });

  const showModal = useCallback((component: any) => {
    setModal({ component });
  }, []);

  const hideModal = useCallback(() => {
    setModal({ component: null });
  }, []);

  return (
    <ModalContext.Provider value={{ showModal, hideModal, modal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal must be used within a ModalProvider');
  return context;
};