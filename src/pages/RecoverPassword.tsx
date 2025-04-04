
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

export default function RecoverPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulating password recovery request
    setTimeout(() => {
      setSent(true);
      toast({
        title: "E-mail enviado",
        description: "Instruções de recuperação foram enviadas para seu e-mail",
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="p-8 bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="flex flex-col items-center mb-8">
          <Heart className="h-12 w-12 text-cardio-600" fill="#0077ff" strokeWidth={1.5} />
          <h1 className="text-3xl font-bold text-gradient-cardio mt-4">SmartCardioCRM</h1>
          <p className="text-muted-foreground mt-2 text-center">
            Recuperação de senha
          </p>
        </div>
        
        {!sent ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-cardio" 
              disabled={isLoading}
            >
              {isLoading ? "Enviando..." : "Recuperar senha"}
            </Button>
            
            <div className="text-center mt-4">
              <Button 
                variant="link" 
                className="text-cardio-700" 
                onClick={() => navigate("/")}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para login
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg text-green-700 text-center">
              <p className="font-medium">E-mail enviado com sucesso!</p>
              <p className="text-sm mt-1">Verifique sua caixa de entrada para instruções de recuperação.</p>
            </div>
            
            <Button 
              className="w-full" 
              variant="outline" 
              onClick={() => navigate("/")}
            >
              Voltar para login
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
