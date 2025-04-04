
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { AlertTriangle, ChevronLeft, Download, FileBarChart, Search, Users } from "lucide-react";
import RiskLevelBadge from "@/components/dashboard/RiskLevelBadge";
import StudentRow from "@/components/students/StudentRow";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// Données simulées
const classData = {
  "c4": {
    id: "c4",
    name: "5ème B",
    grade: "Collège - Cinquième",
    level: 32,
    studentsCount: 27,
    alertsCount: 9,
    description: "Classe de niveau cinquième avec plusieurs cas d'alertes",
    students: [
      {
        id: "s1",
        name: "Lucas Martin",
        classroom: "5ème B",
        riskScore: 78,
        alerts: 3,
        lastActivity: "Aujourd'hui"
      },
      {
        id: "s2",
        name: "Emma Dupont",
        classroom: "5ème B",
        riskScore: 65,
        alerts: 2,
        lastActivity: "Hier"
      },
      {
        id: "s3",
        name: "Thomas Klein",
        classroom: "5ème B",
        riskScore: 45,
        alerts: 1,
        lastActivity: "Il y a 2 jours"
      },
      {
        id: "s4",
        name: "Chloé Dubois",
        classroom: "5ème B",
        riskScore: 35,
        alerts: 1,
        lastActivity: "Il y a 3 jours"
      },
      {
        id: "s5",
        name: "Nathan Bernard",
        classroom: "5ème B",
        riskScore: 22,
        alerts: 1,
        lastActivity: "Il y a 1 semaine"
      },
      {
        id: "s6",
        name: "Léa Moreau",
        classroom: "5ème B",
        riskScore: 18,
        alerts: 0,
        lastActivity: "Il y a 3 jours"
      },
      {
        id: "s7",
        name: "Hugo Lambert",
        classroom: "5ème B",
        riskScore: 12,
        alerts: 0,
        lastActivity: "Aujourd'hui"
      },
      {
        id: "s8",
        name: "Zoé Richard",
        classroom: "5ème B",
        riskScore: 8,
        alerts: 0,
        lastActivity: "Hier"
      }
    ]
  }
};

const riskDistributionData = [
  { name: "Risque élevé", value: 2 },
  { name: "Risque moyen", value: 5 },
  { name: "Risque faible", value: 20 },
];

const alertTypesData = [
  { type: "Absences", count: 4 },
  { type: "Notes", count: 2 },
  { type: "Comportement", count: 3 },
];

const COLORS = ["#DC2626", "#F59E0B", "#10B981"];

const getRiskLevel = (level: number) => {
  if (level < 15) return "low";
  if (level < 30) return "medium";
  return "high";
};

const ClassDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  // En conditions réelles, nous chargerions les données de la classe à partir de l'API
  const classInfo = classData[id as keyof typeof classData];
  
  if (!classInfo) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Classe non trouvée</h2>
          <p className="text-muted-foreground mb-4">
            La classe que vous recherchez n'existe pas
          </p>
          <Link to="/classes">
            <Button>Retour aux classes</Button>
          </Link>
        </div>
      </div>
    );
  }

  const riskLevel = getRiskLevel(classInfo.level);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center">
          <Link to="/classes">
            <Button variant="outline" size="icon" className="mr-4">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{classInfo.name}</h1>
            <p className="text-muted-foreground">{classInfo.grade}</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button>
            <AlertTriangle className="h-4 w-4 mr-2" />
            Signalement
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Niveau de risque</CardTitle>
            <FileBarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-2xl font-bold mr-3">{classInfo.level}%</div>
              <RiskLevelBadge level={riskLevel} />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Élèves</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{classInfo.studentsCount}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertes actives</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{classInfo.alertsCount}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Élèves à risque</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {classInfo.students.filter(s => s.riskScore > 30).length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="students">
        <TabsList className="mb-4">
          <TabsTrigger value="students">Élèves</TabsTrigger>
          <TabsTrigger value="analytics">Analytiques</TabsTrigger>
        </TabsList>
        <TabsContent value="students">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Liste des élèves</CardTitle>
                  <CardDescription>
                    {classInfo.studentsCount} élèves dans cette classe
                  </CardDescription>
                </div>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher un élève..."
                    className="pl-8 w-full md:w-[250px]"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Nom</th>
                      <th className="text-left py-3 px-4 font-medium">Classe</th>
                      <th className="text-left py-3 px-4 font-medium">Niveau de risque</th>
                      <th className="text-center py-3 px-4 font-medium">Alertes</th>
                      <th className="text-left py-3 px-4 font-medium">Dernière activité</th>
                      <th className="text-right py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classInfo.students.map((student) => (
                      <StudentRow key={student.id} {...student} />
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Distribution des risques</CardTitle>
                <CardDescription>
                  Répartition des élèves par niveau de risque
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={riskDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {riskDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Types d'alertes</CardTitle>
                <CardDescription>
                  Répartition des alertes par catégorie
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={alertTypesData}
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClassDetail;
