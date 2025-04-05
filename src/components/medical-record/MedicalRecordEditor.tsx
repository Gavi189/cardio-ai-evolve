
import { Sparkles } from "lucide-react";

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
