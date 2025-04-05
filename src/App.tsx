
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RecoverPassword from "./pages/RecoverPassword";
import Dashboard from "./pages/Dashboard";
import PatientsList from "./pages/PatientsList";
import PatientRegister from "./pages/PatientRegister";
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
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recover-password" element={<RecoverPassword />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/patients" element={<PatientsList />} />
            <Route path="/patient-register" element={<PatientRegister />} />
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
