
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem 
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Sample data for students - this would come from an API in a real app
const studentsData = [
  { id: "s1", name: "Lucas Martin", classroom: "3ème A" },
  { id: "s2", name: "Emma Dubois", classroom: "4ème B" },
  { id: "s3", name: "Thomas Klein", classroom: "5ème C" },
  { id: "s4", name: "Chloé Dupont", classroom: "3ème B" },
  { id: "s5", name: "Nathan Bernard", classroom: "6ème A" },
  { id: "s6", name: "Léa Moreau", classroom: "4ème A" },
  { id: "s7", name: "Hugo Lambert", classroom: "5ème B" },
  { id: "s8", name: "Zoé Richard", classroom: "6ème B" },
  { id: "s9", name: "Mathis Leroy", classroom: "3ème A" },
  { id: "s10", name: "Camille Petit", classroom: "4ème B" },
  { id: "s11", name: "Jules Girard", classroom: "5ème C" },
  { id: "s12", name: "Inès Mercier", classroom: "6ème A" },
];

type StudentSearchProps = {
  onSelect: (student: { id: string; name: string; classroom: string }) => void;
  placeholder?: string;
};

const StudentSearch = ({ onSelect, placeholder = "Rechercher un élève..." }: StudentSearchProps) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStudents, setFilteredStudents] = useState(studentsData);

  useEffect(() => {
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase();
      setFilteredStudents(
        studentsData.filter((student) => 
          student.name.toLowerCase().includes(lowercaseQuery) || 
          student.classroom.toLowerCase().includes(lowercaseQuery)
        )
      );
    } else {
      setFilteredStudents(studentsData);
    }
  }, [searchQuery]);

  const selectedStudent = studentsData.find(student => student.id === selectedValue);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedStudent ? selectedStudent.name : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput 
            placeholder="Rechercher par nom ou classe..." 
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandEmpty>Aucun élève trouvé.</CommandEmpty>
          <CommandGroup className="max-h-60 overflow-auto">
            {filteredStudents.map((student) => (
              <CommandItem
                key={student.id}
                value={student.id}
                onSelect={(currentValue) => {
                  setSelectedValue(currentValue);
                  const selected = studentsData.find(s => s.id === currentValue);
                  if (selected) {
                    onSelect(selected);
                  }
                  setOpen(false);
                }}
              >
                <CheckIcon
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedValue === student.id ? "opacity-100" : "opacity-0"
                  )}
                />
                <div className="flex flex-col">
                  <span>{student.name}</span>
                  <span className="text-xs text-muted-foreground">{student.classroom}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StudentSearch;
