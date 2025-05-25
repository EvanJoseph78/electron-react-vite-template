interface PageLayoutProps {
  menubar: React.ReactNode;
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

const PageLayout = ({ menubar, sidebar, children }: PageLayoutProps) => {
  return (
    <div className="flex h-screen" data-theme="latetwist">
      {/* Sidebar lateral fixa */}
      <aside className="w-64 bg-neutral text-base-100">{sidebar}</aside>

      {/* Conteúdo principal */}
      <div className="flex flex-col flex-1">
        {/* Menubar no topo */}
        <header>{menubar}</header>

        {/* Conteúdo da página */}
        <main className="flex-1 p-4 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default PageLayout;
