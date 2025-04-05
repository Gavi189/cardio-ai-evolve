
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PatientListHeader = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-gradient-cardio mb-1">Pacientes</h1>
        <p className="text-muted-foreground">Gerenciamento de pacientes e histórico clínico</p>
      </div>
      
      <Button 
        className="bg-cardio-600 hover:bg-cardio-700"
        onClick={() => navigate("/patient-register")}
      >
        <Plus className="h-4 w-4 mr-2" />
        Novo Paciente
      </Button>
    </div>
  );
};

export default PatientListHeader;
