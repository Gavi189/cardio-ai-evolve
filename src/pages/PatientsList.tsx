
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { patientsData } from "@/data/patients";
import PatientListHeader from "@/components/patients/PatientListHeader";
import PatientSearch from "@/components/patients/PatientSearch";
import PatientsTable from "@/components/patients/PatientsTable";
import PatientCard from "@/components/patients/PatientCard";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Grid, List } from "lucide-react";

export default function PatientsList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  
  const isDesktop = useMediaQuery("(min-width: 768px)");
  
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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <PatientSearch 
              searchQuery={searchQuery} 
              onSearchChange={setSearchQuery} 
            />
            
            {isDesktop && (
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "card" ? "default" : "outline"}
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setViewMode("card")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "table" ? "default" : "outline"}
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setViewMode("table")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {viewMode === "card" || !isDesktop ? (
            <div className="space-y-4">
              {filteredPatients.map((patient) => (
                <PatientCard key={patient.id} patient={patient} />
              ))}
              
              {filteredPatients.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  Nenhum paciente encontrado
                </div>
              )}
            </div>
          ) : (
            <>
              <PatientsTable patients={filteredPatients} />
              
              {filteredPatients.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  Nenhum paciente encontrado
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
