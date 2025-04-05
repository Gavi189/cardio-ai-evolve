
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { VitalSigns } from "@/types/patient";

interface VitalSignsSectionProps {
  vitalSigns: VitalSigns;
  setVitalSigns: React.Dispatch<React.SetStateAction<VitalSigns>>;
}

export const VitalSignsSection = ({ vitalSigns, setVitalSigns }: VitalSignsSectionProps) => {
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
