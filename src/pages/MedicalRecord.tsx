
import { useState } from "react";
import { 
  Check, Clock, FileEdit, Plus, Save, Sparkles, Stethoscope
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { MedicalHistory, VitalSigns, DiagnosticHypothesis } from "@/types/patient";
import { MedicalRecordEditor } from "@/components/medical-record/MedicalRecordEditor";
import { EvolutionHistory } from "@/components/medical-record/EvolutionHistory";
import { MedicalHistorySection } from "@/components/medical-record/MedicalHistorySection";
import { VitalSignsSection } from "@/components/medical-record/VitalSignsSection";
import { PatientInfo } from "@/components/medical-record/PatientInfo";

export default function MedicalRecord() {
  const [activeTab, setActiveTab] = useState("evolution");
  const [evolContent, setEvolContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [autofilledContent, setAutofilledContent] = useState(false);
  const { toast } = useToast();
  
  const [medicalHistory, setMedicalHistory] = useState<MedicalHistory>({
    comorbidities: ["Hipertensão", "Diabetes tipo 2"],
    surgeries: ["Revascularização miocárdica (2015)"],
    allergies: "Alergia a AAS (ácido acetilsalicílico)",
    familyHistory: [
      "Pai com infarto agudo do miocárdio aos 60 anos",
      "Mãe com hipertensão arterial sistêmica"
    ],
    vaccineHistory: {
      covid: "3 doses",
      influenza: "Atualizada",
      pneumococcal: "Pendente"
    }
  });
  
  const [vitalSigns, setVitalSigns] = useState<VitalSigns>({
    weight: 70,
    height: 165,
    bmi: 25.7,
    waistCircumference: 92,
    heartRate: 72,
    respiratoryRate: 16,
    temperature: 36.5,
    bloodPressure: "135/85",
    oxygenSaturation: 98,
    bloodGlucose: 110,
    painScore: 0
  });
  
  const [diagnosticHypothesis, setDiagnosticHypothesis] = useState<DiagnosticHypothesis>({
    description: "Angina instável",
    icdCode: "I20.0"
  });

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
    setTimeout(() => {
      const suggestedText = 
        "Paciente Maria Silva, 64 anos, comparece para consulta de retorno. \n\n" +
        "ANAMNESE: Refere melhora da dispneia aos esforços após ajuste da medicação. Nega dor torácica. Mantém episódios de palpitações esporádicas, principalmente após situações de ansiedade. PA bem controlada em casa (média 130/85mmHg). Sono regular, sem ortopneia.\n\n" +
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
        "CID-10: I20.9 (Angina pectoris, não especificada)";
      
      setEvolContent(suggestedText);
      setAutofilledContent(true);

      toast({
        title: "IA aplicada",
        description: "Conteúdo sugerido pela IA com base no histórico do paciente.",
      });
    }, 1500);
  };

  const patient = {
    id: 1,
    name: "Maria Silva",
    age: 64,
    gender: "Feminino",
    cpf: "123.456.789-00",
    phone: "(11) 98765-4321",
    email: "maria.silva@email.com",
    address: "Av. Paulista, 1000, Apto 123, São Paulo - SP",
    insurance: "Bradesco Saúde",
    insuranceNumber: "98765432-10",
    allergies: "Penicilina",
    comorbidities: "Hipertensão Arterial, Diabetes Mellitus tipo 2",
    lastVisit: "24/03/2025"
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
          <PatientInfo 
            patient={patient} 
            diagnosticHypothesis={diagnosticHypothesis} 
            setDiagnosticHypothesis={setDiagnosticHypothesis} 
          />
        </Card>

        <Card className="lg:col-span-2">
          <div className="p-0">
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
                  <TabsTrigger value="medicalHistory" className="h-12">
                    <FileEdit className="h-4 w-4 mr-2" />
                    História Patológica
                  </TabsTrigger>
                  <TabsTrigger value="vitalSigns" className="h-12">
                    <FileEdit className="h-4 w-4 mr-2" />
                    Sinais Vitais
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
                <TabsContent value="medicalHistory" className="mt-0">
                  <MedicalHistorySection history={medicalHistory} setHistory={setMedicalHistory} />
                </TabsContent>
                <TabsContent value="vitalSigns" className="mt-0">
                  <VitalSignsSection vitalSigns={vitalSigns} setVitalSigns={setVitalSigns} />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </Card>
      </div>
    </div>
  );
}
