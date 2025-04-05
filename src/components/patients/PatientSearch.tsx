
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";

type PatientSearchProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
};

const PatientSearch = ({ searchQuery, onSearchChange }: PatientSearchProps) => {
  return (
    <div className="flex gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar pacientes..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Button variant="outline" className="flex gap-2">
        <Filter className="h-4 w-4" />
        Filtrar
      </Button>
    </div>
  );
};

export default PatientSearch;
