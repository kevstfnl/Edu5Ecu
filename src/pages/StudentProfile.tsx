
import { useParams, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, ChevronLeft, FileText, Info, LineChart, School, User } from "lucide-react";
import RiskLevelBadge from "@/components/dashboard/RiskLevelBadge";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart as RechartsLineChart, Line, Legend, BarChart, Bar, Cell } from "recharts";

// Données simulées
const studentsData = {
  "s1": {
    id: "s1",
    name: "Lucas Martin",
    classroom: "3ème A",
    classId: "c7",
    birthdate: "12/05/2010",
    address: "15 Rue des Lilas, 75011 Paris",
    phone: "06 12 34 56 78",
    parent: "Marie Martin",
    parentPhone: "06 98 76 54 32",
    riskScore: 78,
    riskHistory: [
      { month: "Jan", score: 15 },
      { month: "Fév", score: 22 },
      { month: "Mar", score: 35 },
      { month: "Avr", score: 42 },
      { month: "Mai", score: 60 },
      { month: "Juin", score: 78 }
    ],
    alerts: [
      {
        id: "a1",
        date: "10/06/2023",
        title: "Chute des notes en mathématiques",
        description: "Baisse significative des résultats lors des deux derniers contrôles",
        severity: "medium"
      },
      {
        id: "a2",
        date: "15/06/2023",
        title: "Absences répétées",
        description: "Quatre absences non justifiées en deux semaines",
        severity: "high"
      },
      {
        id: "a3",
        date: "20/06/2023",
        title: "Isolement social",
        description: "Signalement de repli sur soi par plusieurs enseignants",
        severity: "high"
      }
    ],
    attendance: [
      { month: "Jan", present: 95, absent: 5 },
      { month: "Fév", present: 90, absent: 10 },
      { month: "Mar", present: 85, absent: 15 },
      { month: "Avr", present: 80, absent: 20 },
      { month: "Mai", present: 75, absent: 25 },
      { month: "Juin", present: 70, absent: 30 }
    ],
    grades: [
      { month: "Jan", grade: 14.5 },
      { month: "Fév", grade: 13.8 },
      { month: "Mar", grade: 12.5 },
      { month: "Avr", grade: 11.0 },
      { month: "Mai", grade: 9.5 },
      { month: "Juin", grade: 8.2 }
    ],
    behaviorReports: [
      {
        id: "b1",
        date: "05/06/2023",
        reporter: "Mme Dupont (Français)",
        description: "Manque de concentration et participation en baisse en cours"
      },
      {
        id: "b2",
        date: "12/06/2023",
        reporter: "M. Bernard (Mathématiques)",
        description: "Devoir non rendu et attitude désintéressée en classe"
      },
      {
        id: "b3",
        date: "18/06/2023",
        reporter: "Mme Lefèvre (Histoire-Géographie)",
        description: "Dort en classe et ne prend plus de notes depuis deux semaines"
      }
    ]
  }
};

const getRiskLevel = (score: number) => {
  if (score < 25) return "low";
  if (score < 50) return "medium";
  return "high";
};

const getSeverityColor = (severity: string) => {
  switch(severity) {
    case "low": return "bg-success/20 text-success";
    case "medium": return "bg-warning/20 text-warning";
    case "high": return "bg-danger/20 text-danger";
    default: return "bg-muted";
  }
};

const StudentProfile = () => {
  const { id } = useParams<{ id: string }>();
  
  // En conditions réelles, nous chargerions les données de l'élève à partir de l'API
  const student = studentsData[id as keyof typeof studentsData];
  
  if (!student) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Élève non trouvé</h2>
          <p className="text-muted-foreground mb-4">
            L'élève que vous recherchez n'existe pas
          </p>
          <Link to="/eleves">
            <Button>Retour aux élèves</Button>
          </Link>
        </div>
      </div>
    );
  }

  const riskLevel = getRiskLevel(student.riskScore);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center">
          <Link to="/eleves">
            <Button variant="outline" size="icon" className="mr-4">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{student.name}</h1>
            <p className="text-muted-foreground">Élève en {student.classroom}</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Rapport
          </Button>
          <Button>
            <AlertTriangle className="h-4 w-4 mr-2" />
            Signalement
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Profil</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarFallback className="text-xl">
                    {student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold">{student.name}</h3>
                <div className="flex items-center mt-2">
                  <Link to={`/classes/${student.classId}`}>
                    <Button variant="link" className="p-0 h-auto flex items-center">
                      <School className="h-4 w-4 mr-1" />
                      {student.classroom}
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">
                    Score de risque IA
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">{student.riskScore}%</span>
                      <RiskLevelBadge level={riskLevel} />
                    </div>
                    <Progress value={student.riskScore} className="h-2" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start">
                    <User className="h-4 w-4 mt-0.5 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Date de naissance</p>
                      <p className="text-sm font-medium">{student.birthdate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Info className="h-4 w-4 mt-0.5 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Adresse</p>
                      <p className="text-sm font-medium">{student.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Info className="h-4 w-4 mt-0.5 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Contact</p>
                      <p className="text-sm font-medium">{student.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Info className="h-4 w-4 mt-0.5 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Parent responsable</p>
                      <p className="text-sm font-medium">{student.parent}</p>
                      <p className="text-sm">{student.parentPhone}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue="overview">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Aperçu</TabsTrigger>
              <TabsTrigger value="alerts">Alertes</TabsTrigger>
              <TabsTrigger value="attendance">Présence</TabsTrigger>
              <TabsTrigger value="grades">Notes</TabsTrigger>
              <TabsTrigger value="behavior">Comportement</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Évolution du risque</CardTitle>
                    <CardDescription>
                      Score de risque IA au cours du temps
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={student.riskHistory}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#DC2626" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="#DC2626" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Area
                            type="monotone"
                            dataKey="score"
                            stroke="#DC2626"
                            fillOpacity={1}
                            fill="url(#colorRisk)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Assiduité</CardTitle>
                      <CardDescription>
                        Évolution des présences et absences
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={student.attendance}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="present" name="Présence (%)" fill="#1E40AF" />
                            <Bar dataKey="absent" name="Absence (%)" fill="#DC2626" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Notes</CardTitle>
                      <CardDescription>
                        Évolution de la moyenne générale
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsLineChart
                            data={student.grades}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis domain={[0, 20]} />
                            <Tooltip />
                            <Legend />
                            <Line
                              type="monotone"
                              dataKey="grade"
                              name="Moyenne /20"
                              stroke="#1E40AF"
                              activeDot={{ r: 8 }}
                            />
                          </RechartsLineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Alertes récentes</CardTitle>
                    <CardDescription>
                      {student.alerts.length} alertes générées par l'IA
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {student.alerts.map((alert) => (
                        <div key={alert.id} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                          <AlertTriangle className="h-5 w-5 text-danger mt-0.5" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium">{alert.title}</h4>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${getSeverityColor(alert.severity)}`}>
                                {alert.severity === "low" ? "Faible" : 
                                 alert.severity === "medium" ? "Moyen" : "Élevé"}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {alert.description}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              Détecté le {alert.date}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="alerts">
              <Card>
                <CardHeader>
                  <CardTitle>Alertes détectées</CardTitle>
                  <CardDescription>
                    Signaux détectés par le système d'IA
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {student.alerts.map((alert) => (
                      <div key={alert.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-base font-medium">{alert.title}</h4>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${getSeverityColor(alert.severity)}`}>
                            {alert.severity === "low" ? "Faible" : 
                             alert.severity === "medium" ? "Moyen" : "Élevé"}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {alert.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Détecté le {alert.date}</span>
                          <Button variant="link" size="sm" className="h-auto p-0">
                            Détails
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="attendance">
              <Card>
                <CardHeader>
                  <CardTitle>Suivi des présences</CardTitle>
                  <CardDescription>
                    Historique de l'assiduité de l'élève
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={student.attendance}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="present" name="Présence (%)" fill="#10B981" />
                        <Bar dataKey="absent" name="Absence (%)" fill="#DC2626" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="grades">
              <Card>
                <CardHeader>
                  <CardTitle>Évolution des notes</CardTitle>
                  <CardDescription>
                    Historique des résultats scolaires
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart
                        data={student.grades}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[0, 20]} />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="grade"
                          name="Moyenne /20"
                          stroke="#1E40AF"
                          strokeWidth={2}
                          dot={{ r: 5 }}
                          activeDot={{ r: 8 }}
                        />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-medium mb-2">Analyse</h4>
                    <p className="text-sm text-muted-foreground">
                      Les notes de l'élève montrent une tendance à la baisse significative depuis mars. Cette dégradation, combinée avec d'autres indicateurs, a contribué à l'augmentation du score de risque.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="behavior">
              <Card>
                <CardHeader>
                  <CardTitle>Remarques comportementales</CardTitle>
                  <CardDescription>
                    Observations des enseignants
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {student.behaviorReports.map((report) => (
                      <div key={report.id} className="p-4 border rounded-lg">
                        <div className="flex items-start">
                          <Info className="h-5 w-5 mt-0.5 mr-3 text-muted-foreground" />
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                              <h4 className="text-sm font-medium">{report.reporter}</h4>
                              <span className="text-xs text-muted-foreground">
                                {report.date}
                              </span>
                            </div>
                            <p className="text-sm mt-2">
                              {report.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
