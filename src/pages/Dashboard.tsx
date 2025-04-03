
import { 
  BarChart, CalendarClock, Clock, FilePlus2, Heart, TrendingUp, User
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

export default function Dashboard() {
  const appointmentsData = [
    { month: 'Jan', count: 28 },
    { month: 'Fev', count: 35 },
    { month: 'Mar', count: 42 },
    { month: 'Abr', count: 38 },
    { month: 'Mai', count: 50 },
    { month: 'Jun', count: 45 },
    { month: 'Jul', count: 52 },
  ];

  const patientRiskData = [
    { name: 'Baixo', value: 40, color: '#10b981' },
    { name: 'Médio', value: 30, color: '#f59e0b' },
    { name: 'Alto', value: 30, color: '#ef4444' },
  ];

  const upcomingAppointments = [
    { id: 1, patient: "Maria Silva", time: "10:00", avatar: "MS", age: 64 },
    { id: 2, patient: "João Santos", time: "11:30", avatar: "JS", age: 58 },
    { id: 3, patient: "Ana Oliveira", time: "14:15", avatar: "AO", age: 72 },
  ];

  const patientSummary = {
    total: 348,
    new: 12,
    waiting: 5,
    critical: 8
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gradient-cardio mb-1">Dashboard</h1>
          <p className="text-muted-foreground">Bem-vindo, Dr. Rafael! Aqui está um resumo da sua clínica.</p>
        </div>
        
        <Button className="bg-cardio-600 hover:bg-cardio-700">
          <FilePlus2 className="h-4 w-4 mr-2" />
          Nova Consulta
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-hover">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-muted-foreground text-sm">Total de Pacientes</p>
              <p className="text-3xl font-bold mt-1">{patientSummary.total}</p>
              <p className="text-xs text-emerald-500 mt-1 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +4% este mês
              </p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-cardio-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-muted-foreground text-sm">Novos Pacientes</p>
              <p className="text-3xl font-bold mt-1">{patientSummary.new}</p>
              <p className="text-xs text-emerald-500 mt-1 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +2 na última semana
              </p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-muted-foreground text-sm">Em Espera</p>
              <p className="text-3xl font-bold mt-1">{patientSummary.waiting}</p>
              <p className="text-xs text-muted-foreground mt-1">Hoje</p>
            </div>
            <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
              <Clock className="h-6 w-6 text-amber-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-muted-foreground text-sm">Casos Críticos</p>
              <p className="text-3xl font-bold mt-1">{patientSummary.critical}</p>
              <p className="text-xs text-red-500 mt-1 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +2 esta semana
              </p>
            </div>
            <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
              <Heart className="h-6 w-6 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 card-hover">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart className="h-5 w-5 mr-2 text-cardio-600" />
              Consultas Realizadas
            </CardTitle>
            <CardDescription>Tendência dos últimos 7 meses</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={appointmentsData}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#0077ff" 
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="h-5 w-5 mr-2 text-cardio-600" />
              Distribuição de Risco
            </CardTitle>
            <CardDescription>Categorias de risco dos pacientes</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center h-80">
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={patientRiskData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label={(entry) => entry.name}
                  >
                    {patientRiskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-2 w-full mt-4">
              {patientRiskData.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-xs">{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center">
            <CalendarClock className="h-5 w-5 mr-2 text-cardio-600" />
            Próximas Consultas
          </CardTitle>
          <CardDescription>Consultas agendadas para hoje</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingAppointments.map((appointment) => (
              <div 
                key={appointment.id} 
                className="bg-muted/40 p-4 rounded-lg border border-border flex items-center gap-4"
              >
                <div className="bg-cardio-100 h-12 w-12 rounded-full flex items-center justify-center text-cardio-700 font-medium">
                  {appointment.avatar}
                </div>
                <div>
                  <h4 className="font-medium">{appointment.patient}</h4>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {appointment.time}
                    </span>
                    <span>{appointment.age} anos</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            <Button variant="outline" className="text-cardio-700">
              Ver agenda completa
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
