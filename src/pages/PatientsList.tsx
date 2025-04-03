
import { useState } from "react";
import { 
  FileEdit, Filter, Heart, Plus, Search, UserRound 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

type Patient = {
  id: number;
  name: string;
  age: number;
  gender: "M" | "F";
  phone: string;
  lastVisit: string;
  risk: "Baixo" | "Médio" | "Alto";
};

export default function PatientsList() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const patients: Patient[] = [
    { 
      id: 1, 
      name: "Maria Silva", 
      age: 64, 
      gender: "F", 
      phone: "(11) 98765-4321", 
      lastVisit: "22/03/2025",
      risk: "Alto" 
    },
    { 
      id: 2, 
      name: "João Santos", 
      age: 58, 
      gender: "M", 
      phone: "(11) 91234-5678", 
      lastVisit: "18/03/2025",
      risk: "Médio"
    },
    { 
      id: 3, 
      name: "Ana Oliveira", 
      age: 72, 
      gender: "F", 
      phone: "(11) 99876-5432", 
      lastVisit: "15/03/2025",
      risk: "Alto"
    },
    { 
      id: 4, 
      name: "Carlos Pereira", 
      age: 55, 
      gender: "M", 
      phone: "(11) 95555-1234", 
      lastVisit: "12/03/2025",
      risk: "Baixo"
    },
    { 
      id: 5, 
      name: "Lucia Mendes", 
      age: 67, 
      gender: "F", 
      phone: "(11) 96666-7890", 
      lastVisit: "10/03/2025",
      risk: "Médio"
    },
    { 
      id: 6, 
      name: "Paulo Ferreira", 
      age: 70, 
      gender: "M", 
      phone: "(11) 93333-4444", 
      lastVisit: "05/03/2025",
      risk: "Alto"
    },
  ];
  
  const filteredPatients = searchQuery 
    ? patients.filter(patient => 
        patient.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : patients;

  const getRiskBadgeClass = (risk: string) => {
    switch(risk) {
      case "Baixo": return "bg-green-100 text-green-800 hover:bg-green-200";
      case "Médio": return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "Alto": return "bg-red-100 text-red-800 hover:bg-red-200";
      default: return "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gradient-cardio mb-1">Pacientes</h1>
          <p className="text-muted-foreground">Gerenciamento de pacientes e histórico clínico</p>
        </div>
        
        <Button className="bg-cardio-600 hover:bg-cardio-700">
          <Plus className="h-4 w-4 mr-2" />
          Novo Paciente
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar pacientes..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex gap-2">
              <Filter className="h-4 w-4" />
              Filtrar
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Nome</TableHead>
                  <TableHead>Idade</TableHead>
                  <TableHead>Gênero</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Última Consulta</TableHead>
                  <TableHead>Risco</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">{patient.name}</TableCell>
                    <TableCell>{patient.age} anos</TableCell>
                    <TableCell>{patient.gender === "M" ? "Masculino" : "Feminino"}</TableCell>
                    <TableCell>{patient.phone}</TableCell>
                    <TableCell>{patient.lastVisit}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getRiskBadgeClass(patient.risk)}>
                        {patient.risk}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <UserRound className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer">
                            <FileEdit className="h-4 w-4 mr-2" />
                            Prontuário
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Heart className="h-4 w-4 mr-2" />
                            Calcular Risco
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredPatients.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum paciente encontrado
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
