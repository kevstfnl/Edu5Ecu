
import { cn } from "@/lib/utils";

type RiskLevel = "low" | "medium" | "high";

interface RiskLevelBadgeProps {
  level: RiskLevel;
  className?: string;
}

const RiskLevelBadge = ({ level, className }: RiskLevelBadgeProps) => {
  const levelText = {
    low: "Faible",
    medium: "Moyen",
    high: "Élevé",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs",
        level === "low" && "risk-level-low",
        level === "medium" && "risk-level-medium",
        level === "high" && "risk-level-high",
        className
      )}
    >
      {levelText[level]}
    </span>
  );
};

export default RiskLevelBadge;
