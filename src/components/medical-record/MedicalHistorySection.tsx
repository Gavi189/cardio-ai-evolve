
import { useState } from "react";
import { 
  Heart, Pill, Activity, Cigarette, Wine, Users, 
  Syringe, UserRound, Gift 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MedicalHistory } from "@/types/patient";

interface MedicalHistorySectionProps {
  history: MedicalHistory;
  setHistory: React.Dispatch<React.SetStateAction<MedicalHistory>>;
}

export const MedicalHistorySection = ({ history, setHistory }: MedicalHistorySectionProps) => {
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
