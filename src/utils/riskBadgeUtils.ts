
export const getRiskBadgeClass = (risk: string) => {
  switch(risk) {
    case "Baixo": return "bg-green-100 text-green-800 hover:bg-green-200 border-green-200";
    case "Médio": return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200";
    case "Alto": return "bg-red-100 text-red-800 hover:bg-red-200 border-red-200";
    default: return "";
  }
};
