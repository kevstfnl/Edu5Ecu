
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { AlertTriangle, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const reportFormSchema = z.object({
  studentName: z.string().min(2, {
    message: "Le nom de l'élève doit contenir au moins 2 caractères",
  }),
  studentClass: z.string({
    required_error: "Veuillez sélectionner une classe",
  }),
  reportType: z.string({
    required_error: "Veuillez sélectionner un type de signalement",
  }),
  description: z.string().min(10, {
    message: "La description doit contenir au moins 10 caractères",
  }),
  date: z.string(),
});

type ReportFormValues = z.infer<typeof reportFormSchema>;

const defaultValues: Partial<ReportFormValues> = {
  date: new Date().toISOString().split("T")[0],
};

const ReportForm = () => {
  const { toast } = useToast();
  
  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportFormSchema),
    defaultValues,
  });

  function onSubmit(data: ReportFormValues) {
    toast({
      title: "Signalement envoyé",
      description: "Votre signalement a été transmis et sera traité prochainement",
    });
    console.log(data);
    form.reset();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Signalement</h1>
        <p className="text-muted-foreground">
          Signalez un cas de harcèlement ou un comportement préoccupant
        </p>
      </div>

      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Formulaire de signalement</CardTitle>
          <CardDescription>
            Les informations fournies seront traitées avec confidentialité
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-5 p-4 bg-warning/10 rounded-lg border border-warning/20 flex items-start">
            <AlertTriangle className="h-5 w-5 text-warning mr-3 mt-0.5" />
            <div>
              <h4 className="font-medium text-warning mb-1">Important</h4>
              <p className="text-sm text-muted-foreground">
                Ce formulaire est destiné à signaler tout comportement qui pourrait indiquer un cas de harcèlement scolaire.
              </p>
            </div>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="studentName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom de l'élève concerné</FormLabel>
                      <FormControl>
                        <Input placeholder="Nom et prénom" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="studentClass"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Classe</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une classe" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="6A">6ème A</SelectItem>
                          <SelectItem value="6B">6ème B</SelectItem>
                          <SelectItem value="5A">5ème A</SelectItem>
                          <SelectItem value="5B">5ème B</SelectItem>
                          <SelectItem value="4A">4ème A</SelectItem>
                          <SelectItem value="4B">4ème B</SelectItem>
                          <SelectItem value="3A">3ème A</SelectItem>
                          <SelectItem value="3B">3ème B</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="reportType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type de signalement</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="physical">Agression physique</SelectItem>
                        <SelectItem value="verbal">Agression verbale</SelectItem>
                        <SelectItem value="social">Isolement social</SelectItem>
                        <SelectItem value="cyber">Cyber-harcèlement</SelectItem>
                        <SelectItem value="behavior">Changement de comportement</SelectItem>
                        <SelectItem value="other">Autre préoccupation</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date de l'observation</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description détaillée</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Décrivez la situation observée avec le plus de détails possible..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Incluez des exemples concrets de comportements, paroles ou interactions
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Link to="/">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Annuler
                  </Button>
                </Link>
                <Button type="submit" className="w-full sm:w-auto">
                  <FileText className="h-4 w-4 mr-2" />
                  Soumettre le signalement
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportForm;
