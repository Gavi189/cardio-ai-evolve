
import { useEffect, useState } from "react";
import { 
  Check, ChevronDown, Clock, FileEdit, Plus, Save, Sparkles, Stethoscope,
  CalendarClock, Heart, Activity, Thermometer, Weight, Ruler, BarChart4, 
  Lungs, Droplets, Cigarette, Wine, Pill, Syringe, UserRound, Users, Gift
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MedicalHistory, VitalSigns, DiagnosticHypothesis } from "@/types/patient";

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
        className="editor-content w-full h-80 leading-relaxed p-4 border rounded-md"
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        placeholder="Registre a evolução do paciente aqui..."
      />
    </div>
  );
};

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

const MedicalHistorySection = ({ history, setHistory }: { 
  history: MedicalHistory, 
  setHistory: React.Dispatch<React.SetStateAction<MedicalHistory>> 
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">História Patológica Pregressa (HPP)</h3>
      
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="comorbidities">
          <AccordionTrigger className="text-left">
            <div className="flex items-center">
              <Heart className="h-4 w-4 mr-2 text-cardio-600" />
              Comorbidades
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Textarea 
              placeholder="Ex: Hipertensão, Diabetes tipo 2, Dislipidemia" 
              value={history.comorbidities?.join(", ") || ""} 
              onChange={(e) => setHistory(prev => ({
                ...prev, 
                comorbidities: e.target.value.split(", ")
              }))}
              className="min-h-[80px]"
            />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="surgeries">
          <AccordionTrigger className="text-left">
            <div className="flex items-center">
              <Pill className="h-4 w-4 mr-2 text-cardio-600" />
              Cirurgias Realizadas
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Textarea 
              placeholder="Ex: Revascularização miocárdica (2015)" 
              value={history.surgeries?.join(", ") || ""} 
              onChange={(e) => setHistory(prev => ({
                ...prev, 
                surgeries: e.target.value.split(", ")
              }))}
              className="min-h-[80px]"
            />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="allergies">
          <AccordionTrigger className="text-left">
            <div className="flex items-center">
              <Activity className="h-4 w-4 mr-2 text-cardio-600" />
              Alergias
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Textarea 
              placeholder="Ex: Alergia a AAS (ácido acetilsalicílico)" 
              value={history.allergies || ""} 
              onChange={(e) => setHistory(prev => ({
                ...prev, 
                allergies: e.target.value
              }))}
              className="min-h-[80px]"
            />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="habits">
          <AccordionTrigger className="text-left">
            <div className="flex items-center">
              <Activity className="h-4 w-4 mr-2 text-cardio-600" />
              Hábitos de Vida
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Atividade física:</label>
                <Input 
                  placeholder="Ex: Sim (caminhada 3x/semana)" 
                  value={history.physicalActivity || ""} 
                  onChange={(e) => setHistory(prev => ({
                    ...prev, 
                    physicalActivity: e.target.value
                  }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Sono:</label>
                <Input 
                  placeholder="Ex: Regular, 7h por noite" 
                  value={history.sleep || ""} 
                  onChange={(e) => setHistory(prev => ({
                    ...prev, 
                    sleep: e.target.value
                  }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Alimentação:</label>
                <Input 
                  placeholder="Ex: Pobre em fibras, rica em sódio" 
                  value={history.diet || ""} 
                  onChange={(e) => setHistory(prev => ({
                    ...prev, 
                    diet: e.target.value
                  }))}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="sports">
          <AccordionTrigger className="text-left">
            <div className="flex items-center">
              <Activity className="h-4 w-4 mr-2 text-cardio-600" />
              Prática de Esportes
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Input 
              placeholder="Ex: Futebol recreativo 1x por semana" 
              value={history.sports || ""} 
              onChange={(e) => setHistory(prev => ({
                ...prev, 
                sports: e.target.value
              }))}
            />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="substances">
          <AccordionTrigger className="text-left">
            <div className="flex items-center">
              <Cigarette className="h-4 w-4 mr-2 text-cardio-600" />
              Uso de Substâncias
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Tabaco:</label>
                <Input 
                  placeholder="Ex: 10 cigarros/dia há 15 anos (ativo)" 
                  value={history.tobacco || ""} 
                  onChange={(e) => setHistory(prev => ({
                    ...prev, 
                    tobacco: e.target.value
                  }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Álcool:</label>
                <Input 
                  placeholder="Ex: Socialmente" 
                  value={history.alcohol || ""} 
                  onChange={(e) => setHistory(prev => ({
                    ...prev, 
                    alcohol: e.target.value
                  }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Drogas ilícitas:</label>
                <Input 
                  placeholder="Ex: Nega uso" 
                  value={history.illicitDrugs || ""} 
                  onChange={(e) => setHistory(prev => ({
                    ...prev, 
                    illicitDrugs: e.target.value
                  }))}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="family">
          <AccordionTrigger className="text-left">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2 text-cardio-600" />
              Histórico Familiar
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Textarea 
              placeholder="Ex: Pai com infarto agudo do miocárdio aos 60 anos" 
              value={history.familyHistory?.join("\n") || ""} 
              onChange={(e) => setHistory(prev => ({
                ...prev, 
                familyHistory: e.target.value.split("\n")
              }))}
              className="min-h-[100px]"
            />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="vaccines">
          <AccordionTrigger className="text-left">
            <div className="flex items-center">
              <Syringe className="h-4 w-4 mr-2 text-cardio-600" />
              História Vacinal
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">COVID-19:</label>
                <Input 
                  placeholder="Ex: 3 doses" 
                  value={history.vaccineHistory?.covid || ""} 
                  onChange={(e) => setHistory(prev => ({
                    ...prev, 
                    vaccineHistory: {
                      ...prev.vaccineHistory,
                      covid: e.target.value
                    }
                  }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Influenza:</label>
                <Input 
                  placeholder="Ex: Atualizada" 
                  value={history.vaccineHistory?.influenza || ""} 
                  onChange={(e) => setHistory(prev => ({
                    ...prev, 
                    vaccineHistory: {
                      ...prev.vaccineHistory,
                      influenza: e.target.value
                    }
                  }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Pneumocócica:</label>
                <Input 
                  placeholder="Ex: Pendente" 
                  value={history.vaccineHistory?.pneumococcal || ""} 
                  onChange={(e) => setHistory(prev => ({
                    ...prev, 
                    vaccineHistory: {
                      ...prev.vaccineHistory,
                      pneumococcal: e.target.value
                    }
                  }))}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="gynecological">
          <AccordionTrigger className="text-left">
            <div className="flex items-center">
              <UserRound className="h-4 w-4 mr-2 text-cardio-600" />
              História Ginecológica
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Gestações:</label>
                <Input 
                  type="number"
                  placeholder="Ex: 2" 
                  value={history.gynecologicalHistory?.pregnancies || ""} 
                  onChange={(e) => setHistory(prev => ({
                    ...prev, 
                    gynecologicalHistory: {
                      ...prev.gynecologicalHistory,
                      pregnancies: parseInt(e.target.value) || 0
                    }
                  }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Abortos:</label>
                <Input 
                  type="number"
                  placeholder="Ex: 0" 
                  value={history.gynecologicalHistory?.abortions || ""} 
                  onChange={(e) => setHistory(prev => ({
                    ...prev, 
                    gynecologicalHistory: {
                      ...prev.gynecologicalHistory,
                      abortions: parseInt(e.target.value) || 0
                    }
                  }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Menarca (idade):</label>
                <Input 
                  type="number"
                  placeholder="Ex: 12" 
                  value={history.gynecologicalHistory?.menarche || ""} 
                  onChange={(e) => setHistory(prev => ({
                    ...prev, 
                    gynecologicalHistory: {
                      ...prev.gynecologicalHistory,
                      menarche: parseInt(e.target.value) || 0
                    }
                  }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Menopausa (idade):</label>
                <Input 
                  type="number"
                  placeholder="Ex: 50" 
                  value={history.gynecologicalHistory?.menopause || ""} 
                  onChange={(e) => setHistory(prev => ({
                    ...prev, 
                    gynecologicalHistory: {
                      ...prev.gynecologicalHistory,
                      menopause: parseInt(e.target.value) || 0
                    }
                  }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Ciclo menstrual:</label>
                <Input 
                  placeholder="Ex: Regular (28/5 dias)" 
                  value={history.gynecologicalHistory?.menstrualCycle || ""} 
                  onChange={(e) => setHistory(prev => ({
                    ...prev, 
                    gynecologicalHistory: {
                      ...prev.gynecologicalHistory,
                      menstrualCycle: e.target.value
                    }
                  }))}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="other">
          <AccordionTrigger className="text-left">
            <div className="flex items-center">
              <Gift className="h-4 w-4 mr-2 text-cardio-600" />
              Outras Informações
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Histórico de internações hospitalares:</label>
                <Textarea 
                  placeholder="Ex: 2020 - Pneumonia (10 dias)" 
                  value={history.hospitalizations?.join("\n") || ""} 
                  onChange={(e) => setHistory(prev => ({
                    ...prev, 
                    hospitalizations: e.target.value.split("\n")
                  }))}
                  className="min-h-[80px]"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Doenças infectocontagiosas prévias:</label>
                <Textarea 
                  placeholder="Ex: Dengue (2018), COVID-19 (2021)" 
                  value={history.infectiousDiseases?.join("\n") || ""} 
                  onChange={(e) => setHistory(prev => ({
                    ...prev, 
                    infectiousDiseases: e.target.value.split("\n")
                  }))}
                  className="min-h-[80px]"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Exposição ocupacional ou ambiental:</label>
                <Input 
                  placeholder="Ex: Trabalho com amianto por 5 anos" 
                  value={history.occupationalExposure || ""} 
                  onChange={(e) => setHistory(prev => ({
                    ...prev, 
                    occupationalExposure: e.target.value
                  }))}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

const VitalSignsSection = ({ vitalSigns, setVitalSigns }: { 
  vitalSigns: VitalSigns, 
  setVitalSigns: React.Dispatch<React.SetStateAction<VitalSigns>> 
}) => {
  // Calculate BMI when weight or height changes
  useEffect(() => {
    if (vitalSigns.weight && vitalSigns.height) {
      const heightInMeters = vitalSigns.height / 100;
      const bmi = vitalSigns.weight / (heightInMeters * heightInMeters);
      setVitalSigns(prev => ({...prev, bmi: parseFloat(bmi.toFixed(1))}));
    }
  }, [vitalSigns.weight, vitalSigns.height, setVitalSigns]);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Sinais Vitais</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium">Peso (kg)</label>
          <Input 
            type="number" 
            placeholder="Ex: 70.5" 
            value={vitalSigns.weight || ""} 
            onChange={(e) => setVitalSigns(prev => ({
              ...prev, 
              weight: parseFloat(e.target.value) || undefined
            }))}
          />
        </div>
        
        <div>
          <label className="text-sm font-medium">Altura (cm)</label>
          <Input 
            type="number" 
            placeholder="Ex: 175" 
            value={vitalSigns.height || ""} 
            onChange={(e) => setVitalSigns(prev => ({
              ...prev, 
              height: parseFloat(e.target.value) || undefined
            }))}
          />
        </div>
        
        <div>
          <label className="text-sm font-medium">IMC (kg/m²)</label>
          <Input 
            type="number" 
            value={vitalSigns.bmi || ""} 
            disabled 
            className="bg-gray-100"
          />
        </div>
        
        <div>
          <label className="text-sm font-medium">Circunferência Abdominal (cm)</label>
          <Input 
            type="number" 
            placeholder="Ex: 85" 
            value={vitalSigns.waistCircumference || ""} 
            onChange={(e) => setVitalSigns(prev => ({
              ...prev, 
              waistCircumference: parseFloat(e.target.value) || undefined
            }))}
          />
        </div>
        
        <div>
          <label className="text-sm font-medium">Frequência Cardíaca (bpm)</label>
          <Input 
            type="number" 
            placeholder="Ex: 72" 
            value={vitalSigns.heartRate || ""} 
            onChange={(e) => setVitalSigns(prev => ({
              ...prev, 
              heartRate: parseFloat(e.target.value) || undefined
            }))}
          />
        </div>
        
        <div>
          <label className="text-sm font-medium">Frequência Respiratória (irpm)</label>
          <Input 
            type="number" 
            placeholder="Ex: 16" 
            value={vitalSigns.respiratoryRate || ""} 
            onChange={(e) => setVitalSigns(prev => ({
              ...prev, 
              respiratoryRate: parseFloat(e.target.value) || undefined
            }))}
          />
        </div>
        
        <div>
          <label className="text-sm font-medium">Temperatura Corporal (°C)</label>
          <Input 
            type="number" 
            placeholder="Ex: 36.5" 
            value={vitalSigns.temperature || ""} 
            onChange={(e) => setVitalSigns(prev => ({
              ...prev, 
              temperature: parseFloat(e.target.value) || undefined
            }))}
          />
        </div>
        
        <div>
          <label className="text-sm font-medium">Pressão Arterial (mmHg)</label>
          <Input 
            type="text" 
            placeholder="Ex: 120/80" 
            value={vitalSigns.bloodPressure || ""} 
            onChange={(e) => setVitalSigns(prev => ({
              ...prev, 
              bloodPressure: e.target.value
            }))}
          />
        </div>
        
        <div>
          <label className="text-sm font-medium">Saturação de O₂ (%)</label>
          <Input 
            type="number" 
            placeholder="Ex: 98" 
            value={vitalSigns.oxygenSaturation || ""} 
            onChange={(e) => setVitalSigns(prev => ({
              ...prev, 
              oxygenSaturation: parseFloat(e.target.value) || undefined
            }))}
          />
        </div>
        
        <div>
          <label className="text-sm font-medium">Glicemia capilar (mg/dL)</label>
          <Input 
            type="number" 
            placeholder="Ex: 95" 
            value={vitalSigns.bloodGlucose || ""} 
            onChange={(e) => setVitalSigns(prev => ({
              ...prev, 
              bloodGlucose: parseFloat(e.target.value) || undefined
            }))}
          />
        </div>
        
        <div>
          <label className="text-sm font-medium">Escala de dor (0-10)</label>
          <Input 
            type="number" 
            placeholder="Ex: 3" 
            min="0"
            max="10"
            value={vitalSigns.painScore || ""} 
            onChange={(e) => setVitalSigns(prev => ({
              ...prev, 
              painScore: parseFloat(e.target.value) || undefined
            }))}
          />
        </div>
      </div>
    </div>
  );
};

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
          <CardHeader className="pb-1">
            <CardTitle className="flex items-center text-lg">
              <Stethoscope className="h-5 w-5 mr-2 text-cardio-600" />
              Informações do Paciente
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-medium">{patient.name}</h3>
                  <p className="text-muted-foreground text-sm">{patient.age} anos, {patient.gender}</p>
                </div>
                <div className="text-sm flex items-center">
                  <CalendarClock className="h-4 w-4 mr-1 text-cardio-600" />
                  <span>Última Consulta: {patient.lastVisit}</span>
                </div>
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
                  <span className="text-muted-foreground">Email:</span>
                  <span className="truncate max-w-[200px]">{patient.email}</span>
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
                <p className="text-sm font-medium mb-1">Hipótese Diagnóstica:</p>
                <div className="flex flex-col space-y-2">
                  <Input 
                    placeholder="Ex: Angina instável" 
                    value={diagnosticHypothesis.description} 
                    onChange={(e) => setDiagnosticHypothesis(prev => ({
                      ...prev, 
                      description: e.target.value
                    }))}
                  />
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">CID-10:</span>
                    <Input 
                      className="max-w-[100px]"
                      placeholder="Ex: I20.0" 
                      value={diagnosticHypothesis.icdCode} 
                      onChange={(e) => setDiagnosticHypothesis(prev => ({
                        ...prev, 
                        icdCode: e.target.value
                      }))}
                    />
                  </div>
                </div>
              </div>
              
              <div>
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
                  <TabsTrigger value="medicalHistory" className="h-12">
                    <FileEdit className="h-4 w-4 mr-2" />
                    História Patológica
                  </TabsTrigger>
                  <TabsTrigger value="vitalSigns" className="h-12">
                    <Activity className="h-4 w-4 mr-2" />
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
