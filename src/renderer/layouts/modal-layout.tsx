import { X } from "lucide-react";
import React, { type ReactNode } from "react";
import { useSharedState } from "../context/state-context"; 

interface ModalLayoutProps {
  modalName?: string;
  stateKey: string; // Chave única do modal no shared state
  children?: ReactNode;
}

const ModalLayout: React.FC<ModalLayoutProps> = ({
  children,
  modalName,
  stateKey,
}) => {
  const { getState, setState } = useSharedState();

  const modalState = getState<boolean>(stateKey) || false;

  const handleOpen = () => {
    setState(stateKey, true);
  };

  const handleClose = () => {
    setState(stateKey, false);
  };

  return (
    <>
      <button
        className="border cursor-pointer px-4 py-2 rounded-2xl"
        onClick={handleOpen}
      >
        Abrir Modal
      </button>

      {modalState && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black/30 backdrop-blur-sm z-50"
          onClick={handleClose}
        >
          <div
            className="bg-white rounded-md shadow-md transform transition-all duration-300 h-[80%] w-[80%] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-4 flex items-center h-14">
              <div className="w-full">Botões</div>
              <div className="w-full flex justify-center font-medium">
                {modalName ? modalName : "Cadastro"} | Cadastro
              </div>
              <div className="flex justify-end w-full">
                <div className="tooltip" data-tip="Fechar">
                  <X
                    className="cursor-pointer hover:text-red-500 transition"
                    onClick={handleClose}
                  />
                </div>
              </div>
            </div>

            {/* Conteúdo */}
            <div className="px-4 pb-4 h-full">
              <div className="border border-neutral-200 rounded-md h-full py-6 px-8 overflow-auto">
                {children}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalLayout;
