
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowUpRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface Alert {
  id: string;
  student: {
    id: string;
    name: string;
    avatar?: string;
    class: string;
  };
  riskScore: number;
  timestamp: string;
  description: string;
}

interface RecentAlertCardProps {
  alerts: Alert[];
}

const RecentAlertCard = ({ alerts }: RecentAlertCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Alertes récentes</CardTitle>
            <CardDescription>Dernières alertes générées par l'IA</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="h-8 text-xs">
            Voir toutes
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <div className="rounded-full bg-muted p-3 mb-3">
                <AlertTriangle className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-sm font-medium">Aucune alerte récente</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Les nouvelles alertes apparaîtront ici
              </p>
            </div>
          ) : (
            alerts.map((alert) => (
              <div key={alert.id} className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src={alert.student.avatar} alt={alert.student.name} />
                  <AvatarFallback>
                    {alert.student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{alert.student.name}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{alert.timestamp}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{alert.description}</p>
                  <div className="flex items-center justify-between pt-1">
                    <p className="text-xs text-muted-foreground">
                      Classe: {alert.student.class}
                    </p>
                    <div className="flex items-center space-x-2">
                      <div className="text-xs px-2 py-0.5 rounded-full bg-danger/20 text-danger">
                        Score: {alert.riskScore}%
                      </div>
                      <Link to={`/eleves/${alert.student.id}`}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                        >
                          <ArrowUpRight className="h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentAlertCard;
