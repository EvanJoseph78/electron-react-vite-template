import React from "react";

import { SectionCardItem, SectionCardSummary } from "./section-card-item";
import { ShoppingCart, Users } from "lucide-react";

interface SectionCardProps {}

const SectionCards: React.FC<SectionCardProps> = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <SectionCardItem
        cardDescription="Faturamento do Dia"
        cardTitle="R$ 3.450,00"
        badgeText="+8.2%"
        increasing={true}
      />
      <SectionCardItem
        cardDescription="Total de Transações"
        cardTitle="132"
        badgeText="-2.3%"
        increasing={false}
      />
      <SectionCardItem
        cardDescription="Ticket Médio"
        cardTitle="R$ 26,14"
        badgeText="+1.5%"
        increasing={true}
      />
      <SectionCardItem
        cardDescription="Produtos Vendidos"
        cardTitle="521"
        badgeText="+4.7%"
        increasing={true}
      />
      <SectionCardSummary
        label="Clientes Ativos"
        value="382"
        icon={<Users className="w-5 h-5 text-primary" />}
      />

      <SectionCardSummary
        label="Pedidos Hoje"
        value="57"
        icon={<ShoppingCart className="w-5 h-5 text-primary" />}
      />
    </div>
  );
};

export default SectionCards;
