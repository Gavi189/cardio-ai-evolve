
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

type PatientsTableProps = {
  patients: Patient[];
};

const PatientsTable = ({ patients }: PatientsTableProps) => {
  return (
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
          {patients.map((patient) => (
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
