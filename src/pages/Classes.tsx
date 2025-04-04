
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ClassCard from "@/components/classes/ClassCard";
import { FileBarChart, Search } from "lucide-react";

// Données simulées
const classes = [
  {
    id: "c1",
    name: "6ème A",
    grade: "Collège - Sixième",
    level: 12,
    studentsCount: 28,
    alertsCount: 3,
  },
  {
    id: "c2",
    name: "6ème B",
    grade: "Collège - Sixième",
    level: 8,
    studentsCount: 30,
    alertsCount: 2,
  },
  {
    id: "c3",
    name: "5ème A",
    grade: "Collège - Cinquième",
    level: 15,
    studentsCount: 26,
    alertsCount: 4,
  },
  {
    id: "c4",
    name: "5ème B",
    grade: "Collège - Cinquième",
    level: 32,
    studentsCount: 27,
    alertsCount: 9,
  },
  {
    id: "c5",
    name: "4ème A",
    grade: "Collège - Quatrième",
    level: 10,
    studentsCount: 29,
    alertsCount: 3,
  },
  {
    id: "c6",
    name: "4ème B",
    grade: "Collège - Quatrième",
    level: 18,
    studentsCount: 28,
    alertsCount: 5,
  },
  {
    id: "c7",
    name: "3ème A",
    grade: "Collège - Troisième",
    level: 25,
    studentsCount: 30,
    alertsCount: 7,
  },
  {
    id: "c8",
    name: "3ème B",
    grade: "Collège - Troisième",
    level: 40,
    studentsCount: 29,
    alertsCount: 12,
  },
];

const Classes = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Classes</h1>
        <p className="text-muted-foreground">
          Gestion et suivi des classes de l'établissement
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Classes</CardTitle>
            <FileBarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{classes.length}</div>
            <p className="text-xs text-muted-foreground">
              Classes suivies par le système
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Niveau moyen</CardTitle>
            <FileBarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                classes.reduce((acc, c) => acc + c.level, 0) / classes.length
              )}%
            </div>
            <p className="text-xs text-muted-foreground">
              Niveau de risque moyen
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total élèves</CardTitle>
            <FileBarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {classes.reduce((acc, c) => acc + c.studentsCount, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Élèves surveillés par le système
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total alertes</CardTitle>
            <FileBarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {classes.reduce((acc, c) => acc + c.alertsCount, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Alertes actives générées
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une classe..."
            className="pl-8"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Niveau" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les niveaux</SelectItem>
            <SelectItem value="6">Sixième</SelectItem>
            <SelectItem value="5">Cinquième</SelectItem>
            <SelectItem value="4">Quatrième</SelectItem>
            <SelectItem value="3">Troisième</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Risque" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les risques</SelectItem>
            <SelectItem value="low">Risque faible</SelectItem>
            <SelectItem value="medium">Risque moyen</SelectItem>
            <SelectItem value="high">Risque élevé</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {classes.map((cls) => (
          <ClassCard key={cls.id} {...cls} />
        ))}
      </div>
    </div>
  );
};

export default Classes;
