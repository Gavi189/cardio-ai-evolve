
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Patient } from "@/types/patient";
import { getRiskBadgeClass } from "@/utils/riskBadgeUtils";
import PatientActions from "./PatientActions";
import { FileText } from "lucide-react";

type PatientsTableProps = {
  patients: Patient[];
};

const PatientsTable = ({ patients }: PatientsTableProps) => {
  // Function to generate a diagnostic hypothesis based on patient risk
  const getDiagnosticHypothesis = (risk: Patient['risk']) => {
    switch(risk) {
      case "Alto": return "Doença Arterial Coronariana";
      case "Médio": return "Hipertensão";
      default: return "Checkup de rotina";
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Nome</TableHead>
            <TableHead>Idade</TableHead>
            <TableHead>Gênero</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Hipótese Diagnóstica</TableHead>
            <TableHead>Última Consulta</TableHead>
            <TableHead>Risco</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell className="font-medium">{patient.name}</TableCell>
              <TableCell>{patient.age} anos</TableCell>
              <TableCell>{patient.gender === "M" ? "Masculino" : "Feminino"}</TableCell>
              <TableCell>{patient.phone}</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-blue-50 text-blue-800 hover:bg-blue-100">
                  {getDiagnosticHypothesis(patient.risk)}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  <div>{patient.lastVisit}</div>
                  <div className="text-muted-foreground flex items-center gap-1 text-xs">
                    <FileText className="h-3 w-3" />
                    10:30 - Consulta de rotina
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary" className={getRiskBadgeClass(patient.risk)}>
                  {patient.risk}
                </Badge>
              </TableCell>
              <TableCell>
                <PatientActions />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PatientsTable;
