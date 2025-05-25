import React, { useEffect, useRef } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

type ClientFormInputs = {
  name: string;
  email: string;
  phone: string;
};

const ClientFormModal: React.FC<{
  onSubmit: SubmitHandler<ClientFormInputs>;
}> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ClientFormInputs>();

  const [open, setOpen] = React.useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const handleFormSubmit: SubmitHandler<ClientFormInputs> = async (data) => {
    try {
      const client: Client = {
        id: 0,
        nome: data.name,
        email: data.email,
        telefone: data.phone,
      };
      await window.electron.cliente.create(client);

      // ✅ Chama o onSubmit passado pelo componente pai
      await onSubmit(data);

      console.log("Cliente salvo no banco de dados:", client);
      saveClientToDB(client);
      reset();
      handleClose();
    } catch (error) {
      console.error("Erro ao salvar cliente:", error);
    }
  };

  // Função para salvar cliente no banco de dados via IPC
  const saveClientToDB = async (client: Client) => {
    try {
      await window.electron.cliente.create(client);
      // Você pode adicionar um toast ou feedback de sucesso aqui, se desejar
      console.log("Cliente salvo no banco de dados:", client);
    } catch (error) {
      console.error("Erro ao salvar cliente no banco de dados:", error);
      // Você pode adicionar um toast ou feedback de erro aqui, se desejar
    }
  };

  // Handle ESC and Enter key events
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      }
      if (e.key === "Enter") {
        // Only submit if focus is not on a textarea or button
        const active = document.activeElement as HTMLElement | null;
        if (
          active &&
          (active.tagName === "INPUT" || active.tagName === "SELECT") &&
          formRef.current?.contains(active)
        ) {
          e.preventDefault();
          formRef.current?.requestSubmit();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line
  }, [open]);

  return (
    <>
      <button className="btn btn-primary" onClick={handleOpen}>
        Novo Cliente
      </button>
      {open && (
        <div className="modal modal-open flex items-center justify-center">
          <div className="modal-box w-full max-w-md shadow-lg rounded-lg bg-base-100 ">
            <button
              type="button"
              className="absolute top-3 right-3 btn btn-sm btn-circle btn-ghost"
              onClick={handleClose}
              aria-label="Fechar"
            >
              ✕
            </button>
            <h3 className="font-bold text-2xl mb-6 text-center">
              Novo Cliente
            </h3>
            <form
              ref={formRef}
              onSubmit={handleSubmit(handleFormSubmit)}
              className="space-y-4"
            >
              <div className="form-control flex justify-around gap-2">
                <label className="label font-semibold" htmlFor="name">
                  Nome
                </label>
                <input
                  id="name"
                  {...register("name", { required: "Nome é obrigatório" })}
                  type="text"
                  className={`input input-bordered ${
                    errors.name ? "input-error" : ""
                  }`}
                  placeholder="Digite o nome"
                  autoFocus
                />
                {errors.name && (
                  <span className="text-error text-xs mt-1">
                    {errors.name.message}
                  </span>
                )}
              </div>
              <div className="form-control flex justify-around gap-2">
                <label className="label font-semibold" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  {...register("email", {
                    required: "Email é obrigatório",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Email inválido",
                    },
                  })}
                  type="email"
                  className={`input input-bordered ${
                    errors.email ? "input-error" : ""
                  }`}
                  placeholder="exemplo@email.com"
                />
                {errors.email && (
                  <span className="text-error text-xs mt-1">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="form-control flex justify-around gap-2">
                <label className="label font-semibold" htmlFor="phone">
                  Telefone
                </label>
                <input
                  id="phone"
                  {...register("phone", { required: "Telefone é obrigatório" })}
                  type="tel"
                  className={`input input-bordered ${
                    errors.phone ? "input-error" : ""
                  }`}
                  placeholder="(99) 99999-9999"
                />
                {errors.phone && (
                  <span className="text-error text-xs mt-1">
                    {errors.phone.message}
                  </span>
                )}
              </div>
              <div className="modal-action flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={handleClose}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Salvar
                </button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop" onClick={handleClose}></div>
        </div>
      )}
    </>
  );
};

export default ClientFormModal;
