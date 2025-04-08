
import { useState } from "react";
import { Activity, ArrowLeft, ArrowRight, HelpCircle, AlertTriangle, CheckCircle, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

export default function RiskCalculator() {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [risk, setRisk] = useState<"Baixo" | "Moderado" | "Alto" | "Muito Alto" | null>(null);
  
  // Step 1 - Atherosclerotic disease
  const [hasAtheroscleroticDisease, setHasAtheroscleroticDisease] = useState<boolean | null>(null);
  
  // Step 2 - Diabetes
  const [hasDiabetes, setHasDiabetes] = useState<boolean | null>(null);
  
  // Step 3 - Subclinical atherosclerosis or equivalent conditions
  const [hasSubclinicalAtherosclerosis, setHasSubclinicalAtherosclerosis] = useState<boolean | null>(null);
  
  // Step 4 - Risk factors
  const [gender, setGender] = useState<string | null>(null);
  const [age, setAge] = useState<string | null>(null);
  const [systolicBP, setSystolicBP] = useState<string | null>(null);
  const [treatedBP, setTreatedBP] = useState<string | null>(null);
  const [smoking, setSmoking] = useState<string | null>(null);
  const [statin, setStatin] = useState<string | null>(null);
  const [totalCholesterol, setTotalCholesterol] = useState("");
  const [hdl, setHdl] = useState<string | null>(null);

  const handleNextStep = () => {
    // Validation for each step
    if (currentStep === 1 && hasAtheroscleroticDisease === null) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, responda à pergunta para continuar.",
        variant: "destructive",
      });
      return;
    }
    
    if (currentStep === 2 && hasDiabetes === null) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, responda à pergunta para continuar.",
        variant: "destructive",
      });
      return;
    }
    
    if (currentStep === 3 && hasSubclinicalAtherosclerosis === null) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, responda à pergunta para continuar.",
        variant: "destructive",
      });
      return;
    }

    // If questionnaire conditions met for high risk classification on early steps
    if (currentStep === 1 && hasAtheroscleroticDisease) {
      setRisk("Muito Alto");
      setCurrentStep(5); // Go to results
      return;
    }
    
    if (currentStep === 2 && hasDiabetes) {
      setRisk("Alto");
      setCurrentStep(5); // Go to results
      return;
    }
    
    if (currentStep === 3 && hasSubclinicalAtherosclerosis) {
      setRisk("Alto");
      setCurrentStep(5); // Go to results
      return;
    }

    // Step 4 validation
    if (currentStep === 4) {
      if (!gender || !age || !systolicBP || !treatedBP || !smoking || !statin || !totalCholesterol || !hdl) {
        toast({
          title: "Dados incompletos",
          description: "Por favor, preencha todos os campos para calcular o risco.",
          variant: "destructive",
        });
        return;
      }

      // Simplified risk calculation based on factors
      calculateRisk();
      setCurrentStep(5); // Go to results
      return;
    }

    // Move to next step
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateRisk = () => {
    // Simplified risk calculation logic for demonstration
    let riskPoints = 0;
    
    // Add points based on age
    if (age === "65-74") {
      riskPoints += 1;
    } else if (age === "75+") {
      riskPoints += 2;
    }
    
    // Add points for smoking
    if (smoking === "sim") {
      riskPoints += 1;
    }
    
    // Add points for high systolic BP
    if (systolicBP === "140-159") {
      riskPoints += 1;
    } else if (systolicBP === "160+") {
      riskPoints += 2;
    }
    
    // Adjust points for HDL
    if (hdl === "baixo") {
      riskPoints += 1;
    } else if (hdl === "alto") {
      riskPoints -= 1;
    }
    
    // Adjust for total cholesterol
    const cholValue = parseInt(totalCholesterol);
    if (cholValue >= 240) {
      riskPoints += 1;
    } else if (cholValue >= 280) {
      riskPoints += 2;
    }

    // Determine risk category based on points
    if (riskPoints <= 1) {
      setRisk("Baixo");
    } else if (riskPoints <= 3) {
      setRisk("Moderado");
    } else {
      setRisk("Alto");
    }
  };

  const resetCalculator = () => {
    setCurrentStep(1);
    setRisk(null);
    setHasAtheroscleroticDisease(null);
    setHasDiabetes(null);
    setHasSubclinicalAtherosclerosis(null);
    setGender(null);
    setAge(null);
    setSystolicBP(null);
    setTreatedBP(null);
    setSmoking(null);
    setStatin(null);
    setTotalCholesterol("");
    setHdl(null);
  };

  const getRiskColor = (riskLevel: string | null) => {
    switch(riskLevel) {
      case "Baixo":
        return "bg-emerald-500 text-white";
      case "Moderado":
        return "bg-amber-500 text-white";
      case "Alto":
        return "bg-orange-500 text-white";
      case "Muito Alto":
        return "bg-red-500 text-white";
      default:
        return "";
    }
  };

  const renderProgressSteps = () => {
    return (
      <div className="relative mb-8">
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 bg-gray-200 rounded-full"></div>
        <div className="flex justify-between relative z-10">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex flex-col items-center">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium 
                  ${step < currentStep 
                    ? 'bg-cardio-600 text-white' 
                    : step === currentStep 
                    ? 'bg-cardio-600 text-white shadow-lg ring-4 ring-cardio-100' 
                    : 'bg-white border-2 border-gray-300 text-gray-500'}`}
              >
                {step < currentStep ? <CheckCircle className="h-5 w-5" /> : step}
              </div>
              <span className={`text-xs mt-2 ${step === currentStep ? 'text-cardio-700 font-medium' : 'text-gray-500'}`}>
                {step === 1 && "Doença"}
                {step === 2 && "Diabetes"}
                {step === 3 && "Condições"}
                {step === 4 && "Fatores"}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gradient-cardio mb-1">Calculadora de Risco</h1>
          <p className="text-muted-foreground">Estratificação de Risco Cardiovascular - SBC</p>
        </div>
      </div>

      <Card className="overflow-hidden border-cardio-100 shadow-md">
        <CardHeader className="bg-gradient-to-r from-cardio-600 to-cardio-700 text-white pb-6">
          <CardTitle className="text-white font-semibold text-xl sm:text-2xl">
            CALCULADORA PARA ESTRATIFICAÇÃO DE RISCO CARDIOVASCULAR
          </CardTitle>
          <CardDescription className="text-white/80 mt-2">
            Baseada nas diretrizes da Sociedade Brasileira de Cardiologia
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 sm:p-8">
          {currentStep < 5 && renderProgressSteps()}

          {/* Step 1: Atherosclerotic disease */}
          {currentStep === 1 && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-xl font-medium text-center max-w-3xl mx-auto px-4">
                <div className="inline-flex items-center justify-center bg-cardio-50 text-cardio-700 rounded-full w-10 h-10 mb-4">
                  <span className="font-bold">1</span>
                </div>
                <h3 className="text-xl font-medium mb-4">Doença Aterosclerótica</h3>
                <p className="text-gray-600">
                  Presença de doença aterosclerótica significativa (coronária, cerebrovascular, 
                  vascular periférica), com ou sem eventos clínicos ou obstrução ≥ 50% em qualquer território arterial?
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                <Button 
                  className={`h-12 px-8 text-base font-medium transition-all ${hasAtheroscleroticDisease === true 
                    ? 'bg-cardio-600 hover:bg-cardio-700 text-white' 
                    : 'bg-white border-2 border-cardio-200 text-cardio-700 hover:bg-cardio-50'}`}
                  onClick={() => setHasAtheroscleroticDisease(true)}
                >
                  SIM
                </Button>
                <Button 
                  className={`h-12 px-8 text-base font-medium transition-all ${hasAtheroscleroticDisease === false 
                    ? 'bg-cardio-600 hover:bg-cardio-700 text-white' 
                    : 'bg-white border-2 border-cardio-200 text-cardio-700 hover:bg-cardio-50'}`}
                  onClick={() => setHasAtheroscleroticDisease(false)}
                >
                  NÃO
                </Button>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-blue-800 text-sm">
                <div className="flex items-start">
                  <HelpCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium mb-1">O que é considerado doença aterosclerótica significativa?</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Doença arterial coronariana prévia (ex: infarto, angina)</li>
                      <li>AVC ou ataque isquêmico transitório</li>
                      <li>Doença arterial periférica com sintomas clínicos</li>
                      <li>Estenose de artéria ≥ 50% documentada por exames</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Diabetes */}
          {currentStep === 2 && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-xl font-medium text-center max-w-3xl mx-auto px-4">
                <div className="inline-flex items-center justify-center bg-cardio-50 text-cardio-700 rounded-full w-10 h-10 mb-4">
                  <span className="font-bold">2</span>
                </div>
                <h3 className="text-xl font-medium mb-4">Diabetes Mellitus</h3>
                <p className="text-gray-600">
                  Portador de Diabetes Mellitus tipo 1 ou tipo 2?
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                <Button 
                  className={`h-12 px-8 text-base font-medium transition-all ${hasDiabetes === true 
                    ? 'bg-cardio-600 hover:bg-cardio-700 text-white' 
                    : 'bg-white border-2 border-cardio-200 text-cardio-700 hover:bg-cardio-50'}`}
                  onClick={() => setHasDiabetes(true)}
                >
                  SIM
                </Button>
                <Button 
                  className={`h-12 px-8 text-base font-medium transition-all ${hasDiabetes === false 
                    ? 'bg-cardio-600 hover:bg-cardio-700 text-white' 
                    : 'bg-white border-2 border-cardio-200 text-cardio-700 hover:bg-cardio-50'}`}
                  onClick={() => setHasDiabetes(false)}
                >
                  NÃO
                </Button>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-blue-800 text-sm">
                <div className="flex items-start">
                  <HelpCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium mb-1">Critérios diagnósticos para Diabetes Mellitus:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Glicemia de jejum ≥ 126 mg/dL</li>
                      <li>Glicemia após 2h ≥ 200 mg/dL no teste oral de tolerância à glicose</li>
                      <li>Hemoglobina glicada (HbA1c) ≥ 6,5%</li>
                      <li>Glicemia casual ≥ 200 mg/dL com sintomas</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Subclinical atherosclerosis or equivalent conditions */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-xl font-medium text-center max-w-3xl mx-auto px-4 mb-6">
                <div className="inline-flex items-center justify-center bg-cardio-50 text-cardio-700 rounded-full w-10 h-10 mb-4">
                  <span className="font-bold">3</span>
                </div>
                <h3 className="text-xl font-medium mb-4">Condições Especiais</h3>
                <p className="text-gray-600">
                  Presença de aterosclerose subclínica ou condições clínicas equivalentes
                </p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                <h4 className="font-medium text-lg mb-3 text-cardio-700">O paciente apresenta alguma das seguintes condições?</h4>
                
                <div className="space-y-4 mb-6 text-gray-700">
                  <div className="flex items-start">
                    <Badge className="mt-0.5 mr-2 bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200">Condição 1</Badge>
                    <p>Aterosclerose subclínica documentada por:<br />
                    <span className="text-sm ml-6 block mt-1">• Ultrassonografia de carótidas com presença de placa<br />
                    • Índice tornozelo-braquial (ITB) &lt; 0,9<br />
                    • Escore de cálcio coronário (CAC) &gt; 100<br />
                    • Placas ateroscleróticas na angiotomografia coronária</span></p>
                  </div>
                  
                  <div className="flex items-start">
                    <Badge className="mt-0.5 mr-2 bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200">Condição 2</Badge>
                    <p>Aneurisma de aorta abdominal</p>
                  </div>
                  
                  <div className="flex items-start">
                    <Badge className="mt-0.5 mr-2 bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200">Condição 3</Badge>
                    <p>Doença renal crônica com taxa de filtração glomerular &lt; 60 mL/min (não dialítica)</p>
                  </div>
                  
                  <div className="flex items-start">
                    <Badge className="mt-0.5 mr-2 bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200">Condição 4</Badge>
                    <p>LDL-c ≥ 190 mg/dL</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                  <Button 
                    className={`h-12 px-8 text-base font-medium transition-all ${hasSubclinicalAtherosclerosis === true 
                      ? 'bg-cardio-600 hover:bg-cardio-700 text-white' 
                      : 'bg-white border-2 border-cardio-200 text-cardio-700 hover:bg-cardio-50'}`}
                    onClick={() => setHasSubclinicalAtherosclerosis(true)}
                  >
                    SIM
                  </Button>
                  <Button 
                    className={`h-12 px-8 text-base font-medium transition-all ${hasSubclinicalAtherosclerosis === false 
                      ? 'bg-cardio-600 hover:bg-cardio-700 text-white' 
                      : 'bg-white border-2 border-cardio-200 text-cardio-700 hover:bg-cardio-50'}`}
                    onClick={() => setHasSubclinicalAtherosclerosis(false)}
                  >
                    NÃO
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Risk factors */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-xl font-medium text-center max-w-3xl mx-auto px-4 mb-6">
                <div className="inline-flex items-center justify-center bg-cardio-50 text-cardio-700 rounded-full w-10 h-10 mb-4">
                  <span className="font-bold">4</span>
                </div>
                <h3 className="text-xl font-medium mb-4">Fatores de Risco</h3>
                <p className="text-gray-600">
                  Preencha os fatores de risco cardiovascular do paciente
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="gender" className="text-sm font-medium">Sexo</Label>
                  <Select value={gender || ""} onValueChange={setGender}>
                    <SelectTrigger id="gender" className="h-12">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="masculino">Masculino</SelectItem>
                      <SelectItem value="feminino">Feminino</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="age" className="text-sm font-medium">Idade</Label>
                  <Select value={age || ""} onValueChange={setAge}>
                    <SelectTrigger id="age" className="h-12">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="<45">&lt; 45 anos</SelectItem>
                      <SelectItem value="45-54">45-54 anos</SelectItem>
                      <SelectItem value="55-64">55-64 anos</SelectItem>
                      <SelectItem value="65-74">65-74 anos</SelectItem>
                      <SelectItem value="75+">≥ 75 anos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="sysbp" className="text-sm font-medium">Pressão Arterial Sistólica</Label>
                  <Select value={systolicBP || ""} onValueChange={setSystolicBP}>
                    <SelectTrigger id="sysbp" className="h-12">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="<130">&lt; 130 mmHg</SelectItem>
                      <SelectItem value="130-139">130-139 mmHg</SelectItem>
                      <SelectItem value="140-159">140-159 mmHg</SelectItem>
                      <SelectItem value="160+">≥ 160 mmHg</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="treatedbp" className="text-sm font-medium">Tratamento para Hipertensão</Label>
                  <Select value={treatedBP || ""} onValueChange={setTreatedBP}>
                    <SelectTrigger id="treatedbp" className="h-12">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sim">Sim</SelectItem>
                      <SelectItem value="nao">Não</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="smoking" className="text-sm font-medium">Tabagismo</Label>
                  <Select value={smoking || ""} onValueChange={setSmoking}>
                    <SelectTrigger id="smoking" className="h-12">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sim">Sim</SelectItem>
                      <SelectItem value="nao">Não</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="statin" className="text-sm font-medium">Uso de Estatina</Label>
                  <Select value={statin || ""} onValueChange={setStatin}>
                    <SelectTrigger id="statin" className="h-12">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sim">Sim</SelectItem>
                      <SelectItem value="nao">Não</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="tc" className="text-sm font-medium">Colesterol Total (mg/dL)</Label>
                  <Input 
                    id="tc" 
                    type="number" 
                    placeholder="Ex: 200" 
                    value={totalCholesterol}
                    onChange={(e) => setTotalCholesterol(e.target.value)}
                    className="h-12"
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="hdl" className="text-sm font-medium">HDL-Colesterol</Label>
                  <Select value={hdl || ""} onValueChange={setHdl}>
                    <SelectTrigger id="hdl" className="h-12">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="baixo">&lt; 40 mg/dL</SelectItem>
                      <SelectItem value="normal">40-60 mg/dL</SelectItem>
                      <SelectItem value="alto">&gt; 60 mg/dL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-blue-800 text-sm mt-6">
                <div className="flex">
                  <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
                  <p><span className="font-medium">Importante:</span> Todos os campos devem ser preenchidos para o cálculo correto do risco cardiovascular.</p>
                </div>
              </div>
            </div>
          )}

          {/* Results Screen */}
          {currentStep === 5 && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800">Resultado da Avaliação</h3>
                <p className="text-gray-500 mt-2">Estratificação de Risco Cardiovascular</p>
              </div>
              
              <div className="flex flex-col items-center justify-center space-y-6">
                <div className="text-center">
                  <p className="text-lg text-gray-600 mb-3">Classificação de risco:</p>
                  <div className={`inline-block text-2xl font-bold px-6 py-3 rounded-full shadow-md ${getRiskColor(risk)}`}>
                    {risk}
                  </div>
                </div>
                
                <div className="w-full max-w-md px-4">
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-5 border border-gray-200">
                    <div className="grid grid-cols-1 divide-y divide-gray-200">
                      <div className="py-3">
                        <div className="font-medium text-gray-800 mb-1">Tratamento</div>
                        <div className="text-gray-600">{statin === "sim" ? "Em uso de estatina" : "Sem tratamento atual"}</div>
                      </div>
                      
                      <div className="py-3">
                        <div className="font-medium text-gray-800 mb-1">Meta de Redução</div>
                        <div className="text-gray-600 font-bold">
                          {risk === "Baixo" && "≥ 30% (Se LDL-c ≥ 130 mg/dL)"}
                          {risk === "Moderado" && "≥ 50%"}
                          {risk === "Alto" && "≥ 50%"}
                          {risk === "Muito Alto" && "≥ 50%"}
                        </div>
                      </div>
                      
                      <div className="py-3">
                        <div className="font-medium text-gray-800 mb-1">Meta de LDL-c</div>
                        <div className="text-gray-600 font-bold">
                          {risk === "Baixo" && "< 130 mg/dL"}
                          {risk === "Moderado" && "< 100 mg/dL"}
                          {risk === "Alto" && "< 70 mg/dL"}
                          {risk === "Muito Alto" && "< 50 mg/dL"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="w-full max-w-lg bg-white rounded-lg border border-gray-200 shadow-sm p-5 mt-4">
                  <h4 className="font-medium text-lg mb-4 text-cardio-700">Tratamento Recomendado</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-cardio-50 p-4 rounded-md">
                      <h5 className="font-medium text-cardio-700 mb-2">Estatinas de Moderada Intensidade</h5>
                      <ul className="text-sm space-y-1 text-gray-700">
                        <li>• Lovastatina 40 mg</li>
                        <li>• Sinvastatina 20-40 mg</li>
                        <li>• Pravastatina 40-80 mg</li>
                        <li>• Fluvastatina 80 mg</li>
                        <li>• Pitavastatina 2-4 mg</li>
                      </ul>
                    </div>
                    
                    <div className="bg-cardio-50 p-4 rounded-md">
                      <h5 className="font-medium text-cardio-700 mb-2">Estatinas de Alta Intensidade</h5>
                      <ul className="text-sm space-y-1 text-gray-700">
                        <li>• Atorvastatina 40-80 mg</li>
                        <li>• Rosuvastatina 20-40 mg</li>
                        <li>• Atorvastatina 10-20 mg <span className="text-xs">(moderada)</span></li>
                        <li>• Rosuvastatina 5-10 mg <span className="text-xs">(moderada)</span></li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Orientação:</span> As estatinas são a primeira escolha para tratamento da dislipidemia em pacientes com risco cardiovascular elevado. A escolha da intensidade depende da classificação de risco e da meta de LDL-c a ser atingida.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-10">
            {currentStep > 1 && currentStep <= 5 ? (
              <Button
                variant="outline"
                onClick={currentStep === 5 ? resetCalculator : handlePreviousStep}
                className="flex items-center hover:bg-cardio-50 hover:text-cardio-700 border-cardio-200"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                {currentStep === 5 ? "RECOMEÇAR" : "VOLTAR"}
              </Button>
            ) : (
              <div></div>
            )}

            {currentStep < 5 && (
              <Button
                onClick={handleNextStep}
                className="bg-cardio-600 hover:bg-cardio-700 flex items-center ml-auto text-white shadow-md"
              >
                {currentStep === 4 ? "CALCULAR RISCO" : "AVANÇAR"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* SBC Branding Footer */}
      <div className="text-center text-sm text-gray-500 mt-6 pt-6 border-t border-gray-100">
        <p>Calculadora baseada nas diretrizes da Sociedade Brasileira de Cardiologia - SBC 2023</p>
      </div>
    </div>
  );
}
