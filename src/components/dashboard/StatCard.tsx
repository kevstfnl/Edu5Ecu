
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    positive?: boolean;
  };
  className?: string;
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
  className,
}: StatCardProps) => {
  return (
    <div className={cn("bg-white rounded-lg shadow-sm p-6", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="p-2 rounded-full bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
      <div className="mt-2">
        <p className="text-3xl font-bold">{value}</p>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
        {trend && (
          <div className="flex items-center mt-2">
            <span
              className={cn(
                "text-xs font-medium px-2 py-0.5 rounded-full",
                trend.positive
                  ? "bg-success/20 text-success"
                  : "bg-danger/20 text-danger"
              )}
            >
              {trend.positive ? "+" : ""}
              {trend.value}%
            </span>
            <span className="text-xs text-muted-foreground ml-2">
              depuis le mois dernier
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
