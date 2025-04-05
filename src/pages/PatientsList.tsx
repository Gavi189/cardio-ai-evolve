
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { patientsData } from "@/data/patients";
import PatientListHeader from "@/components/patients/PatientListHeader";
import PatientSearch from "@/components/patients/PatientSearch";
import PatientsTable from "@/components/patients/PatientsTable";

export default function PatientsList() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredPatients = searchQuery 
    ? patientsData.filter(patient => 
        patient.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : patientsData;

  return (
    <div className="space-y-6">
      <PatientListHeader />

      <Card>
        <CardContent className="pt-6">
          <PatientSearch 
            searchQuery={searchQuery} 
            onSearchChange={setSearchQuery} 
          />

          <PatientsTable patients={filteredPatients} />

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
