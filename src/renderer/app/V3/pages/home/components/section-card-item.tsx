import React from "react";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../../components/ui/card";
import { Badge } from "../../../../../components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

// -------------------- MÉTRICAS DINÂMICAS --------------------

interface SectionCardItemProps {
  cardDescription: string;
  cardTitle: string;
  badgeText: string;
  increasing: boolean;
}

export const SectionCardItem: React.FC<SectionCardItemProps> = ({
  cardDescription,
  cardTitle,
  badgeText,
  increasing,
}) => {
  return (
    <Card className="@container/card bg-gradient-to-b from-neutral-200 to-base-200 border-neutral-100 shadow-md">
      <CardHeader>
        <CardDescription>{cardDescription}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {cardTitle}
        </CardTitle>
        <CardAction>
          <Badge
            className={`flex items-center gap-1 ${
              increasing ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            {increasing ? (
              <TrendingUp className="size-4" />
            ) : (
              <TrendingDown className="size-4" />
            )}
            {badgeText}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          {increasing ? "Em alta este mês" : "Em queda este mês"}
        </div>
        <div className="text-muted-foreground">
          Comparado aos últimos 30 dias
        </div>
      </CardFooter>
    </Card>
  );
};

// -------------------- DADOS RESUMIDOS COM ÍCONE --------------------

interface SectionCardSummaryProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export const SectionCardSummary: React.FC<SectionCardSummaryProps> = ({
  icon,
  label,
  value,
}) => {
  return (
    <Card className="bg-gradient-to-b from-base-100 to-base-200 border border-neutral-200 shadow-md rounded-2xl p-4 hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-center h-full">
        <div className="flex flex-col justify-center gap-1">
          <CardDescription className="text-sm text-muted-foreground font-medium">
            {label}
          </CardDescription>
          <CardTitle className="text-3xl font-bold tabular-nums">
            {value}
          </CardTitle>
        </div>
        <div className="text-primary bg-primary/10 rounded-full p-4">
          <div className="w-10 h-10 flex items-center justify-center">
            {icon}
          </div>
        </div>
      </div>
    </Card>
  );
};
