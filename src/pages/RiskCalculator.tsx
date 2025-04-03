
import { useEffect, useState } from "react";
import { 
  Activity, ChevronRight, HeartPulse, HelpCircle, LineChart, PlusCircle
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { useToast } from "@/hooks/use-toast";

export default function RiskCalculator() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("heart");
  const [score, setScore] = useState<number | null>(null);
  const [risk, setRisk] = useState<string>("");
  
  // HEART Score
  const [history, setHistory] = useState<string | null>(null);
  const [ecg, setEcg] = useState<string | null>(null);
  const [age, setAge] = useState<string | null>(null);
  const [riskFactors, setRiskFactors] = useState<string | null>(null);
  const [troponin, setTroponin] = useState<string | null>(null);
  
  // Framingham
  const [gender, setGender] = useState<string | null>(null);
  const [ageFramingham, setAgeFramingham] = useState<string>("");
  const [cholesterol, setCholesterol] = useState<string>("");
  const [hdl, setHdl] = useState<string>("");
  const [systolic, setSystolic] = useState<string>("");
  const [smoker, setSmoker] = useState<string | null>(null);
  const [diabetes, setDiabetes] = useState<string | null>(null);

  // CHA₂DS₂-VASc
  const [chf, setChf] = useState<boolean>(false);
  const [hypertension, setHypertension] = useState<boolean>(false);
  const [ageCha, setAgeCha] = useState<string | null>(null);
  const [diabetesCha, setDiabetesCha] = useState<boolean>(false);
  const [stroke, setStroke] = useState<boolean>(false);
  const [vascularDisease, setVascularDisease] = useState<boolean>(false);
  const [genderCha, setGenderCha] = useState<string | null>(null);

  const calculateHEARTScore = () => {
    if (!history || !ecg || !age || !riskFactors || !troponin) {
      toast({
        title: "Dados incompletos",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    // Cálculo do HEART Score
    const historyValue = parseInt(history);
    const ecgValue = parseInt(ecg);
    const ageValue = parseInt(age);
    const riskFactorsValue = parseInt(riskFactors);
    const troponinValue = parseInt(troponin);

    const totalScore = historyValue + ecgValue + ageValue + riskFactorsValue + troponinValue;
    setScore(totalScore);

    // Classificação de risco
    if (totalScore <= 3) {
      setRisk("Baixo");
    } else if (totalScore <= 6) {
      setRisk("Moderado");
    } else {
      setRisk("Alto");
    }

    toast({
      title: "Score HEART calculado",
      description: `Pontuação: ${totalScore} - Risco: ${totalScore <= 3 ? "Baixo" : totalScore <= 6 ? "Moderado" : "Alto"}`,
    });
  };

  const calculateFramingham = () => {
    if (!gender || !ageFramingham || !cholesterol || !hdl || !systolic || !smoker || !diabetes) {
      toast({
        title: "Dados incompletos",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    // Cálculo simplificado do Framingham
    // Em um sistema real, seria implementado o algoritmo completo
    let totalScore = 0;
    
    // Age points
    const ageValue = parseInt(ageFramingham);
    if (ageValue >= 60) totalScore += 3;
    else if (ageValue >= 50) totalScore += 2;
    else if (ageValue >= 40) totalScore += 1;
    
    // Cholesterol points
    const cholValue = parseInt(cholesterol);
    if (cholValue > 240) totalScore += 2;
    else if (cholValue >= 200) totalScore += 1;
    
    // HDL points
    const hdlValue = parseInt(hdl);
    if (hdlValue < 40) totalScore += 1;
    else if (hdlValue > 60) totalScore -= 1;
    
    // BP points
    const systolicValue = parseInt(systolic);
    if (systolicValue >= 160) totalScore += 2;
    else if (systolicValue >= 140) totalScore += 1;
    
    // Additional factors
    if (smoker === "yes") totalScore += 1;
    if (diabetes === "yes") totalScore += 2;
    
    setScore(totalScore);
    
    // Simplified risk classification
    if (totalScore <= 2) {
      setRisk("Baixo");
    } else if (totalScore <= 5) {
      setRisk("Moderado");
    } else {
      setRisk("Alto");
    }

    toast({
      title: "Risco cardiovascular Framingham",
      description: `Pontuação: ${totalScore} - Risco: ${totalScore <= 2 ? "Baixo" : totalScore <= 5 ? "Moderado" : "Alto"}`,
    });
  };

  const calculateCHADS = () => {
    if (!ageCha || !genderCha) {
      toast({
        title: "Dados incompletos",
        description: "Por favor, selecione a idade e o gênero do paciente.",
        variant: "destructive",
      });
      return;
    }

    // Cálculo do CHA₂DS₂-VASc Score
    let totalScore = 0;
    
    if (chf) totalScore += 1;
    if (hypertension) totalScore += 1;
    
    const ageValue = ageCha;
    if (ageValue === "75+") totalScore += 2;
    else if (ageValue === "65-74") totalScore += 1;
    
    if (diabetesCha) totalScore += 1;
    if (stroke) totalScore += 2;
    if (vascularDisease) totalScore += 1;
    if (genderCha === "female") totalScore += 1;
    
    setScore(totalScore);
    
    // Risk classification
    if (totalScore === 0) {
      setRisk("Baixo");
    } else if (totalScore === 1) {
      setRisk("Baixo-Moderado");
    } else if (totalScore <= 3) {
      setRisk("Moderado");
    } else {
      setRisk("Alto");
    }

    toast({
      title: "CHA₂DS₂-VASc Score calculado",
      description: `Pontuação: ${totalScore} - Risco de AVC: ${totalScore === 0 ? "Baixo" : totalScore === 1 ? "Baixo-Moderado" : totalScore <= 3 ? "Moderado" : "Alto"}`,
    });
  };

  useEffect(() => {
    setScore(null);
    setRisk("");
  }, [activeTab]);

  const getRiskColorClass = (riskLevel: string) => {
    switch(riskLevel) {
      case "Baixo":
      case "Baixo-Moderado":
        return "risk-low";
      case "Moderado":
        return "risk-medium";
      case "Alto":
        return "risk-high";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gradient-cardio mb-1">Calculadora de Risco</h1>
          <p className="text-muted-foreground">Avaliação de risco cardiovascular do paciente</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 border-b rounded-none h-14">
                <TabsTrigger value="heart" className="flex items-center gap-2 data-[state=active]:text-cardio-600">
                  <HeartPulse className="h-4 w-4" />
                  HEART Score
                </TabsTrigger>
                <TabsTrigger value="framingham" className="flex items-center gap-2 data-[state=active]:text-cardio-600">
                  <LineChart className="h-4 w-4" />
                  Framingham
                </TabsTrigger>
                <TabsTrigger value="chads" className="flex items-center gap-2 data-[state=active]:text-cardio-600">
                  <Activity className="h-4 w-4" />
                  CHA₂DS₂-VASc
                </TabsTrigger>
              </TabsList>
              
              <div className="p-6">
                {/* HEART Score */}
                <TabsContent value="heart" className="mt-0 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="flex items-center gap-1 mb-2">
                        História Clínica
                        <HoverCard>
                          <HoverCardTrigger>
                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                          </HoverCardTrigger>
                          <HoverCardContent>
                            <p className="text-sm">
                              <strong>0 pontos:</strong> Não sugestivo<br />
                              <strong>1 ponto:</strong> Moderadamente sugestivo<br />
                              <strong>2 pontos:</strong> Altamente sugestivo
                            </p>
                          </HoverCardContent>
                        </HoverCard>
                      </Label>
                      <RadioGroup value={history || ""} onValueChange={setHistory}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="0" id="h0" />
                          <Label htmlFor="h0">Não sugestivo (0 pts)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="1" id="h1" />
                          <Label htmlFor="h1">Moderadamente sugestivo (1 pt)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="2" id="h2" />
                          <Label htmlFor="h2">Altamente sugestivo (2 pts)</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div>
                      <Label className="flex items-center gap-1 mb-2">
                        ECG
                        <HoverCard>
                          <HoverCardTrigger>
                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                          </HoverCardTrigger>
                          <HoverCardContent>
                            <p className="text-sm">
                              <strong>0 pontos:</strong> Normal<br />
                              <strong>1 ponto:</strong> Anormalidade não específica<br />
                              <strong>2 pontos:</strong> Alterações isquêmicas
                            </p>
                          </HoverCardContent>
                        </HoverCard>
                      </Label>
                      <RadioGroup value={ecg || ""} onValueChange={setEcg}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="0" id="e0" />
                          <Label htmlFor="e0">Normal (0 pts)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="1" id="e1" />
                          <Label htmlFor="e1">Anormalidade não específica (1 pt)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="2" id="e2" />
                          <Label htmlFor="e2">Alterações isquêmicas (2 pts)</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div>
                      <Label className="flex items-center gap-1 mb-2">Idade</Label>
                      <RadioGroup value={age || ""} onValueChange={setAge}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="0" id="a0" />
                          <Label htmlFor="a0">Menos de 45 anos (0 pts)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="1" id="a1" />
                          <Label htmlFor="a1">Entre 45-65 anos (1 pt)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="2" id="a2" />
                          <Label htmlFor="a2">Acima de 65 anos (2 pts)</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div>
                      <Label className="flex items-center gap-1 mb-2">
                        Fatores de Risco
                        <HoverCard>
                          <HoverCardTrigger>
                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                          </HoverCardTrigger>
                          <HoverCardContent className="w-80">
                            <p className="text-sm">
                              Fatores de risco: hipertensão, dislipidemia, diabetes, tabagismo, obesidade e histórico familiar.
                              <br /><br />
                              <strong>0 pontos:</strong> Sem fatores de risco<br />
                              <strong>1 ponto:</strong> 1-2 fatores de risco<br />
                              <strong>2 pontos:</strong> ≥3 fatores de risco ou aterosclerose conhecida
                            </p>
                          </HoverCardContent>
                        </HoverCard>
                      </Label>
                      <RadioGroup value={riskFactors || ""} onValueChange={setRiskFactors}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="0" id="r0" />
                          <Label htmlFor="r0">Sem fatores (0 pts)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="1" id="r1" />
                          <Label htmlFor="r1">1-2 fatores (1 pt)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="2" id="r2" />
                          <Label htmlFor="r2">≥3 fatores ou aterosclerose (2 pts)</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div>
                      <Label className="flex items-center gap-1 mb-2">
                        Troponina
                        <HoverCard>
                          <HoverCardTrigger>
                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                          </HoverCardTrigger>
                          <HoverCardContent>
                            <p className="text-sm">
                              <strong>0 pontos:</strong> ≤ limite normal<br />
                              <strong>1 ponto:</strong> 1-3x limite normal<br />
                              <strong>2 pontos:</strong> &gt;3x limite normal
                            </p>
                          </HoverCardContent>
                        </HoverCard>
                      </Label>
                      <RadioGroup value={troponin || ""} onValueChange={setTroponin}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="0" id="t0" />
                          <Label htmlFor="t0">≤ limite normal (0 pts)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="1" id="t1" />
                          <Label htmlFor="t1">1-3x limite normal (1 pt)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="2" id="t2" />
                          <Label htmlFor="t2">&gt;3x limite normal (2 pts)</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                  
                  <Button className="bg-cardio-600 hover:bg-cardio-700 w-full" onClick={calculateHEARTScore}>
                    Calcular Score HEART
                  </Button>
                </TabsContent>
                
                {/* Framingham */}
                <TabsContent value="framingham" className="mt-0 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="mb-2">Gênero</Label>
                      <RadioGroup value={gender || ""} onValueChange={setGender}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="male" id="gm" />
                          <Label htmlFor="gm">Masculino</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="female" id="gf" />
                          <Label htmlFor="gf">Feminino</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="age-f">Idade (anos)</Label>
                      <Input 
                        id="age-f" 
                        type="number" 
                        placeholder="Ex: 55" 
                        value={ageFramingham}
                        onChange={(e) => setAgeFramingham(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cholesterol">Colesterol Total (mg/dL)</Label>
                      <Input 
                        id="cholesterol" 
                        type="number" 
                        placeholder="Ex: 220" 
                        value={cholesterol}
                        onChange={(e) => setCholesterol(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="hdl">HDL (mg/dL)</Label>
                      <Input 
                        id="hdl" 
                        type="number" 
                        placeholder="Ex: 45" 
                        value={hdl}
                        onChange={(e) => setHdl(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="systolic">Pressão Arterial Sistólica (mmHg)</Label>
                      <Input 
                        id="systolic" 
                        type="number" 
                        placeholder="Ex: 130" 
                        value={systolic}
                        onChange={(e) => setSystolic(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label className="mb-2">Tabagista</Label>
                      <RadioGroup value={smoker || ""} onValueChange={setSmoker}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="sy" />
                          <Label htmlFor="sy">Sim</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="sn" />
                          <Label htmlFor="sn">Não</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div>
                      <Label className="mb-2">Diabetes</Label>
                      <RadioGroup value={diabetes || ""} onValueChange={setDiabetes}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="dy" />
                          <Label htmlFor="dy">Sim</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="dn" />
                          <Label htmlFor="dn">Não</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                  
                  <Button className="bg-cardio-600 hover:bg-cardio-700 w-full" onClick={calculateFramingham}>
                    Calcular Risco Framingham
                  </Button>
                </TabsContent>
                
                {/* CHA₂DS₂-VASc */}
                <TabsContent value="chads" className="mt-0 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="mb-2">Insuficiência Cardíaca Congestiva</Label>
                      <RadioGroup value={chf ? "yes" : "no"} onValueChange={(v) => setChf(v === "yes")}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="chfy" />
                          <Label htmlFor="chfy">Sim (1 pt)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="chfn" />
                          <Label htmlFor="chfn">Não (0 pts)</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div>
                      <Label className="mb-2">Hipertensão</Label>
                      <RadioGroup value={hypertension ? "yes" : "no"} onValueChange={(v) => setHypertension(v === "yes")}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="hty" />
                          <Label htmlFor="hty">Sim (1 pt)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="htn" />
                          <Label htmlFor="htn">Não (0 pts)</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div>
                      <Label className="mb-2">Idade</Label>
                      <RadioGroup value={ageCha || ""} onValueChange={setAgeCha}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="<65" id="age1" />
                          <Label htmlFor="age1">&lt; 65 anos (0 pts)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="65-74" id="age2" />
                          <Label htmlFor="age2">65-74 anos (1 pt)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="75+" id="age3" />
                          <Label htmlFor="age3">≥ 75 anos (2 pts)</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div>
                      <Label className="mb-2">Diabetes</Label>
                      <RadioGroup value={diabetesCha ? "yes" : "no"} onValueChange={(v) => setDiabetesCha(v === "yes")}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="diaby" />
                          <Label htmlFor="diaby">Sim (1 pt)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="diabn" />
                          <Label htmlFor="diabn">Não (0 pts)</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div>
                      <Label className="mb-2">AVC/AIT/Tromboembolismo prévio</Label>
                      <RadioGroup value={stroke ? "yes" : "no"} onValueChange={(v) => setStroke(v === "yes")}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="stry" />
                          <Label htmlFor="stry">Sim (2 pts)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="strn" />
                          <Label htmlFor="strn">Não (0 pts)</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div>
                      <Label className="mb-2">Doença Vascular</Label>
                      <RadioGroup value={vascularDisease ? "yes" : "no"} onValueChange={(v) => setVascularDisease(v === "yes")}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="vdy" />
                          <Label htmlFor="vdy">Sim (1 pt)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="vdn" />
                          <Label htmlFor="vdn">Não (0 pts)</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div>
                      <Label className="mb-2">Gênero</Label>
                      <RadioGroup value={genderCha || ""} onValueChange={setGenderCha}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="male" id="cham" />
                          <Label htmlFor="cham">Masculino (0 pts)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="female" id="chaf" />
                          <Label htmlFor="chaf">Feminino (1 pt)</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                  
                  <Button className="bg-cardio-600 hover:bg-cardio-700 w-full" onClick={calculateCHADS}>
                    Calcular CHA₂DS₂-VASc Score
                  </Button>
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2 text-cardio-600" />
              Resultado
            </CardTitle>
            <CardDescription>
              {activeTab === "heart" && "Score HEART para Dor Torácica"}
              {activeTab === "framingham" && "Risco cardiovascular em 10 anos"}
              {activeTab === "chads" && "Risco de AVC em fibrilação atrial"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {score !== null ? (
              <div className="space-y-6">
                <div className="flex flex-col items-center">
                  <div className="text-lg text-muted-foreground mb-2">Score</div>
                  <div className="text-5xl font-bold text-cardio-600">{score}</div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="text-lg text-muted-foreground mb-2">Risco</div>
                  <div className={`text-2xl font-bold px-4 py-2 rounded-full ${getRiskColorClass(risk)}`}>
                    {risk}
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-3">Recomendação Clínica:</p>
                  {activeTab === "heart" && (
                    <div className="text-sm">
                      {score <= 3 && (
                        <p>Baixo risco de eventos cardíacos adversos. Considerar alta sem necessidade de exames adicionais.</p>
                      )}
                      {score > 3 && score <= 6 && (
                        <p>Risco moderado. Recomenda-se observação e possíveis testes não invasivos adicionais.</p>
                      )}
                      {score > 6 && (
                        <p>Alto risco. Recomenda-se internação e avaliação invasiva com possível angiografia coronária.</p>
                      )}
                    </div>
                  )}
                  
                  {activeTab === "framingham" && (
                    <div className="text-sm">
                      {score <= 2 && (
                        <p>Risco baixo. Manter hábitos saudáveis e avaliação regular.</p>
                      )}
                      {score > 2 && score <= 5 && (
                        <p>Risco moderado. Considerar controle agressivo de fatores de risco e estatinas.</p>
                      )}
                      {score > 5 && (
                        <p>Risco alto. Indicado tratamento intensivo de fatores de risco e medidas preventivas.</p>
                      )}
                    </div>
                  )}
                  
                  {activeTab === "chads" && (
                    <div className="text-sm">
                      {score === 0 && (
                        <p>Risco baixo de AVC. Considerar nenhum anticoagulante ou AAS.</p>
                      )}
                      {score === 1 && (
                        <p>Risco baixo-moderado. Considerar anticoagulação oral ou AAS.</p>
                      )}
                      {score > 1 && (
                        <p>Risco moderado a alto. Recomendada anticoagulação oral (ex: varfarina, NOAC).</p>
                      )}
                    </div>
                  )}
                </div>
                
                <Button className="w-full flex items-center justify-center" variant="outline">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Adicionar ao prontuário
                </Button>
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-muted-foreground">
                <div className="text-center mb-4">
                  <Activity className="h-12 w-12 mx-auto mb-2 text-muted" />
                  <p>Preencha os dados necessários e calcule o score</p>
                </div>
                
                <Button variant="link" className="text-cardio-600 flex items-center" onClick={() => {
                  document.querySelectorAll(".tabs-list button")[0].scrollIntoView({ behavior: "smooth" });
                }}>
                  Ir para formulário
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
