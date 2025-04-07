
import { useState } from "react";
import { Activity, ArrowLeft, ArrowRight, HelpCircle } from "lucide-react";
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
        return "bg-green-500 text-white";
      case "Moderado":
        return "bg-yellow-500 text-white";
      case "Alto":
        return "bg-orange-500 text-white";
      case "Muito Alto":
        return "bg-red-500 text-white";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gradient-cardio mb-1">Calculadora de Risco</h1>
          <p className="text-muted-foreground">Estratificação de Risco Cardiovascular - SBC</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader className="bg-gradient-to-r from-cardio-600 to-cardio-700 text-white pb-2">
            <CardTitle className="text-white font-semibold">
              CALCULADORA PARA ESTRATIFICAÇÃO DE RISCO CARDIOVASCULAR
            </CardTitle>
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm">Etapa</div>
              <div className="flex space-x-2">
                {[1, 2, 3, 4].map((step) => (
                  <span 
                    key={step} 
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-sm
                      ${currentStep === step ? 'bg-white text-cardio-600 font-bold' : 'bg-white/20 text-white'}`}
                  >
                    {step}
                  </span>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {/* Step 1: Atherosclerotic disease */}
            {currentStep === 1 && (
              <div className="space-y-8">
                <div className="text-lg font-medium text-center max-w-3xl mx-auto">
                  Presença de doença aterosclerótica significativa (coronária, cerebrovascular, 
                  vascular periférica), com ou sem eventos clínicos ou obstrução ≥ 50% em qualquer território arterial?
                </div>
                
                <div className="flex justify-center gap-4 mt-8">
                  <Button 
                    className={`w-32 ${hasAtheroscleroticDisease === true ? 'bg-cardio-600' : 'bg-teal-600'}`}
                    onClick={() => setHasAtheroscleroticDisease(true)}
                  >
                    SIM
                  </Button>
                  <Button 
                    className={`w-32 ${hasAtheroscleroticDisease === false ? 'bg-cardio-600' : 'bg-teal-600'}`}
                    onClick={() => setHasAtheroscleroticDisease(false)}
                  >
                    NÃO
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Diabetes */}
            {currentStep === 2 && (
              <div className="space-y-8">
                <div className="text-lg font-medium text-center max-w-3xl mx-auto">
                  Portador de Diabetes Melito tipo 1 ou Tipo 2?
                </div>
                
                <div className="flex justify-center gap-4 mt-8">
                  <Button 
                    className={`w-32 ${hasDiabetes === true ? 'bg-cardio-600' : 'bg-teal-600'}`}
                    onClick={() => setHasDiabetes(true)}
                  >
                    SIM
                  </Button>
                  <Button 
                    className={`w-32 ${hasDiabetes === false ? 'bg-cardio-600' : 'bg-teal-600'}`}
                    onClick={() => setHasDiabetes(false)}
                  >
                    NÃO
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Subclinical atherosclerosis or equivalent conditions */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-lg font-medium">
                  Portadores de aterosclerose na forma subclínica documentada por metodologia diagnóstica:
                </div>
                
                <div className="space-y-2 pl-4">
                  <div className="text-gray-700">- ultrassonografia de carótidas com presença de placa;</div>
                  <div className="text-gray-700">- índice tornozelo-braquial (ITB) &lt; 0,9;</div>
                  <div className="text-gray-700">- escore de cálcio coronário (CAC) &gt; 100 ou a presença de placas ateroscleróticas 
                    na angiotomografia de coronárias (angioCT)</div>
                </div>
                
                <div className="text-center py-2 text-gray-500 italic">OU</div>
                
                <div className="text-gray-700">Aneurisma de aorta abdominal</div>
                
                <div className="text-center py-2 text-gray-500 italic">OU</div>
                
                <div className="text-gray-700">Doença renal crônica definida por taxa de filtração glomerular &lt; 60 mL/min, e em fase não-dialítica</div>
                
                <div className="text-center py-2 text-gray-500 italic">OU</div>
                
                <div className="text-gray-700">LDL-c ≥ 190 mg/dL</div>
                
                <div className="flex justify-center gap-4 mt-6">
                  <Button 
                    className={`w-32 ${hasSubclinicalAtherosclerosis === true ? 'bg-cardio-600' : 'bg-teal-600'}`}
                    onClick={() => setHasSubclinicalAtherosclerosis(true)}
                  >
                    SIM
                  </Button>
                  <Button 
                    className={`w-32 ${hasSubclinicalAtherosclerosis === false ? 'bg-cardio-600' : 'bg-teal-600'}`}
                    onClick={() => setHasSubclinicalAtherosclerosis(false)}
                  >
                    NÃO
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Risk factors */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="gender">Sexo</Label>
                    <Select value={gender || ""} onValueChange={setGender}>
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="masculino">Masculino</SelectItem>
                        <SelectItem value="feminino">Feminino</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="age">Idade</Label>
                    <Select value={age || ""} onValueChange={setAge}>
                      <SelectTrigger id="age">
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
                  
                  <div className="space-y-2">
                    <Label htmlFor="sysbp">PAS</Label>
                    <Select value={systolicBP || ""} onValueChange={setSystolicBP}>
                      <SelectTrigger id="sysbp">
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
                  
                  <div className="space-y-2">
                    <Label htmlFor="treatedbp">PAS-Tratada</Label>
                    <Select value={treatedBP || ""} onValueChange={setTreatedBP}>
                      <SelectTrigger id="treatedbp">
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sim">Sim</SelectItem>
                        <SelectItem value="nao">Não</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="smoking">Fumo</Label>
                    <Select value={smoking || ""} onValueChange={setSmoking}>
                      <SelectTrigger id="smoking">
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sim">Sim</SelectItem>
                        <SelectItem value="nao">Não</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="statin">Toma Estatina?</Label>
                    <Select value={statin || ""} onValueChange={setStatin}>
                      <SelectTrigger id="statin">
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sim">Sim</SelectItem>
                        <SelectItem value="nao">Não</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tc">CT (mg/dL)</Label>
                    <Input 
                      id="tc" 
                      type="number" 
                      placeholder="Ex: 200" 
                      value={totalCholesterol}
                      onChange={(e) => setTotalCholesterol(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="hdl">HDL-C</Label>
                    <Select value={hdl || ""} onValueChange={setHdl}>
                      <SelectTrigger id="hdl">
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
              </div>
            )}

            {/* Results Screen */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="text-2xl font-bold text-center mb-6">Resultado</div>
                
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="text-lg">RISCO:</div>
                  <div className={`text-2xl font-bold px-16 py-2 rounded-full ${getRiskColor(risk)}`}>
                    {risk}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="col-span-2 bg-teal-600 text-white p-3 text-center font-medium rounded-md">
                    {statin === "sim" ? "USANDO ESTATINA" : "SEM TRATAMENTO"}
                  </div>
                  
                  <div className="bg-teal-600 text-white p-3 text-center font-medium rounded-md">
                    META REDUÇÃO<br />PERCENTUAL (%)
                  </div>
                  <div className="bg-teal-600 text-white p-3 text-center font-medium rounded-md">
                    META LDL-c<br />(mg/dL)
                  </div>
                  
                  <div className="bg-yellow-100 p-3 text-center font-bold rounded-md border border-yellow-200">
                    {risk === "Baixo" && "&gt; 30%"}
                    {risk === "Moderado" && "&gt; 50%"}
                    {risk === "Alto" && "&gt; 50%"}
                    {risk === "Muito Alto" && "&gt; 50%"}
                    <div className="text-sm font-normal mt-1">
                      {risk === "Baixo" && "Se LDL-c ≥ 130 mg/dL"}
                    </div>
                  </div>
                  
                  <div className="bg-yellow-100 p-3 text-center font-bold rounded-md border border-yellow-200">
                    {risk === "Baixo" && "&lt; 130"}
                    {risk === "Moderado" && "&lt; 100"}
                    {risk === "Alto" && "&lt; 70"}
                    {risk === "Muito Alto" && "&lt; 50"}
                  </div>
                </div>
                
                <div className="mt-8">
                  <div className="bg-teal-600 text-white p-3 text-center font-medium rounded-md mb-4">
                    TRATAMENTO RECOMENDADO
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-teal-200 rounded-md p-3 text-center">
                      <div className="text-sm text-gray-600 mb-2">(doses diárias em mg)</div>
                    </div>
                    
                    <div className="border border-teal-200 rounded-md p-3">
                      <div className="space-y-1">
                        <div>Lovastatina 40</div>
                        <div>Sinvastatina 20-40</div>
                        <div>Pravastatina 40-80</div>
                        <div>Fluvastatina 80</div>
                        <div>Pitavastatina 2-4</div>
                        <div>Atorvastatina 10-20</div>
                        <div>Rosuvastatina 5-10</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 1 && currentStep <= 5 ? (
                <Button
                  variant="outline"
                  onClick={currentStep === 5 ? resetCalculator : handlePreviousStep}
                  className="flex items-center"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {currentStep === 5 ? "VOLTAR AO INÍCIO" : "VOLTAR"}
                </Button>
              ) : (
                <div></div>
              )}

              {currentStep < 5 && (
                <Button
                  onClick={handleNextStep}
                  className="bg-cardio-600 hover:bg-cardio-700 flex items-center ml-auto"
                >
                  {currentStep === 4 ? "CALCULAR" : "PROSSEGUIR"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Logos Footer */}
      <div className="flex justify-center items-center space-x-8 py-4 bg-white rounded-lg">
        <div className="opacity-70">
          <img src="/lovable-uploads/3ceba0ba-1da5-4f60-9674-99eed74fd71d.png" alt="SBC Logo" className="h-12" />
        </div>
        <div className="opacity-70">
          <img src="/lovable-uploads/38d00615-5e52-447c-bc36-43ab3b347cd1.png" alt="Aterosclerose Logo" className="h-10" />
        </div>
        <div className="opacity-70">
          <img src="/lovable-uploads/be4c173f-607c-440b-ad0b-c1127c648ddf.png" alt="SBEM Logo" className="h-10" />
        </div>
        <div className="opacity-70">
          <img src="/lovable-uploads/65168c35-bf6e-4db9-8290-44ed4c129a77.png" alt="SBD Logo" className="h-10" />
        </div>
        <div className="opacity-70">
          <img src="/lovable-uploads/0e27c807-e73c-4830-bd30-28d7fb0c4361.png" alt="Sponsors" className="h-8" />
        </div>
      </div>
    </div>
  );
}
