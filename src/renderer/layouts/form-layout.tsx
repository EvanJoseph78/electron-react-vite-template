const FormLayout = () => {
  return (
    <div className="drawer drawer-end">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Conteúdo principal */}
        <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
          Abrir painel
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-[50%] p-4 rounded-l-2xl">
          {/* Conteúdo do painel */}
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <a>Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FormLayout;
