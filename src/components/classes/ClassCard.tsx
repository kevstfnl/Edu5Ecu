
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { ArrowUpRight, Users } from "lucide-react";
import RiskLevelBadge from "../dashboard/RiskLevelBadge";
import { Button } from "@/components/ui/button";

interface ClassCardProps {
  id: string;
  name: string;
  grade: string;
  level: number;
  studentsCount: number;
  alertsCount: number;
}

const getRiskLevel = (level: number) => {
  if (level < 15) return "low";
  if (level < 30) return "medium";
  return "high";
};

const ClassCard = ({
  id,
  name,
  grade,
  level,
  studentsCount,
  alertsCount,
}: ClassCardProps) => {
  const riskLevel = getRiskLevel(level);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="rounded-full bg-primary/10 p-2">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <RiskLevelBadge level={riskLevel} />
          </div>
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-sm text-muted-foreground">{grade}</p>
          
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Niveau de risque</span>
              <span className="text-sm font-medium">{level}%</span>
            </div>
            <Progress value={level} className="h-2" />
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-lg bg-secondary p-3">
              <p className="text-sm text-muted-foreground">Élèves</p>
              <p className="text-lg font-semibold">{studentsCount}</p>
            </div>
            <div className="rounded-lg bg-secondary p-3">
              <p className="text-sm text-muted-foreground">Alertes</p>
              <p className="text-lg font-semibold">{alertsCount}</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-0">
        <Link to={`/classes/${id}`} className="w-full">
          <Button variant="ghost" className="w-full rounded-none justify-between">
            Voir détails
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ClassCard;
