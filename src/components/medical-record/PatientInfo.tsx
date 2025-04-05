
import { Plus, CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DiagnosticHypothesis } from "@/types/patient";

interface PatientInfoProps {
  patient: {
    id: number;
    name: string;
    age: number;
    gender: string;
    cpf: string;
    phone: string;
    email: string;
    address: string;
    insurance: string;
    insuranceNumber: string;
    allergies: string;
    comorbidities: string;
    lastVisit: string;
  };
  diagnosticHypothesis: DiagnosticHypothesis;
  setDiagnosticHypothesis: React.Dispatch<React.SetStateAction<DiagnosticHypothesis>>;
}

export const PatientInfo = ({ patient, diagnosticHypothesis, setDiagnosticHypothesis }: PatientInfoProps) => {
  return (
    <>
      <CardHeader className="pb-1">
        <CardTitle className="flex items-center text-lg">
          <div className="h-5 w-5 mr-2 text-cardio-600" />
          Informações do Paciente
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-medium">{patient.name}</h3>
              <p className="text-muted-foreground text-sm">{patient.age} anos, {patient.gender}</p>
            </div>
            <div className="text-sm flex items-center">
              <CalendarClock className="h-4 w-4 mr-1 text-cardio-600" />
              <span>Última Consulta: {patient.lastVisit}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">CPF:</span>
              <span>{patient.cpf}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Telefone:</span>
              <span>{patient.phone}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Email:</span>
              <span className="truncate max-w-[200px]">{patient.email}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Convênio:</span>
              <span>{patient.insurance}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Nº Carteirinha:</span>
              <span>{patient.insuranceNumber}</span>
            </div>
          </div>
          
          <div className="pt-2">
            <p className="text-sm font-medium mb-1">Hipótese Diagnóstica:</p>
            <div className="flex flex-col space-y-2">
              <Input 
                placeholder="Ex: Angina instável" 
                value={diagnosticHypothesis.description} 
                onChange={(e) => setDiagnosticHypothesis(prev => ({
                  ...prev, 
                  description: e.target.value
                }))}
              />
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">CID-10:</span>
                <Input 
                  className="max-w-[100px]"
                  placeholder="Ex: I20.0" 
                  value={diagnosticHypothesis.icdCode} 
                  onChange={(e) => setDiagnosticHypothesis(prev => ({
                    ...prev, 
                    icdCode: e.target.value
                  }))}
                />
              </div>
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium mb-1">Alergias:</p>
            <p className="text-sm bg-red-50 text-red-800 p-2 rounded-md">
              {patient.allergies}
            </p>
          </div>
          
          <div>
            <p className="text-sm font-medium mb-1">Comorbidades:</p>
            <p className="text-sm bg-blue-50 text-blue-800 p-2 rounded-md">
              {patient.comorbidities}
            </p>
          </div>
          
          <Button variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Ver Detalhes Completos
          </Button>
        </div>
      </CardContent>
    </>
  );
};
