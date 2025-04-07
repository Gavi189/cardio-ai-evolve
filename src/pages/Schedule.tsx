
import { useState } from "react";
import { Calendar as CalendarIcon, Clock, CalendarDays, FileText, UserCircle, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Appointment {
  id: number;
  patient: string;
  time: string;
  avatar: string;
  description: string;
  type: "Consulta" | "Retorno" | "Exame";
  status: "confirmed" | "pending" | "canceled" | "completed";
}

// Simulated appointments for the month
const monthAppointments: Record<string, Appointment[]> = {
  "2025-04-07": [
    { id: 1, patient: "Maria Silva", time: "09:00", avatar: "MS", description: "Consulta de rotina", type: "Consulta", status: "confirmed" },
    { id: 2, patient: "João Oliveira", time: "10:30", avatar: "JO", description: "Eletrocardiograma", type: "Exame", status: "confirmed" },
    { id: 3, patient: "Ana Santos", time: "13:45", avatar: "AS", description: "Retorno", type: "Retorno", status: "pending" },
    { id: 4, patient: "Carlos Ferreira", time: "15:15", avatar: "CF", description: "Primeira consulta", type: "Consulta", status: "confirmed" },
  ],
  "2025-04-10": [
    { id: 5, patient: "Roberto Almeida", time: "14:30", avatar: "RA", description: "Consulta de rotina", type: "Consulta", status: "confirmed" },
    { id: 6, patient: "Carla Mendes", time: "16:00", avatar: "CM", description: "Resultado de exames", type: "Retorno", status: "confirmed" },
  ],
  "2025-04-15": [
    { id: 7, patient: "Paulo Souza", time: "08:00", avatar: "PS", description: "Ecocardiograma", type: "Exame", status: "confirmed" },
    { id: 8, patient: "Lúcia Pereira", time: "11:30", avatar: "LP", description: "Consulta de rotina", type: "Consulta", status: "confirmed" },
  ],
  "2025-04-21": [
    { id: 9, patient: "Fernando Costa", time: "10:00", avatar: "FC", description: "Retorno pós-exames", type: "Retorno", status: "confirmed" },
  ],
  "2025-04-24": [
    { id: 10, patient: "Júlia Rodrigues", time: "13:00", avatar: "JR", description: "Holter 24h", type: "Exame", status: "confirmed" },
  ],
};

export default function Schedule() {
  const { toast } = useToast();
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2025, 3, 7)); // April 7, 2025
  const [selectedView, setSelectedView] = useState<string>("day");
  
  // Get appointments for the selected day
  const formattedDate = format(currentDate, "yyyy-MM-dd");
  const appointments = monthAppointments[formattedDate] || [];

  // Function to check if a day has appointments (for the calendar)
  const hasDayAppointment = (day: Date): boolean => {
    const dateStr = format(day, "yyyy-MM-dd");
    return !!monthAppointments[dateStr];
  };

  // Function to handle date selection in the calendar
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setCurrentDate(date);
    }
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
      case "pending": return "Pendente";
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
          <CalendarIcon className="h-4 w-4 mr-2" />
          Nova Consulta
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Calendar Card */}
        <Card>
          <CardHeader>
            <CardTitle>Calendário</CardTitle>
            <CardDescription>Selecione uma data para ver os agendamentos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={currentDate}
                onSelect={handleDateSelect}
                className="rounded-md border w-full"
                locale={ptBR}
                modifiers={{
                  hasAppointment: (date) => hasDayAppointment(date),
                }}
                modifiersClassNames={{
                  hasAppointment: "bg-cardio-100 text-cardio-700 font-bold",
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Appointments Card */}
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>
                Consultas de {format(currentDate, "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </CardTitle>
              <CardDescription>
                {appointments.length} 
                {appointments.length === 1 ? ' consulta' : ' consultas'}
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => {
                const prevDay = new Date(currentDate);
                prevDay.setDate(currentDate.getDate() - 1);
                setCurrentDate(prevDay);
              }}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => {
                const nextDay = new Date(currentDate);
                nextDay.setDate(currentDate.getDate() + 1);
                setCurrentDate(nextDay);
              }}>
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
            {appointments.length > 0 ? (
              <div className="space-y-3">
                {appointments.map((appointment) => (
                  <div 
                    key={appointment.id} 
                    className="border rounded-md p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-cardio-100 h-12 w-12 rounded-full flex items-center justify-center text-cardio-700 font-medium shrink-0">
                        {appointment.avatar}
                      </div>
                      <div>
                        <h3 className="font-medium">{appointment.patient}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          {appointment.time} - {appointment.description}
                        </div>
                        <div className="mt-1">
                          <Badge variant="outline" className="bg-gray-50">
                            {appointment.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 md:items-center">
                      <Badge className={`mr-2 ${getStatusClass(appointment.status)}`}>
                        {getStatusText(appointment.status)}
                      </Badge>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-cardio-600 min-w-24"
                          onClick={() => confirmAppointment(appointment.id)}
                        >
                          Confirmar
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-600 min-w-20"
                          onClick={() => cancelAppointment(appointment.id)}
                        >
                          Cancelar
                        </Button>
                        <Button variant="outline" size="sm" className="px-2.5">
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">Ver</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-muted-foreground">
                <CalendarDays className="h-12 w-12 mx-auto mb-3 text-muted" />
                <p>Nenhuma consulta agendada para esta data</p>
                <Button variant="link" className="mt-2 text-cardio-600">
                  Agendar nova consulta
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

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
                const dateStr = format(date, "yyyy-MM-dd");
                const dayAppointments = monthAppointments[dateStr] || [];
                
                return (
                  <Card key={dayOffset} className="border border-border">
                    <CardHeader className="py-3 px-4 bg-muted/20 border-b">
                      <p className="text-sm font-medium">
                        {format(date, "EEEE, d 'de' MMM", { locale: ptBR })}
                      </p>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="divide-y">
                        {dayAppointments.length > 0 ? (
                          dayAppointments.slice(0, 3).map((appointment) => (
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
                              <Badge className={`text-xs px-2 py-1 rounded-full border ${getStatusClass(appointment.status)}`}>
                                {getStatusText(appointment.status)}
                              </Badge>
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
