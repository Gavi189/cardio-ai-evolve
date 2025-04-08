
import { useState } from "react";
import { Brain, Lightbulb, List, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Textarea } from "@/components/ui/textarea";
import { useMediaQuery } from "@/hooks/use-media-query";

type MedicalRecordEditorProps = {
  content: string; 
  onContentChange: (val: string) => void;
  autofilled?: boolean;
};

export const MedicalRecordEditor = ({ 
  content, 
  onContentChange, 
  autofilled 
}: MedicalRecordEditorProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  
  const suggestions = [
    {
      id: "hda-1",
      title: "HDA - Dor Torácica",
      text: "Paciente masculino, 54 anos, hipertenso e diabético, refere dor torácica retroesternal há 2 dias, de início súbito, do tipo opressiva, com intensidade 7/10, irradiada para membro superior esquerdo. Refere piora aos esforços e melhora com repouso. Sintomas associados: dispneia aos médios esforços e sudorese. Informa uso irregular de anti-hipertensivos. Nega febre, síncope ou palpitações. História prévia de angina estável diagnosticada há 3 anos, em uso de AAS e estatina. Relata estresse no trabalho na última semana."
    },
    {
      id: "hda-2",
      title: "HDA - Dispneia",
      text: "Paciente feminina, 68 anos, portadora de insuficiência cardíaca crônica (FEVE 40%), relata piora progressiva da dispneia nos últimos 7 dias, evoluindo de classe funcional II para III (NYHA). Refere ortopneia (usando 3 travesseiros) e dispneia paroxística noturna. Observou edema progressivo em membros inferiores e aumento de 2kg em 3 dias. Associado a isso, notou redução do volume urinário. Admite ter ingerido alimentos com alto teor de sódio durante festa familiar no fim de semana e não ter tomado o diurético corretamente nos últimos 5 dias."
    },
    {
      id: "soap-1",
      title: "SOAP Completo - Consulta de Rotina",
      text: "S: Paciente feminina, 64 anos, comparece para consulta de rotina. Refere sentir-se bem, sem queixas cardiovasculares específicas. Nega dor torácica, dispneia, palpitações ou síncope. Afirma estar aderente às medicações prescritas. Refere sono adequado e prática de caminhadas leves 3x/semana por 30 minutos. Alimentação com controle moderado de sódio. Nega uso de álcool ou tabaco.\n\nO: PA: 132/78 mmHg, FC: 68 bpm, FR: 16 irpm, SpO2: 97%, Peso: 65kg (estável). Ausculta cardíaca: ritmo regular, bulhas normofonéticas, sem sopros. Ausculta pulmonar: murmúrio vesicular presente bilateralmente, sem ruídos adventícios. MMII sem edemas, pulsos periféricos simétricos e presentes.\n\nA: Hipertensão arterial controlada. Dislipidemia em tratamento. Prevenção primária de doença cardiovascular.\n\nP: 1. Manter anti-hipertensivos atuais (Losartana 50mg 2x/dia e Anlodipino 5mg 1x/dia)\n2. Manter Rosuvastatina 10mg 1x/dia\n3. Solicitar perfil lipídico e função renal\n4. Reforçar orientações sobre alimentação saudável e atividade física\n5. Retorno em 4 meses"
    },
    {
      id: "soap-2",
      title: "SOAP - Descompensação de IC",
      text: "S: Paciente masculino, 72 anos, com IC (FEVE 35%), refere piora da dispneia nos últimos 5 dias, evoluindo para classe funcional III. Relata ortopneia, DPN e edema progressivo em MMII. Admite ter abandonado o diurético há 1 semana por conta própria. Nega dor torácica, síncope ou febre.\n\nO: PA: 145/90 mmHg, FC: 88 bpm, FR: 22 irpm, SpO2: 94%. Ausculta cardíaca: ritmo regular, B3 presente, sem sopros. Ausculta pulmonar: estertores crepitantes em bases pulmonares bilateralmente. Edema de MMII ++/4+, cacifo positivo.\n\nA: Insuficiência cardíaca descompensada por má adesão medicamentosa.\n\nP: 1. Reiniciar Furosemida 40mg 2x/dia\n2. Ajustar betabloqueador: reduzir dose temporariamente para metade\n3. Orientar controle rigoroso de peso diário\n4. Reforçar restrição hídrica (1,5L/dia) e dieta hipossódica\n5. Retorno em 7 dias para reavaliação"
    }
  ];
  
  const clinicalAssistantSuggestions = [
    "Solicitar dosagem de troponina e D-dímero considerando a dor torácica",
    "Considerar ajuste na dose de Atorvastatina para 40mg",
    "Recomendar exame de ECG de controle em 30 dias",
    "Avaliar necessidade de teste ergométrico",
    "Considerar adição de nitrato para controle sintomático da angina",
    "Verificar interação medicamentosa entre captopril e espironolactona"
  ];

  const hdaTemplates = [
    {
      title: "Modelo Narrativo - HDA",
      content: `[Idade, sexo, estado prévio] refere [sintoma principal] há [tempo de início], em [localização], de início [súbito/gradual], com intensidade [leve/moderada/grave], tipo [característica da dor/sintoma], que [fatores de piora/melhora]. 

Relata [sintomas associados]. Menciona [medicações em uso/tentativas de tratamento]. [História pregressa relacionada]. [Fatores contextuais relevantes].`
    },
    {
      title: "Modelo SOAP",
      content: `S (Subjetivo): Queixas do paciente, HDA, revisão por sistemas, medicações em uso.

O (Objetivo): Sinais vitais, exame físico, resultados de exames.

A (Avaliação): Hipóteses diagnósticas, problemas identificados.

P (Plano): Exames a solicitar, medicações prescritas, orientações, retorno.`
    }
  ];

  const handleApplySuggestion = (text: string) => {
    onContentChange(text);
    setSelectedTemplate(null);
    setShowSuggestions(false);
  };

  const handleInsertSuggestion = (suggestion: string) => {
    // Insert at cursor position or at the end if no cursor
    const textarea = document.querySelector('.editor-content') as HTMLTextAreaElement;
    if (textarea) {
      const cursorPosition = textarea.selectionStart;
      const textBefore = content.substring(0, cursorPosition);
      const textAfter = content.substring(cursorPosition);
      onContentChange(`${textBefore}${suggestion}${textAfter}`);
    } else {
      onContentChange(`${content}\n${suggestion}`);
    }
  };

  return (
    <div className="relative space-y-3">
      {autofilled && (
        <div className="absolute right-4 top-4 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs flex items-center z-10">
          <Sparkles className="h-3 w-3 mr-1" />
          Preenchido por IA
        </div>
      )}
      
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs flex items-center gap-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200"
            onClick={() => setShowSuggestions(prev => !prev)}
          >
            <Brain className="h-3.5 w-3.5" />
            Sugestões de IA
          </Button>
          
          <Drawer>
            <DrawerTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs flex items-center gap-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-200"
              >
                <List className="h-3.5 w-3.5" />
                Modelos de HDA/SOAP
              </Button>
            </DrawerTrigger>
            <DrawerContent className="p-4 max-h-[80vh] overflow-auto">
              <div className="space-y-4 p-2">
                <h3 className="font-medium text-lg">Modelos de Documentação Clínica</h3>
                <p className="text-muted-foreground text-sm">
                  Selecione um modelo para estruturar sua documentação clínica
                </p>
                
                <div className="grid gap-3">
                  {hdaTemplates.map((template, idx) => (
                    <div key={idx} className="border rounded-md p-3 hover:border-blue-300 transition-colors cursor-pointer">
                      <h4 className="font-medium">{template.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {template.content.length > 160 
                          ? template.content.substring(0, 160) + "..." 
                          : template.content}
                      </p>
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="mt-3"
                        onClick={() => handleInsertSuggestion(template.content)}
                      >
                        Usar este modelo
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="border rounded-md p-4 bg-blue-50 mt-6">
                  <h4 className="font-medium flex items-center text-blue-800">
                    <Lightbulb className="h-4 w-4 mr-2 text-blue-600" />
                    Dica do Assistente
                  </h4>
                  <p className="text-sm text-blue-800 mt-2">
                    Um bom HDA segue uma linha do tempo da doença atual, conectando sintomas, fatores de risco, tratamentos tentados e impacto no cotidiano. Na prática clínica, muitos médicos incluem o HDA como parte do "S" (Subjetivo) dentro do SOAP, combinando a narração livre com a estrutura organizada do registro.
                  </p>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
      
      <Textarea 
        className="editor-content w-full h-80 leading-relaxed p-4 border rounded-md"
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        placeholder="Registre a evolução do paciente aqui... A IA irá sugerir informações clínicas relevantes conforme você digita."
      />
      
      {showSuggestions && (
        <div className="border rounded-md p-4 bg-blue-50 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-blue-800 flex items-center">
              <Brain className="h-4 w-4 mr-2 text-blue-700" />
              Sugestões do Assistente IA
            </h3>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 text-blue-700 hover:bg-blue-100"
              onClick={() => setShowSuggestions(false)}
            >
              Fechar
            </Button>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-blue-800">Sugestões Clínicas</h4>
            <ul className="space-y-1">
              {clinicalAssistantSuggestions.map((suggestion, i) => (
                <li key={i} className="flex items-start gap-2">
                  <div className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Lightbulb className="h-3 w-3" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-blue-800">{suggestion}</p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 text-xs text-blue-700 hover:bg-blue-100 mt-0.5"
                      onClick={() => handleInsertSuggestion(suggestion)}
                    >
                      Inserir
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-blue-800">Modelos de Evolução</h4>
            <div className="grid grid-cols-1 gap-2">
              {suggestions.map((suggestion, idx) => (
                <div key={idx} className="bg-white border border-blue-200 rounded-md p-3">
                  <h5 className="font-medium text-sm flex items-center">
                    <Sparkles className="h-3.5 w-3.5 mr-1.5 text-blue-500" />
                    {suggestion.title}
                  </h5>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {suggestion.text}
                  </p>
                  <div className="flex justify-end mt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-7 text-xs"
                      onClick={() => setSelectedTemplate(suggestion.id)}
                    >
                      Visualizar
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="h-7 text-xs ml-2 bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleApplySuggestion(suggestion.text)}
                    >
                      Aplicar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {selectedTemplate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-auto">
            <h3 className="text-lg font-bold mb-4">
              {suggestions.find(s => s.id === selectedTemplate)?.title}
            </h3>
            <div className="border rounded-md p-4 bg-gray-50 whitespace-pre-line">
              {suggestions.find(s => s.id === selectedTemplate)?.text}
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button 
                variant="outline" 
                onClick={() => setSelectedTemplate(null)}
              >
                Fechar
              </Button>
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => handleApplySuggestion(suggestions.find(s => s.id === selectedTemplate)?.text || "")}
              >
                Usar este modelo
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
