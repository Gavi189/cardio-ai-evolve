import { useState } from "react";
import { FileText, Search, Filter, Download, Share2, Plus, Printer, FilePlus, FileCheck, Stethoscope, FileBarChart2, FileOutput, FileBadge } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Prescription {
  id: number;
  patient: string;
  date: string;
  type: "simples" | "especial" | "exame" | "atestado" | "relatorio" | "encaminhamento" | "orientacoes" | "declaracao";
  description: string;
  status: "pending" | "delivered" | "expired";
}

interface PrescriptionTemplate {
  id: number;
  title: string;
  description: string;
  type: "simples" | "especial" | "exame" | "atestado" | "relatorio" | "encaminhamento" | "orientacoes" | "declaracao";
  icon: React.FC<any>;
}

export default function Prescription() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [templateDialog, setTemplateDialog] = useState(false);
  const [prescriptionDialog, setPrescriptionDialog] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<PrescriptionTemplate | null>(null);
  
  const templateForm = useForm({
    defaultValues: {
      title: "",
      description: "",
      type: "simples",
      content: "",
      documentType: "receita",
      doctorInfo: true,
      signature: true,
      dateCity: true,
      header: ""
    }
  });

  const prescriptionForm = useForm({
    defaultValues: {
      patient: "",
      type: "simples",
      description: "",
      content: "",
      documentType: "receita"
    }
  });
  
  const prescriptions: Prescription[] = [
    { id: 1, patient: "Maria Silva", date: "04/04/2023", type: "simples", description: "Losartana 50mg - 30 comprimidos", status: "delivered" },
    { id: 2, patient: "João Santos", date: "03/04/2023", type: "simples", description: "Atorvastatina 20mg - 30 comprimidos", status: "pending" },
    { id: 3, patient: "Ana Oliveira", date: "02/04/2023", type: "exame", description: "Solicitação de ecocardiograma", status: "delivered" },
    { id: 4, patient: "Roberto Almeida", date: "01/04/2023", type: "especial", description: "Fluoxetina 20mg - 30 comprimidos", status: "delivered" },
    { id: 5, patient: "Carla Mendes", date: "28/03/2023", type: "simples", description: "Varfarina 5mg - 30 comprimidos", status: "expired" },
    { id: 6, patient: "Paulo Sousa", date: "25/03/2023", type: "exame", description: "Solicitação de teste ergométrico", status: "pending" },
  ];
  
  const prescriptionTemplates: PrescriptionTemplate[] = [
    { id: 1, title: "Dislipidemia leve", description: "Medicamentos e orientações para dislipidemia leve", type: "simples", icon: FileText },
    { id: 2, title: "Pré-operatório cardiovascular", description: "Exames e medicações para preparo pré-operatório", type: "exame", icon: FileCheck },
    { id: 3, title: "Insuficiência cardíaca crônica", description: "Tratamento padrão para ICC", type: "simples", icon: FileText },
    { id: 4, title: "Ansiedade leve/moderada", description: "Tratamento para ansiedade com medicação controlada", type: "especial", icon: Stethoscope },
    { id: 5, title: "Exames cardiológicos básicos", description: "Conjunto de exames cardiológicos de rotina", type: "exame", icon: FileCheck },
    { id: 6, title: "Atestado médico padrão", description: "Modelo de atestado com 3 dias de afastamento", type: "atestado", icon: FileBadge },
    { id: 7, title: "Relatório para perícia", description: "Relatório detalhado para perícia médica", type: "relatorio", icon: FileBarChart2 },
    { id: 8, title: "Encaminhamento cardiologista", description: "Encaminhamento para especialista", type: "encaminhamento", icon: FileOutput },
    { id: 9, title: "Orientações pós-consulta", description: "Orientações de cuidados pós-consulta", type: "orientacoes", icon: FileText },
  ];

  const filteredPrescriptions = prescriptions.filter(prescription => {
    const matchesSearch = prescription.patient.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          prescription.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "simples") return matchesSearch && prescription.type === "simples";
    if (activeTab === "especial") return matchesSearch && prescription.type === "especial";
    if (activeTab === "exame") return matchesSearch && prescription.type === "exame";
    
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
      case "simples": return "Receita Simples";
      case "especial": return "Receituário Especial";
      case "exame": return "Exames";
      case "atestado": return "Atestado Médico";
      case "relatorio": return "Relatório Médico";
      case "encaminhamento": return "Encaminhamento";
      case "orientacoes": return "Orientações";
      case "declaracao": return "Declaração";
      default: return "";
    }
  };

  const getTypeIcon = (type: Prescription["type"]) => {
    switch (type) {
      case "simples": return <FileText className="h-5 w-5" />;
      case "especial": return <Stethoscope className="h-5 w-5" />;
      case "exame": return <FileCheck className="h-5 w-5" />;
      case "atestado": return <FileBadge className="h-5 w-5" />;
      case "relatorio": return <FileBarChart2 className="h-5 w-5" />;
      case "encaminhamento": return <FileOutput className="h-5 w-5" />;
      case "orientacoes": return <FileText className="h-5 w-5" />;
      case "declaracao": return <FileText className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
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

  const onCreateTemplate = (data: any) => {
    toast({
      title: "Template criado",
      description: `O template "${data.title}" foi criado com sucesso.`,
    });
    setTemplateDialog(false);
    templateForm.reset();
  };

  const onCreatePrescription = (data: any) => {
    toast({
      title: "Receituário criado",
      description: `O receituário para ${data.patient} foi criado com sucesso.`,
    });
    setPrescriptionDialog(false);
    prescriptionForm.reset();
  };

  const handleUseTemplate = (template: PrescriptionTemplate) => {
    setSelectedTemplate(template);
    setPrescriptionDialog(true);
    prescriptionForm.setValue("type", template.type);
    prescriptionForm.setValue("description", template.title);
    prescriptionForm.setValue("documentType", template.type === "simples" || template.type === "especial" ? "receita" : template.type);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gradient-cardio mb-1">Receituário</h1>
          <p className="text-muted-foreground">Gerenciamento de receitas, solicitações e atestados</p>
        </div>
        
        <Dialog open={prescriptionDialog} onOpenChange={setPrescriptionDialog}>
          <DialogTrigger asChild>
            <Button className="bg-cardio-600 hover:bg-cardio-700">
              <Plus className="h-4 w-4 mr-2" />
              Nova prescrição
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Nova prescrição</DialogTitle>
              <DialogDescription>
                Crie uma nova prescrição para seu paciente.
              </DialogDescription>
            </DialogHeader>
            
            <Form {...prescriptionForm}>
              <form onSubmit={prescriptionForm.handleSubmit(onCreatePrescription)} className="space-y-4">
                <FormField
                  control={prescriptionForm.control}
                  name="patient"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Paciente</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do paciente" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={prescriptionForm.control}
                    name="documentType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de documento</FormLabel>
                        <Select 
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="receita">Receita</SelectItem>
                            <SelectItem value="exame">Solicitação de Exames</SelectItem>
                            <SelectItem value="atestado">Atestado Médico</SelectItem>
                            <SelectItem value="relatorio">Relatório Médico</SelectItem>
                            <SelectItem value="encaminhamento">Encaminhamento</SelectItem>
                            <SelectItem value="orientacoes">Orientações</SelectItem>
                            <SelectItem value="declaracao">Declaração de Comparecimento</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={prescriptionForm.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de receituário</FormLabel>
                        <Select 
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="simples">Receita Simples</SelectItem>
                            <SelectItem value="especial">Receituário Especial</SelectItem>
                            <SelectItem value="exame">Exames</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={prescriptionForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Input placeholder="Breve descrição da prescrição" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={prescriptionForm.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Conteúdo da prescrição</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Digite o conteúdo detalhado da prescrição..." 
                          className="min-h-[200px]"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setPrescriptionDialog(false)}>Cancelar</Button>
                  <Button type="submit">Criar prescrição</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
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
                  placeholder="Buscar paciente ou medicação..."
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
              <TabsTrigger value="simples">Receitas</TabsTrigger>
              <TabsTrigger value="atestado">Atestados</TabsTrigger>
              <TabsTrigger value="exame">Exames</TabsTrigger>
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
                        <div className="col-span-1 text-sm flex items-center">
                          <span className="mr-1">{getTypeIcon(prescription.type)}</span>
                          <span>{getTypeText(prescription.type).split(' ')[0]}</span>
                        </div>
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

      <Tabs defaultValue="templates" className="w-full">
        <TabsList className="w-full max-w-md mb-4">
          <TabsTrigger value="recentes" className="flex-1">Recentes</TabsTrigger>
          <TabsTrigger value="medicacoes" className="flex-1">Medicações comuns</TabsTrigger>
          <TabsTrigger value="templates" className="flex-1">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="templates">
          {prescriptionTemplates.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {prescriptionTemplates.map((template) => (
                <Card key={template.id} className="hover:shadow-md transition-all cursor-pointer" onClick={() => handleUseTemplate(template)}>
                  <CardContent className="p-6">
                    <div className="flex items-start mb-4">
                      <div className="h-10 w-10 mr-3 rounded bg-cardio-100 flex items-center justify-center text-cardio-600">
                        <template.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">{template.title}</h4>
                        <p className="text-xs text-muted-foreground">{template.description}</p>
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t text-sm text-muted-foreground flex justify-between items-center">
                      <span className="flex items-center">
                        {getTypeIcon(template.type)}
                        <span className="ml-1">{getTypeText(template.type)}</span>
                      </span>
                      <Button variant="ghost" size="sm" className="text-xs">Usar</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Dialog open={templateDialog} onOpenChange={setTemplateDialog}>
                <Card className="hover:shadow-md transition-all flex flex-col items-center justify-center text-center cursor-pointer h-full">
                  <DialogTrigger asChild>
                    <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                      <div className="h-20 w-20 mb-4 rounded-full bg-muted/30 flex items-center justify-center text-muted-foreground">
                        <Plus className="h-8 w-8" />
                      </div>
                      <h3 className="text-lg font-medium mb-1">Criar template</h3>
                      <p className="text-sm text-muted-foreground">
                        Crie templates reutilizáveis para agilizar suas prescrições médicas mais comuns
                      </p>
                    </CardContent>
                  </DialogTrigger>
                </Card>

                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>Criar novo template</DialogTitle>
                    <DialogDescription>
                      Crie um template reutilizável para suas prescrições mais frequentes.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <Form {...templateForm}>
                    <form onSubmit={templateForm.handleSubmit(onCreateTemplate)} className="space-y-6">
                      <div>
                        <h4 className="text-sm font-semibold mb-2">Informações Básicas</h4>
                        <div className="space-y-4">
                          <FormField
                            control={templateForm.control}
                            name="title"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Título do template</FormLabel>
                                <FormControl>
                                  <Input placeholder="Ex: Dislipidemia leve" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={templateForm.control}
                              name="documentType"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Tipo de documento</FormLabel>
                                  <Select 
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Selecione o tipo" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="receita">Receita</SelectItem>
                                      <SelectItem value="exame">Solicitação de Exames</SelectItem>
                                      <SelectItem value="atestado">Atestado Médico</SelectItem>
                                      <SelectItem value="relatorio">Relatório Médico</SelectItem>
                                      <SelectItem value="encaminhamento">Encaminhamento</SelectItem>
                                      <SelectItem value="orientacoes">Orientações</SelectItem>
                                      <SelectItem value="declaracao">Declaração de Comparecimento</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={templateForm.control}
                              name="type"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Tipo de receituário</FormLabel>
                                  <Select 
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Selecione o tipo" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="simples">Receita Simples</SelectItem>
                                      <SelectItem value="especial">Receituário Especial</SelectItem>
                                      <SelectItem value="exame">Exames</SelectItem>
                                      <SelectItem value="atestado">Atestado</SelectItem>
                                      <SelectItem value="relatorio">Relatório</SelectItem>
                                      <SelectItem value="encaminhamento">Encaminhamento</SelectItem>
                                      <SelectItem value="orientacoes">Orientações</SelectItem>
                                      <SelectItem value="declaracao">Declaração</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={templateForm.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Descrição breve</FormLabel>
                                <FormControl>
                                  <Input placeholder="Breve descrição do template" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="text-sm font-semibold mb-2">Estrutura do Documento</h4>
                        <div className="space-y-4">
                          <FormField
                            control={templateForm.control}
                            name="header"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Cabeçalho do documento</FormLabel>
                                <FormControl>
                                  <Input placeholder="Ex: Hospital Cardiológico - Serviço de Cardiologia" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={templateForm.control}
                              name="doctorInfo"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroup
                                      onValueChange={(value) => field.onChange(value === "true")}
                                      defaultValue={field.value ? "true" : "false"}
                                      className="flex flex-col space-y-1"
                                    >
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="true" id="doctorInfo-yes" />
                                        <FormLabel htmlFor="doctorInfo-yes" className="font-normal">
                                          Incluir informações do médico
                                        </FormLabel>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="false" id="doctorInfo-no" />
                                        <FormLabel htmlFor="doctorInfo-no" className="font-normal">
                                          Não incluir
                                        </FormLabel>
                                      </div>
                                    </RadioGroup>
                                  </FormControl>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={templateForm.control}
                              name="signature"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroup
                                      onValueChange={(value) => field.onChange(value === "true")}
                                      defaultValue={field.value ? "true" : "false"}
                                      className="flex flex-col space-y-1"
                                    >
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="true" id="signature-yes" />
                                        <FormLabel htmlFor="signature-yes" className="font-normal">
                                          Incluir espaço para assinatura
                                        </FormLabel>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="false" id="signature-no" />
                                        <FormLabel htmlFor="signature-no" className="font-normal">
                                          Não incluir
                                        </FormLabel>
                                      </div>
                                    </RadioGroup>
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={templateForm.control}
                            name="dateCity"
                            render={({ field }) => (
                              <FormItem>
                                <div className="flex items-center space-x-2">
                                  <FormControl>
                                    <input
                                      type="checkbox"
                                      checked={field.value}
                                      onChange={(e) => field.onChange(e.target.checked)}
                                      className="h-4 w-4 rounded border-gray-300 text-cardio-600 focus:ring-cardio-600"
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Incluir data e cidade automaticamente
                                  </FormLabel>
                                </div>
                                <FormDescription>
                                  Adiciona "Cidade, XX de XXXX de XXXX" automaticamente no documento
                                </FormDescription>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <Separator />
                      
                      <FormField
                        control={templateForm.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Conteúdo do template</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Digite o conteúdo padrão para este tipo de prescrição..." 
                                className="min-h-[200px]"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setTemplateDialog(false)}>Cancelar</Button>
                        <Button type="submit">Criar template</Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="recentes">
          <Card className="p-8 text-center">
            <FileText className="h-12 w-12 mx-auto mb-3 text-muted" />
            <p className="text-muted-foreground">Nenhuma prescrição recente encontrada</p>
          </Card>
        </TabsContent>

        <TabsContent value="medicacoes">
          <Card className="p-8 text-center">
            <FileText className="h-12 w-12 mx-auto mb-3 text-muted" />
            <p className="text-muted-foreground">Nenhuma medicação comum configurada</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
