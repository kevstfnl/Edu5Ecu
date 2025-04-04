
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import StudentRow from "@/components/students/StudentRow";

// Données simulées
const students = [
  {
    id: "s1",
    name: "Lucas Martin",
    classroom: "3ème A",
    riskScore: 78,
    alerts: 3,
    lastActivity: "Aujourd'hui"
  },
  {
    id: "s2",
    name: "Emma Dubois",
    classroom: "4ème B",
    riskScore: 65,
    alerts: 2,
    lastActivity: "Hier"
  },
  {
    id: "s3",
    name: "Thomas Klein",
    classroom: "5ème C",
    riskScore: 52,
    alerts: 1,
    lastActivity: "Il y a 2 jours"
  },
  {
    id: "s4",
    name: "Chloé Dupont",
    classroom: "3ème B",
    riskScore: 42,
    alerts: 1,
    lastActivity: "Aujourd'hui"
  },
  {
    id: "s5",
    name: "Nathan Bernard",
    classroom: "6ème A",
    riskScore: 38,
    alerts: 1,
    lastActivity: "Il y a 1 semaine"
  },
  {
    id: "s6",
    name: "Léa Moreau",
    classroom: "4ème A",
    riskScore: 32,
    alerts: 0,
    lastActivity: "Il y a 3 jours"
  },
  {
    id: "s7",
    name: "Hugo Lambert",
    classroom: "5ème B",
    riskScore: 28,
    alerts: 0,
    lastActivity: "Aujourd'hui"
  },
  {
    id: "s8",
    name: "Zoé Richard",
    classroom: "6ème B",
    riskScore: 25,
    alerts: 0,
    lastActivity: "Hier"
  },
  {
    id: "s9",
    name: "Mathis Leroy",
    classroom: "3ème A",
    riskScore: 18,
    alerts: 0,
    lastActivity: "Il y a 4 jours"
  },
  {
    id: "s10",
    name: "Camille Petit",
    classroom: "4ème B",
    riskScore: 12,
    alerts: 0,
    lastActivity: "Hier"
  },
  {
    id: "s11",
    name: "Jules Girard",
    classroom: "5ème C",
    riskScore: 8,
    alerts: 0,
    lastActivity: "Aujourd'hui"
  },
  {
    id: "s12",
    name: "Inès Mercier",
    classroom: "6ème A",
    riskScore: 5,
    alerts: 0,
    lastActivity: "Il y a 2 jours"
  }
];

const Students = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Élèves</h1>
        <p className="text-muted-foreground">
          Liste de tous les élèves de l'établissement
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un élève..."
            className="pl-8"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Classe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les classes</SelectItem>
            <SelectItem value="3A">3ème A</SelectItem>
            <SelectItem value="3B">3ème B</SelectItem>
            <SelectItem value="4A">4ème A</SelectItem>
            <SelectItem value="4B">4ème B</SelectItem>
            <SelectItem value="5A">5ème A</SelectItem>
            <SelectItem value="5B">5ème B</SelectItem>
            <SelectItem value="6A">6ème A</SelectItem>
            <SelectItem value="6B">6ème B</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Risque" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les risques</SelectItem>
            <SelectItem value="high">Risque élevé</SelectItem>
            <SelectItem value="medium">Risque moyen</SelectItem>
            <SelectItem value="low">Risque faible</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des élèves</CardTitle>
          <CardDescription>
            {students.length} élèves dans l'établissement
          </CardDescription>
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
                {students.map((student) => (
                  <StudentRow key={student.id} {...student} />
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Students;
