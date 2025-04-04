
import { AlertTriangle, BarChart3, FileBarChart, FileText, TrendingDown, TrendingUp, Users } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import RecentAlertCard from "@/components/dashboard/RecentAlertCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";

// Données simulées
const trendData = [
  { month: "Jan", alerts: 10 },
  { month: "Fév", alerts: 15 },
  { month: "Mar", alerts: 13 },
  { month: "Avr", alerts: 20 },
  { month: "Mai", alerts: 18 },
  { month: "Juin", alerts: 25 },
  { month: "Juil", alerts: 22 },
];

const riskTypeData = [
  { type: "Absences", count: 35 },
  { type: "Notes", count: 20 },
  { type: "Discipline", count: 28 },
  { type: "Comportement", count: 17 },
  { type: "Social", count: 10 },
];

const recentAlerts = [
  {
    id: "1",
    student: {
      id: "s1",
      name: "Lucas Martin",
      class: "3ème A",
    },
    riskScore: 78,
    timestamp: "Il y a 2h",
    description: "Chute de notes et augmentation des absences non justifiées"
  },
  {
    id: "2",
    student: {
      id: "s2",
      name: "Emma Dubois",
      class: "4ème B",
    },
    riskScore: 65,
    timestamp: "Il y a 5h",
    description: "Isolement social et remarques inquiétantes des professeurs"
  },
  {
    id: "3",
    student: {
      id: "s3",
      name: "Thomas Klein",
      class: "5ème C",
    },
    riskScore: 52,
    timestamp: "Hier",
    description: "Changement de comportement et repli sur soi"
  }
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tableau de bord</h1>
        <p className="text-muted-foreground">
          Aperçu des alertes et statistiques de l'établissement
        </p>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Alertes actives"
          value={27}
          icon={AlertTriangle}
          trend={{ value: 12, positive: false }}
        />
        <StatCard
          title="Élèves à risque"
          value={14}
          icon={Users}
          description="8% des élèves"
          trend={{ value: 5, positive: false }}
        />
        <StatCard
          title="Signalements"
          value={42}
          icon={FileText}
          description="Ce mois-ci"
          trend={{ value: 8, positive: true }}
        />
        <StatCard
          title="Niveau moyen"
          value="18%"
          icon={BarChart3}
          description="Niveau de risque"
          trend={{ value: 2, positive: true }}
        />
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Évolution des alertes</CardTitle>
            <CardDescription>Tendance sur les 7 derniers mois</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={trendData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorAlerts" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1E40AF" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#1E40AF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="alerts"
                    stroke="#1E40AF"
                    fillOpacity={1}
                    fill="url(#colorAlerts)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Types d'alertes</CardTitle>
            <CardDescription>Répartition par catégorie</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={riskTypeData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" name="Nombre d'alertes" fill="#1E40AF" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <RecentAlertCard alerts={recentAlerts} />

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Activités récentes</CardTitle>
            <CardDescription>
              Dernières actions effectuées dans le système
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex">
                <div className="mr-4 flex items-center justify-center rounded-full h-8 w-8 bg-primary/10">
                  <FileBarChart className="h-4 w-4 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Analyse IA mise à jour
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Le système a effectué une nouvelle analyse des données
                  </p>
                  <p className="text-xs text-muted-foreground">Il y a 1 heure</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Nouveau signalement
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Un personnel a soumis un nouveau signalement
                  </p>
                  <p className="text-xs text-muted-foreground">Il y a 3 heures</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <TrendingDown className="h-4 w-4 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Augmentation des alertes en 5ème B
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Le niveau d'alerte de la classe a augmenté
                  </p>
                  <p className="text-xs text-muted-foreground">Hier à 14:30</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Résolution de cas
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Un cas de signalement a été résolu
                  </p>
                  <p className="text-xs text-muted-foreground">Hier à 9:15</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
