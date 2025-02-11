import { PropsWithChildren, useRef } from "react";
import { useClickOutside } from "src/utils";

interface ModalProps {
  modalSize: string;
  onClose: (value?: string) => void;
  needScroll: boolean;
}

export const Modal = ({
  children,
  modalSize,
  onClose,
  needScroll,
}: PropsWithChildren<ModalProps>) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, onClose);

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 w-screen h-screen overlay flex items-center z-50 justify-center">
      <div
        ref={modalRef}
        className={`${modalSize} rounded-2xl max-h-[90%] min-[1940px]:h-fit ${
          needScroll && "h-full"
        } rounded-base p-4 bg-white`}
      >
        <div
          className={`px-4 w-full h-[100%] overflow-y-auto select-custom-scroll`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
