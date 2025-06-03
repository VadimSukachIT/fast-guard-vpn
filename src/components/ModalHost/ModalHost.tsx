// src/components/ModalHost.tsx
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useModal } from '../../context/ModalContext';

const ModalHost = () => {
  const { modal, hideModal } = useModal();

  return (
    <Transition show={!!modal.component} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50" onClose={hideModal}>
        <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="transition duration-200 ease-out"
            enterFrom="opacity-0 translate-y-4"
            enterTo="opacity-100 translate-y-0"
            leave="transition duration-150 ease-in"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-4"
          >
            <Dialog.Panel className="w-full h-full max-w-md bg-white rounded-xl p-6 shadow-xl overflow-auto">
              {modal.component}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalHost;