
import { Patient } from "@/types/patient";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Clock, FileText } from "lucide-react";
import { getRiskBadgeClass } from "@/utils/riskBadgeUtils";

interface PatientCardProps {
  patient: Patient;
}

const PatientCard = ({ patient }: PatientCardProps) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // Function to determine if a value is normal, elevated, or low
  const getStatusClass = (value: string, type: string) => {
    if (type === "bp") {
      const systolic = parseInt(value.split("/")[0]);
      if (systolic >= 140) return "text-red-600";
      if (systolic >= 120) return "text-yellow-600";
      return "text-green-600";
    }
    
    if (type === "hr") {
      const hr = parseInt(value);
      if (hr > 100) return "text-red-600";
      if (hr < 60) return "text-yellow-600";
      return "text-green-600";
    }
    
    if (type === "spo2") {
      const spo2 = parseInt(value);
      if (spo2 < 95) return "text-red-600";
      return "text-green-600";
    }
    
    if (type === "temp") {
      const temp = parseFloat(value);
      if (temp > 37.5) return "text-red-600";
      if (temp < 36.0) return "text-yellow-600";
      return "text-green-600";
    }
    
    return "text-green-600";
  };

  const getStatusText = (type: string, className: string) => {
    if (className === "text-red-600") return "Elevada";
    if (className === "text-yellow-600") return "Atenção";
    return "Normal";
  };

  // Generate fake vital signs based on patient risk
  const vitalSigns = {
    bloodPressure: patient.risk === "Alto" ? "140/90" : patient.risk === "Médio" ? "130/85" : "120/80",
    heartRate: patient.risk === "Alto" ? "88" : patient.risk === "Médio" ? "78" : "68",
    oxygenSaturation: patient.risk === "Alto" ? "97" : "99",
    temperature: patient.risk === "Alto" ? "36.5" : "36.2"
  };

  // Generate diagnostic hypotheses based on patient risk
  const diagnosticHypotheses = [
    patient.risk === "Alto" ? "Doença Arterial Coronariana" : 
    patient.risk === "Médio" ? "Hipertensão" : "Checkup de rotina"
  ];

  const bpClass = getStatusClass(vitalSigns.bloodPressure, "bp");
  const hrClass = getStatusClass(vitalSigns.heartRate, "hr");
  const spo2Class = getStatusClass(vitalSigns.oxygenSaturation, "spo2");
  const tempClass = getStatusClass(vitalSigns.temperature, "temp");

  return (
    <Card className="w-full mb-4 hover:shadow-md transition-all">
      <CardContent className="p-0">
        <div className="flex flex-col">
          {/* Patient header */}
          <div className="flex items-center p-4 border-b">
            <Avatar className="h-9 w-9 mr-3">
              <AvatarFallback>{getInitials(patient.name)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-base">{patient.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {patient.age} anos • {patient.gender === "M" ? "Masculino" : "Feminino"} 
                    {patient.id && ` • Prontuário #${patient.id}`}
                  </p>
                </div>
                <Button variant="outline" size="sm" className="text-xs h-7">
                  Ver Histórico Completo
                </Button>
              </div>
            </div>
          </div>

          {/* Vital signs */}
          <div className="grid grid-cols-4 gap-px bg-muted/20">
            <div className="bg-white p-3">
              <p className="text-xs text-muted-foreground mb-1 flex justify-between">
                <span>Pressão Arterial</span>
                <span className={bpClass}>{getStatusText("bp", bpClass)}</span>
              </p>
              <p className="text-lg font-semibold">
                {vitalSigns.bloodPressure} <span className="text-xs font-normal">mmHg</span>
              </p>
            </div>
            <div className="bg-white p-3">
              <p className="text-xs text-muted-foreground mb-1 flex justify-between">
                <span>Frequência Cardíaca</span>
                <span className={hrClass}>{getStatusText("hr", hrClass)}</span>
              </p>
              <p className="text-lg font-semibold">
                {vitalSigns.heartRate} <span className="text-xs font-normal">bpm</span>
              </p>
            </div>
            <div className="bg-white p-3">
              <p className="text-xs text-muted-foreground mb-1 flex justify-between">
                <span>Saturação O²</span>
                <span className={spo2Class}>{getStatusText("spo2", spo2Class)}</span>
              </p>
              <p className="text-lg font-semibold">
                {vitalSigns.oxygenSaturation} <span className="text-xs font-normal">%</span>
              </p>
            </div>
            <div className="bg-white p-3">
              <p className="text-xs text-muted-foreground mb-1 flex justify-between">
                <span>Temperatura</span>
                <span className={tempClass}>{getStatusText("temp", tempClass)}</span>
              </p>
              <p className="text-lg font-semibold">
                {vitalSigns.temperature} <span className="text-xs font-normal">°C</span>
              </p>
            </div>
          </div>

          {/* Diagnostic hypothesis and last visit */}
          <div className="grid grid-cols-2">
            <div className="p-3 border-r">
              <h4 className="text-sm font-medium mb-2">Hipótese Diagnóstica</h4>
              <div className="space-y-2">
                {diagnosticHypotheses.map((diagnosis, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Badge variant="outline" className="bg-blue-50 text-blue-800 hover:bg-blue-100">
                      {diagnosis}
                    </Badge>
                    {patient.risk === "Alto" && index === 0 && (
                      <Badge variant="outline" className="bg-red-50 text-red-800 hover:bg-red-100">+1</Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="p-3">
              <h4 className="text-sm font-medium mb-2">Última Consulta</h4>
              <div className="text-sm text-muted-foreground">
                <div className="flex items-center gap-1 mb-1">
                  <Clock className="h-3 w-3" />
                  <span>{patient.lastVisit}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FileText className="h-3 w-3" />
                  <span>10:30 - Consulta de rotina</span>
                </div>
              </div>
            </div>
          </div>

          {/* Risk and actions */}
          <div className="flex justify-between items-center p-3 bg-gray-50">
            <Badge variant="secondary" className={getRiskBadgeClass(patient.risk)}>
              Risco {patient.risk}
            </Badge>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="h-8">Prontuário</Button>
              <Button size="sm" className="h-8 bg-cardio-600 hover:bg-cardio-700">Agendar</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientCard;
