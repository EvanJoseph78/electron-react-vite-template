import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useSharedState } from "../../pages/context/state-context";

type ClientFormInputs = {
  nome: string;
  telefone?: string;
  endereco?: string;
  numero?: string;
  email?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  cpf?: string;
  cnpj?: string;
};

const ClientForm: React.FC<{
  onSubmit: SubmitHandler<ClientFormInputs>;
}> = ({ onSubmit }) => {
  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ClientFormInputs>();

  const [clientType, setClientType] = useState<string>("cpf");

  const { setState, getState, resetState } = useSharedState();

  const cliente = getState<ClientFormInputs>("form_cliente") || {
    nome: "",
    telefone: "",
    endereco: "",
    numero: "",
    email: "",
    bairro: "",
    cidade: "",
    estado: "",
    cpf: "",
    cnpj: "",
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState("form_cliente", {
      ...cliente,
      [name]: value,
    });
  };

  const handleFormSubmit: SubmitHandler<ClientFormInputs> = (data) => {
    handleReset();
    onSubmit(data);
    setState("cliente_modal", false);
  };

  const handleReset = () => {
    reset();
    resetState("form_cliente");
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col justify-between h-full"
    >
      <div className="flex flex-row h-full w-full gap-4">
        {/* Lado esquerdo */}
        <div className="w-[50%] space-y-4">
          {/* Nome */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Nome</legend>
            <input
              type="text"
              name="nome"
              className="input w-full rounded-xs"
              placeholder="Digite o nome"
              value={cliente.nome}
              onChange={handleChange}
            />
            {errors.nome && (
              <p className="text-red-500 text-xs">{errors.nome.message}</p>
            )}
          </fieldset>

          {/* Email */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email</legend>
            <input
              type="email"
              name="email"
              className="input w-full rounded-xs"
              placeholder="Digite o email"
              value={cliente.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </fieldset>

          {/* Documento */}
          <fieldset className="fieldset flex items-center gap-2">
            <legend className="fieldset-legend">
              {clientType === "cpf" ? "CPF" : "CNPJ"}
            </legend>
            {clientType === "cpf" ? (
              <input
                type="text"
                name="cpf"
                className="input w-[80%] rounded-xs"
                placeholder="000.000.000-00"
                value={cliente.cpf}
                onChange={handleChange}
              />
            ) : (
              <input
                type="text"
                name="cnpj"
                className="input w-[80%] rounded-xs"
                placeholder="00.000.000/0000-00"
                value={cliente.cnpj}
                onChange={handleChange}
              />
            )}

            <select
              className="select rounded-xs w-[20%]"
              value={clientType}
              onChange={(e) => setClientType(e.target.value)}
            >
              <option value="cpf">CPF</option>
              <option value="cnpj">CNPJ</option>
            </select>
          </fieldset>

          {/* Telefone */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Telefone</legend>
            <input
              type="text"
              name="telefone"
              className="input w-full rounded-xs"
              placeholder="(00) 00000-0000"
              value={cliente.telefone}
              onChange={handleChange}
            />
          </fieldset>
        </div>

        {/* Lado direito */}
        <div className="w-[50%] space-y-4">
          {/* Endereço */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Endereço</legend>
            <input
              type="text"
              name="endereco"
              className="input w-full rounded-xs"
              placeholder="Rua, Avenida..."
              value={cliente.endereco}
              onChange={handleChange}
            />
          </fieldset>

          {/* Número */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Número</legend>
            <input
              type="text"
              name="numero"
              className="input w-full rounded-xs"
              placeholder="Número"
              value={cliente.numero}
              onChange={handleChange}
            />
          </fieldset>

          {/* Bairro */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Bairro</legend>
            <input
              type="text"
              name="bairro"
              className="input w-full rounded-xs"
              placeholder="Bairro"
              value={cliente.bairro}
              onChange={handleChange}
            />
          </fieldset>

          {/* Cidade */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Cidade</legend>
            <input
              type="text"
              name="cidade"
              className="input w-full rounded-xs"
              placeholder="Cidade"
              value={cliente.cidade}
              onChange={handleChange}
            />
          </fieldset>

          {/* Estado */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Estado</legend>
            <input
              type="text"
              name="estado"
              className="input w-full rounded-xs"
              placeholder="Estado"
              value={cliente.estado}
              onChange={handleChange}
            />
          </fieldset>
        </div>
      </div>

      {/* Botões */}
      <div className="flex justify-end gap-4 pt-4">
        <button type="button" className="btn btn-outline" onClick={handleReset}>
          Limpar
        </button>
        <button type="submit" className="btn btn-primary">
          Salvar
        </button>
      </div>
    </form>
  );
};

export default ClientForm;
