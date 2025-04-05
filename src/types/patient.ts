
export type Patient = {
  id: number;
  name: string;
  age: number;
  gender: "M" | "F";
  phone: string;
  lastVisit: string;
  risk: "Baixo" | "Médio" | "Alto";
};
