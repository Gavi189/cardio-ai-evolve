
import { useState } from "react";
import { FlaskConical, Search, Filter, Download, Share2, Plus, ChevronRight, FileText, PieChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Exam {
  id: number;
  patient: string;
  date: string;
  type: "blood" | "image" | "cardio" | "other";
  description: string;
  status: "pending" | "completed" | "canceled" | "scheduled";
  result?: string;
}

export default function Exams() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Dados de exemplo para exames
  const exams: Exam[] = [
    { 
      id: 1, 
      patient: "Maria Silva", 
      date: "04/04/2023", 
      type: "cardio", 
      description: "Ecocardiograma Transtorácico", 
      status: "completed",
      result: "Fração de ejeção normal (60%). Sem alterações significativas."
    },
    { 
      id: 2, 
      patient: "João Santos", 
      date: "05/04/2023", 
      type: "blood", 
      description: "Painel Lipídico Completo", 
      status: "pending"
    },
    { 
      id: 3, 
      patient: "Ana Oliveira", 
      date: "10/04/2023", 
      type: "cardio", 
      description: "Teste Ergométrico", 
      status: "scheduled"
    },
    { 
      id: 4, 
      patient: "Roberto Almeida", 
      date: "15/04/2023", 
      type: "image", 
      description: "Angiotomografia de Coronárias", 
      status: "scheduled"
    },
    { 
      id: 5, 
      patient: "Carla Mendes", 
      date: "02/04/2023", 
      type: "blood", 
      description: "Troponina e Enzimas Cardíacas", 
      status: "completed",
      result: "Níveis elevados de Troponina (0.8 ng/mL). Sugestivo de lesão miocárdica."
    },
    { 
      id: 6, 
      patient: "Paulo Sousa", 
      date: "01/04/2023", 
      type: "cardio", 
      description: "Holter 24h", 
      status: "completed",
      result: "Ritmo sinusal predominante. Raras extrassístoles ventriculares isoladas."
    },
  ];

  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.patient.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          exam.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "pending") return matchesSearch && exam.status === "pending";
    if (activeTab === "completed") return matchesSearch && exam.status === "completed";
    if (activeTab === "scheduled") return matchesSearch && exam.status === "scheduled";
    
    return false;
  });

  const getStatusClass = (status: Exam["status"]) => {
    switch (status) {
      case "completed": return "text-green-600 bg-green-50 border-green-200";
      case "canceled": return "text-red-600 bg-red-50 border-red-200";
      case "pending": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      default: return "text-blue-600 bg-blue-50 border-blue-200"; // scheduled
    }
  };

  const getStatusText = (status: Exam["status"]) => {
    switch (status) {
      case "completed": return "Concluído";
      case "canceled": return "Cancelado";
      case "pending": return "Pendente";
      default: return "Agendado";
    }
  };

  const getTypeText = (type: Exam["type"]) => {
    switch (type) {
      case "blood": return "Laboratorial";
      case "image": return "Imagem";
      case "cardio": return "Cardiológico";
      default: return "Outro";
    }
  };

  const getTypeBadge = (type: Exam["type"]) => {
    switch (type) {
      case "blood": return "bg-red-100 text-red-800";
      case "image": return "bg-purple-100 text-purple-800";
      case "cardio": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const viewExamResult = (id: number) => {
    const exam = exams.find(e => e.id === id);
    if (exam && exam.result) {
      toast({
        title: `Resultado: ${exam.description}`,
        description: exam.result,
      });
    } else {
      toast({
        title: "Resultado não disponível",
        description: "Este exame ainda não possui resultados ou não foi concluído.",
        variant: "destructive",
      });
    }
  };

  const downloadExam = (id: number) => {
    toast({
      title: "Download iniciado",
      description: `O download do exame #${id} foi iniciado.`,
    });
  };

  const shareExam = (id: number) => {
    toast({
      title: "Compartilhar exame",
      description: `Opções de compartilhamento para o exame #${id}.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gradient-cardio mb-1">Exames</h1>
          <p className="text-muted-foreground">Gerenciamento de exames e resultados</p>
        </div>
        
        <Button className="bg-cardio-600 hover:bg-cardio-700">
          <Plus className="h-4 w-4 mr-2" />
          Solicitar Exame
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row justify-between space-y-2 md:space-y-0 md:items-center">
            <div>
              <CardTitle>Exames Solicitados</CardTitle>
              <CardDescription>
                Gerencie todas as solicitações e resultados de exames
              </CardDescription>
            </div>
            <div className="flex w-full md:w-auto space-x-2">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar exame..."
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
              <TabsTrigger value="pending">Pendentes</TabsTrigger>
              <TabsTrigger value="scheduled">Agendados</TabsTrigger>
              <TabsTrigger value="completed">Concluídos</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-0">
              <div className="rounded-md border overflow-hidden">
                <div className="grid grid-cols-12 bg-muted/30 p-3 text-xs font-medium">
                  <div className="col-span-1">#</div>
                  <div className="col-span-2">Paciente</div>
                  <div className="col-span-1">Data</div>
                  <div className="col-span-2">Tipo</div>
                  <div className="col-span-3">Descrição</div>
                  <div className="col-span-1">Status</div>
                  <div className="col-span-2 text-right">Ações</div>
                </div>
                
                {filteredExams.length > 0 ? (
                  <div className="divide-y">
                    {filteredExams.map((exam) => (
                      <div key={exam.id} className="grid grid-cols-12 items-center p-3 hover:bg-muted/20">
                        <div className="col-span-1 font-medium">#{exam.id}</div>
                        <div className="col-span-2">{exam.patient}</div>
                        <div className="col-span-1 text-sm">{exam.date}</div>
                        <div className="col-span-2">
                          <Badge variant="outline" className={`${getTypeBadge(exam.type)}`}>
                            {getTypeText(exam.type)}
                          </Badge>
                        </div>
                        <div className="col-span-3 text-sm truncate">{exam.description}</div>
                        <div className="col-span-1">
                          <span className={`text-xs px-2 py-1 rounded-full border ${getStatusClass(exam.status)}`}>
                            {getStatusText(exam.status)}
                          </span>
                        </div>
                        <div className="col-span-2 flex justify-end space-x-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => viewExamResult(exam.id)}
                            disabled={exam.status !== "completed"}
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => downloadExam(exam.id)}>
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => shareExam(exam.id)}>
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <FlaskConical className="h-12 w-12 mx-auto mb-3 text-muted" />
                    <p className="text-muted-foreground">Nenhum exame encontrado</p>
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
              <FlaskConical className="h-5 w-5 mr-2 text-cardio-600" />
              Exames Recentes com Resultados Alterados
            </CardTitle>
            <CardDescription>
              Exames com resultados fora dos parâmetros normais
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { 
                  patient: "Carla Mendes", 
                  exam: "Troponina e Enzimas Cardíacas", 
                  date: "02/04/2023",
                  result: "Troponina: 0.8 ng/mL (VR: até 0.4 ng/mL)",
                  severity: "high"
                },
                { 
                  patient: "Carlos Pereira", 
                  exam: "Teste de Esforço", 
                  date: "01/04/2023",
                  result: "Infradesnivelamento de ST durante esforço máximo",
                  severity: "medium"
                },
                { 
                  patient: "Mariana Costa", 
                  exam: "Perfil Lipídico", 
                  date: "30/03/2023",
                  result: "LDL: 190 mg/dL (VR: até 130 mg/dL)",
                  severity: "medium"
                },
              ].map((item, index) => (
                <div key={index} className="border rounded-md p-4 hover:bg-muted/10">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{item.patient}</h4>
                      <p className="text-sm text-muted-foreground">{item.exam} - {item.date}</p>
                    </div>
                    <Badge 
                      className={
                        item.severity === "high" ? "bg-red-100 text-red-800" : 
                        item.severity === "medium" ? "bg-yellow-100 text-yellow-800" : 
                        "bg-blue-100 text-blue-800"
                      }
                    >
                      {item.severity === "high" ? "Alta Prioridade" : 
                       item.severity === "medium" ? "Atenção" : "Informativo"}
                    </Badge>
                  </div>
                  <div className="mt-2 p-2 bg-muted/30 rounded text-sm">
                    <p>{item.result}</p>
                  </div>
                  <div className="mt-2 flex justify-end">
                    <Button variant="link" size="sm" className="text-cardio-600">
                      Ver detalhes
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="h-5 w-5 mr-2 text-cardio-600" />
              Estatísticas
            </CardTitle>
            <CardDescription>
              Resumo dos exames solicitados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/30 p-4 rounded-lg text-center">
                  <p className="text-muted-foreground text-sm">Total de exames</p>
                  <p className="text-3xl font-bold text-cardio-600 mt-1">42</p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg text-center">
                  <p className="text-muted-foreground text-sm">Pendentes</p>
                  <p className="text-3xl font-bold text-yellow-600 mt-1">12</p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium mb-3">Por tipo de exame</h4>
                <div className="space-y-2">
                  {[
                    { type: "Cardiológico", count: 18, color: "bg-blue-500" },
                    { type: "Laboratorial", count: 16, color: "bg-red-500" },
                    { type: "Imagem", count: 8, color: "bg-purple-500" },
                  ].map((stat, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{stat.type}</span>
                        <span className="text-muted-foreground">{stat.count}</span>
                      </div>
                      <div className="w-full bg-muted/50 rounded-full h-2">
                        <div 
                          className={`${stat.color} h-2 rounded-full`} 
                          style={{ width: `${(stat.count / 42) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button className="w-full" variant="outline">
                Ver todos os relatórios
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
