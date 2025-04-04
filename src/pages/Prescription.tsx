
import { useState } from "react";
import { FileText, Search, Filter, Download, Share2, Plus, Printer, File } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Prescription {
  id: number;
  patient: string;
  date: string;
  type: "medication" | "exam" | "certificate";
  description: string;
  status: "pending" | "delivered" | "expired";
}

export default function Prescription() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Dados de exemplo para receituários
  const prescriptions: Prescription[] = [
    { id: 1, patient: "Maria Silva", date: "04/04/2023", type: "medication", description: "Losartana 50mg - 30 comprimidos", status: "delivered" },
    { id: 2, patient: "João Santos", date: "03/04/2023", type: "medication", description: "Atorvastatina 20mg - 30 comprimidos", status: "pending" },
    { id: 3, patient: "Ana Oliveira", date: "02/04/2023", type: "exam", description: "Solicitação de ecocardiograma", status: "delivered" },
    { id: 4, patient: "Roberto Almeida", date: "01/04/2023", type: "certificate", description: "Atestado médico - 3 dias", status: "delivered" },
    { id: 5, patient: "Carla Mendes", date: "28/03/2023", type: "medication", description: "Varfarina 5mg - 30 comprimidos", status: "expired" },
    { id: 6, patient: "Paulo Sousa", date: "25/03/2023", type: "exam", description: "Solicitação de teste ergométrico", status: "pending" },
  ];

  const filteredPrescriptions = prescriptions.filter(prescription => {
    const matchesSearch = prescription.patient.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          prescription.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "medication") return matchesSearch && prescription.type === "medication";
    if (activeTab === "exam") return matchesSearch && prescription.type === "exam";
    if (activeTab === "certificate") return matchesSearch && prescription.type === "certificate";
    
    return false;
  });

  const getStatusClass = (status: Prescription["status"]) => {
    switch (status) {
      case "delivered": return "text-green-600 bg-green-50 border-green-200";
      case "expired": return "text-red-600 bg-red-50 border-red-200";
      default: return "text-yellow-600 bg-yellow-50 border-yellow-200";
    }
  };

  const getStatusText = (status: Prescription["status"]) => {
    switch (status) {
      case "delivered": return "Entregue";
      case "expired": return "Expirado";
      default: return "Pendente";
    }
  };

  const getTypeText = (type: Prescription["type"]) => {
    switch (type) {
      case "medication": return "Medicamento";
      case "exam": return "Exame";
      case "certificate": return "Atestado";
      default: return "";
    }
  };

  const printPrescription = (id: number) => {
    toast({
      title: "Imprimindo receituário",
      description: `Preparando impressão do receituário #${id}.`,
    });
  };

  const downloadPrescription = (id: number) => {
    toast({
      title: "Download iniciado",
      description: `O download do receituário #${id} foi iniciado.`,
    });
  };

  const sharePrescription = (id: number) => {
    toast({
      title: "Compartilhar receituário",
      description: `Opções de compartilhamento para o receituário #${id}.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gradient-cardio mb-1">Receituário</h1>
          <p className="text-muted-foreground">Gerenciamento de receitas, solicitações e atestados</p>
        </div>
        
        <Button className="bg-cardio-600 hover:bg-cardio-700">
          <Plus className="h-4 w-4 mr-2" />
          Novo Receituário
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row justify-between space-y-2 md:space-y-0 md:items-center">
            <div>
              <CardTitle>Receituários</CardTitle>
              <CardDescription>
                Gerencie todos os seus receituários em um só lugar
              </CardDescription>
            </div>
            <div className="flex w-full md:w-auto space-x-2">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar receituário..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="medication">Medicamentos</TabsTrigger>
              <TabsTrigger value="exam">Exames</TabsTrigger>
              <TabsTrigger value="certificate">Atestados</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-0">
              <div className="rounded-md border overflow-hidden">
                <div className="grid grid-cols-12 bg-muted/30 p-3 text-xs font-medium">
                  <div className="col-span-1">#</div>
                  <div className="col-span-3">Paciente</div>
                  <div className="col-span-1">Data</div>
                  <div className="col-span-1">Tipo</div>
                  <div className="col-span-3">Descrição</div>
                  <div className="col-span-1">Status</div>
                  <div className="col-span-2 text-right">Ações</div>
                </div>
                
                {filteredPrescriptions.length > 0 ? (
                  <div className="divide-y">
                    {filteredPrescriptions.map((prescription) => (
                      <div key={prescription.id} className="grid grid-cols-12 items-center p-3 hover:bg-muted/20">
                        <div className="col-span-1 font-medium">#{prescription.id}</div>
                        <div className="col-span-3">{prescription.patient}</div>
                        <div className="col-span-1 text-sm">{prescription.date}</div>
                        <div className="col-span-1 text-sm">{getTypeText(prescription.type)}</div>
                        <div className="col-span-3 text-sm truncate">{prescription.description}</div>
                        <div className="col-span-1">
                          <span className={`text-xs px-2 py-1 rounded-full border ${getStatusClass(prescription.status)}`}>
                            {getStatusText(prescription.status)}
                          </span>
                        </div>
                        <div className="col-span-2 flex justify-end space-x-1">
                          <Button variant="ghost" size="icon" onClick={() => printPrescription(prescription.id)}>
                            <Printer className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => downloadPrescription(prescription.id)}>
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => sharePrescription(prescription.id)}>
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <FileText className="h-12 w-12 mx-auto mb-3 text-muted" />
                    <p className="text-muted-foreground">Nenhum receituário encontrado</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-cardio-600" />
              Modelos de Receituário
            </CardTitle>
            <CardDescription>
              Modelos pré-definidos para agilizar a criação de receituários
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "Anti-hipertensivos", description: "Medicamentos para controle de pressão", icon: File },
                { title: "Anticoagulantes", description: "Medicamentos para anticoagulação", icon: File },
                { title: "Exames cardiológicos", description: "Solicitações de exames padrão", icon: File },
                { title: "Atestado médico", description: "Modelo de atestado médico padrão", icon: File },
                { title: "Relatório médico", description: "Modelo de relatório detalhado", icon: File },
                { title: "Kit pós-cirúrgico", description: "Receituário para pacientes pós-cirurgia", icon: File },
              ].map((template, index) => (
                <Card key={index} className="hover:shadow-md transition-all cursor-pointer">
                  <CardContent className="p-4 flex">
                    <div className="h-10 w-10 mr-3 rounded bg-cardio-100 flex items-center justify-center text-cardio-600">
                      <template.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">{template.title}</h4>
                      <p className="text-xs text-muted-foreground">{template.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-cardio-600" />
              Resumo
            </CardTitle>
            <CardDescription>
              Estatísticas de uso de receituários
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/30 p-4 rounded-lg text-center">
                  <p className="text-muted-foreground text-sm">Este mês</p>
                  <p className="text-3xl font-bold text-cardio-600 mt-1">42</p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg text-center">
                  <p className="text-muted-foreground text-sm">Pendentes</p>
                  <p className="text-3xl font-bold text-yellow-600 mt-1">7</p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium mb-3">Por tipo de receituário</h4>
                <div className="space-y-2">
                  {[
                    { type: "Medicamentos", count: 28, color: "bg-blue-500" },
                    { type: "Exames", count: 12, color: "bg-green-500" },
                    { type: "Atestados", count: 5, color: "bg-purple-500" },
                  ].map((stat, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{stat.type}</span>
                        <span className="text-muted-foreground">{stat.count}</span>
                      </div>
                      <div className="w-full bg-muted/50 rounded-full h-2">
                        <div 
                          className={`${stat.color} h-2 rounded-full`} 
                          style={{ width: `${(stat.count / 45) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
