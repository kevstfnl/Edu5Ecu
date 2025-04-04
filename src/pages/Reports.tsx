
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileBarChart, FileText, Users } from "lucide-react";
import RiskLevelBadge from "@/components/dashboard/RiskLevelBadge";

// Sample data for reports
const recentReports = [
  {
    id: "1",
    student: "Lucas Martin",
    class: "3ème A",
    date: "2025-04-01",
    type: "Agression verbale",
    reportedBy: "Marie Dubois",
    status: "En cours d'examen",
    risk: "high" as const,
  },
  {
    id: "2",
    student: "Emma Petit",
    class: "5ème B",
    date: "2025-03-29",
    type: "Isolement social",
    reportedBy: "Pierre Martin",
    status: "Traité",
    risk: "medium" as const,
  },
  {
    id: "3",
    student: "Thomas Lefèvre",
    class: "4ème A",
    date: "2025-03-27",
    type: "Changement de comportement",
    reportedBy: "Sophie Bernard",
    status: "En cours d'examen",
    risk: "medium" as const,
  },
  {
    id: "4",
    student: "Léa Morel",
    class: "6ème B",
    date: "2025-03-25",
    type: "Cyber-harcèlement",
    reportedBy: "Julien Roux",
    status: "Traité",
    risk: "high" as const,
  },
  {
    id: "5",
    student: "Noah Girard",
    class: "3ème B",
    date: "2025-03-22",
    type: "Agression physique",
    reportedBy: "Isabelle Laurent",
    status: "Archivé",
    risk: "high" as const,
  },
];

const Reports = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Rapports</h1>
        <p className="text-muted-foreground">
          Consultez et gérez les signalements et rapports d'incidents
        </p>
      </div>

      <Tabs defaultValue="recent" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recent">Récents</TabsTrigger>
          <TabsTrigger value="pending">En cours</TabsTrigger>
          <TabsTrigger value="resolved">Résolus</TabsTrigger>
          <TabsTrigger value="archive">Archives</TabsTrigger>
        </TabsList>
        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Signalements récents</CardTitle>
              <CardDescription>
                Liste des derniers signalements soumis par le personnel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="pb-2 text-left font-medium">Élève</th>
                      <th className="pb-2 text-left font-medium">Classe</th>
                      <th className="pb-2 text-left font-medium">Type</th>
                      <th className="pb-2 text-left font-medium">Date</th>
                      <th className="pb-2 text-left font-medium">Signalé par</th>
                      <th className="pb-2 text-left font-medium">Statut</th>
                      <th className="pb-2 text-left font-medium">Risque</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentReports.map((report) => (
                      <tr key={report.id} className="border-b">
                        <td className="py-3">{report.student}</td>
                        <td className="py-3">{report.class}</td>
                        <td className="py-3">{report.type}</td>
                        <td className="py-3">{report.date}</td>
                        <td className="py-3">{report.reportedBy}</td>
                        <td className="py-3">{report.status}</td>
                        <td className="py-3">
                          <RiskLevelBadge level={report.risk} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total des signalements</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">48</div>
                <p className="text-xs text-muted-foreground">
                  +12% depuis le mois dernier
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Élèves concernés</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">27</div>
                <p className="text-xs text-muted-foreground">
                  sur 342 élèves (7.9%)
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Temps de traitement moyen</CardTitle>
                <FileBarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.2 jours</div>
                <p className="text-xs text-muted-foreground">
                  -8% depuis le mois dernier
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Signalements en cours de traitement</CardTitle>
              <CardDescription>
                Signalements qui nécessitent une attention immédiate
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6">
                <p className="text-muted-foreground">
                  Les signalements en cours apparaîtront ici
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="resolved">
          <Card>
            <CardHeader>
              <CardTitle>Signalements résolus</CardTitle>
              <CardDescription>
                Signalements qui ont été traités et résolus
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6">
                <p className="text-muted-foreground">
                  Les signalements résolus apparaîtront ici
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="archive">
          <Card>
            <CardHeader>
              <CardTitle>Archives</CardTitle>
              <CardDescription>
                Signalements archivés pour référence future
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6">
                <p className="text-muted-foreground">
                  Les signalements archivés apparaîtront ici
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
