
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PatientsList from "./pages/PatientsList";
import MedicalRecord from "./pages/MedicalRecord";
import RiskCalculator from "./pages/RiskCalculator";
import Schedule from "./pages/Schedule";
import Prescription from "./pages/Prescription";
import Exams from "./pages/Exams";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/patients" element={<PatientsList />} />
            <Route path="/medical-record" element={<MedicalRecord />} />
            <Route path="/risk-calculator" element={<RiskCalculator />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/prescription" element={<Prescription />} />
            <Route path="/exams" element={<Exams />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
