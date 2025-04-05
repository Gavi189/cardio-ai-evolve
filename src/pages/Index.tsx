
import { Heart, Grid3X3, ActivitySquare } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      {/* Header */}
      <header className="container mx-auto py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Heart className="h-8 w-8 text-cardio-600" fill="#0077ff" strokeWidth={1.5} />
          <h1 className="text-2xl font-bold">
            <span className="text-cardio-700">Smart</span>
            <span className="text-cardio-500">Cardio</span>
            <span className="text-cardio-700">CRM</span>
          </h1>
        </div>
        <Link to="/login">
          <Button variant="outline" className="rounded-md">
            Entrar
          </Button>
        </Link>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Transforme o cuidado<br />
          cardiológico com IA
        </h2>
        <p className="max-w-3xl mx-auto text-lg text-gray-600 mb-12">
          Prontuário eletrônico inteligente para clínicas cardiológicas, potencializado por
          inteligência artificial para aprimorar diagnósticos e resultados dos pacientes.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/login">
            <Button className="bg-cardio-600 hover:bg-cardio-700 rounded-md px-8 py-6 text-lg">
              Acessar o Sistema
            </Button>
          </Link>
          <Button variant="outline" className="rounded-md px-8 py-6 text-lg">
            Solicitar Demonstração
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <div className="mx-auto w-12 h-12 flex items-center justify-center mb-4">
              <Grid3X3 className="h-8 w-8 text-cardio-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Editor Inteligente</h3>
            <p className="text-gray-600">
              Editor de evolução médica com sugestões de IA para diagnósticos e condutas.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <div className="mx-auto w-12 h-12 flex items-center justify-center mb-4">
              <ActivitySquare className="h-8 w-8 text-cardio-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Calculadoras de Risco</h3>
            <p className="text-gray-600">
              Avaliação precisa do risco cardiovascular com múltiplos modelos.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <div className="mx-auto w-12 h-12 flex items-center justify-center mb-4">
              <Heart className="h-8 w-8 text-cardio-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Receituário Inteligente</h3>
            <p className="text-gray-600">
              Sugestões personalizadas de medicamentos baseadas em diretrizes atualizadas.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto py-6 px-6 text-center text-gray-600 text-sm">
        © 2025 SmartCardioCRM. Todos os direitos reservados.
      </footer>
    </div>
  );
};

export default Index;
