
import { useEffect, useState } from "react";
import { 
  Check, ChevronDown, Clock, FileEdit, Plus, Save, Sparkles, Stethoscope 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/toast";

// Componente simplificado para o editor
const MedicalRecordEditor = ({ content, onContentChange, autofilled }: { 
  content: string, 
  onContentChange: (val: string) => void,
  autofilled?: boolean
}) => {
  return (
    <div className="relative">
      {autofilled && (
        <div className="absolute right-4 top-4 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs flex items-center">
          <Sparkles className="h-3 w-3 mr-1" />
          Preenchido por IA
        </div>
      )}
      <textarea 
        className="editor-content w-full h-80 leading-relaxed"
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        placeholder="Registre a evolução do paciente aqui..."
      />
    </div>
  );
};

// Componente para o histórico de evolução
const EvolutionHistory = () => {
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

export default function MedicalRecord() {
  const [activeTab, setActiveTab] = useState("evolution");
  const [evolContent, setEvolContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [autofilledContent, setAutofilledContent] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Evolução salva",
        description: "A evolução do paciente foi salva com sucesso.",
      });
    }, 1000);
  };

  const handleAutocomplete = () => {
    // Simulando preenchimento automático por IA
    setTimeout(() => {
      const suggestedText = 
        "Paciente Maria Silva, 64 anos, comparece para consulta de retorno. \n\n" +
        "ANAMNESE: Refere melhora da dispneia aos esforços após ajuste da medicação. Nega dor torácica. Mantém episódios de palpitações esporádicas, principalmente após situações de ansiedade. PA bem controlada em casa (média 130/80mmHg). Sono regular, sem ortopneia.\n\n" +
        "MEDICAÇÕES EM USO: Losartana 50mg 2x/dia, Atenolol 25mg 1x/dia, AAS 100mg 1x/dia.\n\n" +
        "EXAME FÍSICO: PA: 135/85 mmHg | FC: 72bpm | SpO2: 97% | Peso: 68kg\n" +
        "Aparelho Cardiovascular: Bulhas rítmicas, normofonéticas, sem sopros.\n" +
        "Aparelho Respiratório: Murmúrio vesicular presente bilateralmente, sem ruídos adventícios.\n" +
        "MMII: Sem edemas, pulsos pediosos presentes e simétricos.\n\n" +
        "EXAMES: ECG: ritmo sinusal, sem alterações isquêmicas agudas.\n" +
        "Ecocardiograma (10/02/2025): FE 58%, hipertrofia concêntrica de VE leve, sem alterações significativas da contratilidade segmentar.\n\n" +
        "CONDUTA:\n" +
        "1. Manter medicações atuais\n" +
        "2. Solicitar perfil lipídico e função renal\n" +
        "3. Orientações sobre dieta hipossódica e atividade física regular\n" +
        "4. Retorno em 3 meses\n\n" +
        "CID-10: I10 (Hipertensão essencial), I20.9 (Angina pectoris, não especificada)";
      
      setEvolContent(suggestedText);
      setAutofilledContent(true);

      toast({
        title: "IA aplicada",
        description: "Conteúdo sugerido pela IA com base no histórico do paciente.",
      });
    }, 1500);
  };

  // Dados simulados do paciente
  const patient = {
    id: 1,
    name: "Maria Silva",
    age: 64,
    gender: "Feminino",
    cpf: "123.456.789-00",
    phone: "(11) 98765-4321",
    address: "Av. Paulista, 1000, Apto 123, São Paulo - SP",
    insurance: "Bradesco Saúde",
    insuranceNumber: "98765432-10",
    allergies: "Penicilina",
    comorbidities: "Hipertensão Arterial, Diabetes Mellitus tipo 2"
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gradient-cardio mb-1">Prontuário Eletrônico</h1>
          <p className="text-muted-foreground">Registro médico inteligente do paciente</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleAutocomplete} disabled={isSaving}>
            <Sparkles className="h-4 w-4 mr-2" />
            IA Autocomplete
          </Button>
          <Button 
            className="bg-cardio-600 hover:bg-cardio-700" 
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Clock className="h-4 w-4 mr-2 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Salvar Evolução
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader className="pb-1">
            <CardTitle className="flex items-center text-lg">
              <Stethoscope className="h-5 w-5 mr-2 text-cardio-600" />
              Informações do Paciente
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium">{patient.name}</h3>
                <p className="text-muted-foreground text-sm">{patient.age} anos, {patient.gender}</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">CPF:</span>
                  <span>{patient.cpf}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Telefone:</span>
                  <span>{patient.phone}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Convênio:</span>
                  <span>{patient.insurance}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Nº Carteirinha:</span>
                  <span>{patient.insuranceNumber}</span>
                </div>
              </div>
              
              <div className="pt-2">
                <p className="text-sm font-medium mb-1">Alergias:</p>
                <p className="text-sm bg-red-50 text-red-800 p-2 rounded-md">
                  {patient.allergies}
                </p>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Comorbidades:</p>
                <p className="text-sm bg-blue-50 text-blue-800 p-2 rounded-md">
                  {patient.comorbidities}
                </p>
              </div>
              
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Ver Detalhes Completos
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex items-center justify-between border-b px-4">
                <TabsList className="h-12">
                  <TabsTrigger value="evolution" className="h-12">
                    <FileEdit className="h-4 w-4 mr-2" />
                    Nova Evolução
                  </TabsTrigger>
                  <TabsTrigger value="history" className="h-12">
                    <Clock className="h-4 w-4 mr-2" />
                    Histórico de Evoluções
                  </TabsTrigger>
                </TabsList>
                {activeTab === "evolution" && (
                  <div className="text-xs text-muted-foreground flex items-center">
                    <Check className="h-3 w-3 mr-1 text-green-500" />
                    Auto-salvando rascunho
                  </div>
                )}
              </div>
              <div className="p-6">
                <TabsContent value="evolution" className="mt-0">
                  <MedicalRecordEditor 
                    content={evolContent} 
                    onContentChange={setEvolContent}
                    autofilled={autofilledContent}
                  />
                </TabsContent>
                <TabsContent value="history" className="mt-0">
                  <EvolutionHistory />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
