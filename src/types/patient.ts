
export type Patient = {
  id: number;
  name: string;
  age: number;
  gender: "M" | "F";
  phone: string;
  lastVisit: string;
  risk: "Baixo" | "Médio" | "Alto";
  // Additional fields
  email?: string;
  insuranceNumber?: string;
  allergies?: string;
  comorbidities?: string;
  address?: string;
};

export type MedicalHistory = {
  comorbidities?: string[];
  surgeries?: string[];
  allergies?: string;
  physicalActivity?: string;
  sleep?: string;
  diet?: string;
  sports?: string;
  tobacco?: string;
  alcohol?: string;
  illicitDrugs?: string;
  familyHistory?: string[];
  vaccineHistory?: {
    covid?: string;
    influenza?: string;
    pneumococcal?: string;
  };
  gynecologicalHistory?: {
    pregnancies?: number;
    abortions?: number;
    menarche?: number;
    menopause?: number;
    menstrualCycle?: string;
  };
  hospitalizations?: string[];
  infectiousDiseases?: string[];
  occupationalExposure?: string;
};

export type VitalSigns = {
  weight?: number;
  height?: number;
  bmi?: number;
  waistCircumference?: number;
  heartRate?: number;
  respiratoryRate?: number;
  temperature?: number;
  bloodPressure?: string;
  oxygenSaturation?: number;
  bloodGlucose?: number;
  painScore?: number;
};

export type DiagnosticHypothesis = {
  description: string;
  icdCode: string;
};

