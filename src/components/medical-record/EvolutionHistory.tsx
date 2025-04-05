
import { FileEdit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const EvolutionHistory = () => {
  const records = [
    {
      id: 1,
      date: "22/03/2025",
      time: "10:15",
      doctor: "Dr. Rafael Costa",
      brief: "Paciente apresentou melhora nos níveis pressóricos após ajuste da medicação...",
    },
    {
      id: 2,
      date: "15/02/2025",
      time: "09:30",
      doctor: "Dr. Rafael Costa",
      brief: "Paciente com queixas de dor precordial aos grandes esforços...",
    },
    {
      id: 3,
      date: "10/01/2025",
      time: "11:00",
      doctor: "Dr. Rafael Costa",
      brief: "Primeira consulta. Paciente com histórico familiar de cardiopatias...",
    },
  ];

  return (
    <div className="space-y-4">
      {records.map((record) => (
        <Card key={record.id} className="card-hover">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-medium">{record.date} - {record.time}</div>
                <div className="text-sm text-muted-foreground mb-2">{record.doctor}</div>
                <p className="text-sm line-clamp-2">{record.brief}</p>
              </div>
              <Button variant="outline" size="sm">
                <FileEdit className="h-4 w-4 mr-2" />
                Ver
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
