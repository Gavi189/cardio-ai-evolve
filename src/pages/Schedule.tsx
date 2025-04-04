
import { useState } from "react";
import { Calendar, Clock, CalendarDays, FileText, UserCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Appointment {
  id: number;
  patient: string;
  time: string;
  avatar: string;
  type: string;
  status: "scheduled" | "confirmed" | "canceled" | "completed";
}

export default function Schedule() {
  const { toast } = useToast();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedView, setSelectedView] = useState<string>("day");
  
  // Dados de exemplo para a agenda
  const appointments: Appointment[] = [
    { id: 1, patient: "Maria Silva", time: "09:00", avatar: "MS", type: "Consulta", status: "confirmed" },
    { id: 2, patient: "João Santos", time: "10:30", avatar: "JS", type: "Retorno", status: "scheduled" },
    { id: 3, patient: "Ana Oliveira", time: "13:00", avatar: "AO", type: "Exame", status: "confirmed" },
    { id: 4, patient: "Roberto Almeida", time: "14:30", avatar: "RA", type: "Consulta", status: "scheduled" },
    { id: 5, patient: "Carla Mendes", time: "16:00", avatar: "CM", type: "Procedimento", status: "scheduled" },
  ];

  const moveDate = (days: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + days);
    setCurrentDate(newDate);
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getStatusClass = (status: Appointment["status"]) => {
    switch (status) {
      case "confirmed": return "text-green-600 bg-green-50 border-green-200";
      case "canceled": return "text-red-600 bg-red-50 border-red-200";
      case "completed": return "text-blue-600 bg-blue-50 border-blue-200";
      default: return "text-yellow-600 bg-yellow-50 border-yellow-200";
    }
  };

  const getStatusText = (status: Appointment["status"]) => {
    switch (status) {
      case "confirmed": return "Confirmado";
      case "canceled": return "Cancelado";
      case "completed": return "Realizado";
      default: return "Agendado";
    }
  };

  const confirmAppointment = (id: number) => {
    toast({
      title: "Consulta confirmada",
      description: `A consulta #${id} foi confirmada com sucesso.`,
    });
  };

  const cancelAppointment = (id: number) => {
    toast({
      title: "Consulta cancelada",
      description: `A consulta #${id} foi cancelada.`,
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gradient-cardio mb-1">Agenda</h1>
          <p className="text-muted-foreground">Gerencie suas consultas e compromissos</p>
        </div>
        
        <Button className="bg-cardio-600 hover:bg-cardio-700">
          <Calendar className="h-4 w-4 mr-2" />
          Nova Consulta
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Calendário</CardTitle>
            <CardDescription>Visualize e gerencie seu calendário de atendimentos</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => moveDate(-1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">
              {formatDate(currentDate)}
            </span>
            <Button variant="outline" size="sm" onClick={() => moveDate(1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Select value={selectedView} onValueChange={setSelectedView}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Visualização" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Dia</SelectItem>
                <SelectItem value="week">Semana</SelectItem>
                <SelectItem value="month">Mês</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-md">
              <div className="grid grid-cols-12 border-b text-xs font-medium p-2 bg-muted/30">
                <div className="col-span-1">Horário</div>
                <div className="col-span-3">Paciente</div>
                <div className="col-span-2">Tipo</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-4 text-right">Ações</div>
              </div>
              
              {appointments.length > 0 ? (
                <div className="divide-y">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="grid grid-cols-12 items-center p-3">
                      <div className="col-span-1 flex items-center">
                        <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span>{appointment.time}</span>
                      </div>
                      <div className="col-span-3 flex items-center">
                        <div className="bg-cardio-100 h-8 w-8 rounded-full flex items-center justify-center text-cardio-700 font-medium mr-2">
                          {appointment.avatar}
                        </div>
                        <span>{appointment.patient}</span>
                      </div>
                      <div className="col-span-2">{appointment.type}</div>
                      <div className="col-span-2">
                        <span className={`text-xs px-2 py-1 rounded-full border ${getStatusClass(appointment.status)}`}>
                          {getStatusText(appointment.status)}
                        </span>
                      </div>
                      <div className="col-span-4 flex justify-end space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-cardio-600"
                          onClick={() => confirmAppointment(appointment.id)}
                        >
                          Confirmar
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-600"
                          onClick={() => cancelAppointment(appointment.id)}
                        >
                          Cancelar
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  <CalendarDays className="h-12 w-12 mx-auto mb-3 text-muted" />
                  <p>Nenhuma consulta agendada para hoje</p>
                  <Button variant="link" className="mt-2 text-cardio-600">
                    Agendar nova consulta
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarDays className="h-5 w-5 mr-2 text-cardio-600" />
              Próximos dias
            </CardTitle>
            <CardDescription>
              Visualize os próximos atendimentos agendados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[0, 1, 2].map((dayOffset) => {
                const date = new Date(currentDate);
                date.setDate(currentDate.getDate() + dayOffset);
                
                return (
                  <Card key={dayOffset} className="border border-border">
                    <CardHeader className="py-3 px-4 bg-muted/20 border-b">
                      <p className="text-sm font-medium">
                        {date.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'short' })}
                      </p>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="divide-y">
                        {dayOffset === 0 ? (
                          appointments.slice(0, 3).map((appointment) => (
                            <div key={appointment.id} className="p-3 flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <div className="bg-cardio-100 h-8 w-8 rounded-full flex items-center justify-center text-cardio-700 font-medium">
                                  {appointment.avatar}
                                </div>
                                <div>
                                  <p className="text-sm font-medium">{appointment.patient}</p>
                                  <div className="flex items-center text-xs text-muted-foreground">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {appointment.time}
                                  </div>
                                </div>
                              </div>
                              <span className={`text-xs px-2 py-1 rounded-full border ${getStatusClass(appointment.status)}`}>
                                {getStatusText(appointment.status)}
                              </span>
                            </div>
                          ))
                        ) : (
                          <div className="p-4 text-center text-muted-foreground">
                            <p className="text-sm">Nenhuma consulta agendada</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserCircle className="h-5 w-5 mr-2 text-cardio-600" />
              Pacientes Frequentes
            </CardTitle>
            <CardDescription>
              Pacientes com mais consultas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Maria Silva", count: 12, avatar: "MS" },
                { name: "Carlos Pereira", count: 8, avatar: "CP" },
                { name: "Ana Oliveira", count: 7, avatar: "AO" },
                { name: "Roberto Almeida", count: 5, avatar: "RA" },
              ].map((patient, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-cardio-100 h-8 w-8 rounded-full flex items-center justify-center text-cardio-700 font-medium">
                      {patient.avatar}
                    </div>
                    <span>{patient.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {patient.count} consultas
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
