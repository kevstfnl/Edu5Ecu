
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import RiskLevelBadge from "../dashboard/RiskLevelBadge";
import { Eye } from "lucide-react";

interface StudentRowProps {
  id: string;
  name: string;
  classroom: string;
  riskScore: number;
  avatar?: string;
  alerts: number;
  lastActivity: string;
}

const getRiskLevel = (score: number) => {
  if (score < 25) return "low";
  if (score < 50) return "medium";
  return "high";
};

const StudentRow = ({
  id,
  name,
  classroom,
  riskScore,
  avatar,
  alerts,
  lastActivity,
}: StudentRowProps) => {
  const riskLevel = getRiskLevel(riskScore);

  return (
    <tr className="border-b hover:bg-muted/50">
      <td className="py-3 px-4">
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-3">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium">{name}</span>
        </div>
      </td>
      <td className="py-3 px-4 text-muted-foreground">{classroom}</td>
      <td className="py-3 px-4">
        <RiskLevelBadge level={riskLevel} />
      </td>
      <td className="py-3 px-4 text-center">
        <span
          className={
            alerts > 0
              ? "inline-block px-2 py-1 rounded-full text-xs font-medium bg-danger/20 text-danger"
              : "text-muted-foreground"
          }
        >
          {alerts}
        </span>
      </td>
      <td className="py-3 px-4 text-muted-foreground">{lastActivity}</td>
      <td className="py-3 px-4 text-right">
        <Link to={`/eleves/${id}`}>
          <Button size="sm" variant="ghost">
            <Eye className="h-4 w-4 mr-1" />
            Profil
          </Button>
        </Link>
      </td>
    </tr>
  );
};

export default StudentRow;
