
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

// Sample data for statistics
const monthlyData = [
  { name: "Jan", alerts: 12, resolved: 10 },
  { name: "Fév", alerts: 15, resolved: 13 },
  { name: "Mar", alerts: 18, resolved: 15 },
  { name: "Avr", alerts: 22, resolved: 18 },
  { name: "Mai", alerts: 20, resolved: 17 },
  { name: "Juin", alerts: 25, resolved: 21 },
];

const typeData = [
  { name: "Verbale", value: 35 },
  { name: "Physique", value: 20 },
  { name: "Sociale", value: 25 },
  { name: "Cyber", value: 15 },
  { name: "Autre", value: 5 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#9146FF"];

const classData = [
  { name: "6ème A", cases: 3 },
  { name: "6ème B", cases: 5 },
  { name: "5ème A", cases: 8 },
  { name: "5ème B", cases: 4 },
  { name: "4ème A", cases: 12 },
  { name: "4ème B", cases: 6 },
  { name: "3ème A", cases: 10 },
  { name: "3ème B", cases: 7 },
];

const Statistics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Statistiques</h1>
        <p className="text-muted-foreground">
          Visualisez les tendances et patterns des cas de harcèlement
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="types">Types d'incidents</TabsTrigger>
          <TabsTrigger value="classes">Par classe</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Évolution mensuelle</CardTitle>
              <CardDescription>
                Nombre d'alertes et de cas résolus par mois
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={monthlyData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorAlerts" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1E40AF" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#1E40AF" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="alerts"
                      name="Alertes"
                      stroke="#1E40AF"
                      fillOpacity={1}
                      fill="url(#colorAlerts)"
                    />
                    <Area
                      type="monotone"
                      dataKey="resolved"
                      name="Résolus"
                      stroke="#10B981"
                      fillOpacity={1}
                      fill="url(#colorResolved)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Répartition par type</CardTitle>
                <CardDescription>
                  Distribution des incidents par catégorie
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={typeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {typeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Indicateurs clés</CardTitle>
                <CardDescription>
                  Métriques importantes à surveiller
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <h3 className="text-sm font-medium mb-2">Taux de résolution</h3>
                  <div className="flex items-center">
                    <div className="w-full bg-muted rounded-full h-2.5 mr-2">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Temps moyen de traitement</h3>
                  <div className="flex items-center">
                    <div className="w-full bg-muted rounded-full h-2.5 mr-2">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "72%" }}></div>
                    </div>
                    <span className="text-sm font-medium">3.2j</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Efficacité des interventions</h3>
                  <div className="flex items-center">
                    <div className="w-full bg-muted rounded-full h-2.5 mr-2">
                      <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "78%" }}></div>
                    </div>
                    <span className="text-sm font-medium">78%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="types">
          <Card>
            <CardHeader>
              <CardTitle>Analyse par type d'incident</CardTitle>
              <CardDescription>
                Détails sur chaque catégorie de harcèlement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={typeData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {typeData.map((entry, index) => (
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
        </TabsContent>
        
        <TabsContent value="classes">
          <Card>
            <CardHeader>
              <CardTitle>Répartition par classe</CardTitle>
              <CardDescription>
                Nombre de cas signalés par classe
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={classData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="cases" name="Nombre de cas" fill="#1E40AF" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Statistics;
