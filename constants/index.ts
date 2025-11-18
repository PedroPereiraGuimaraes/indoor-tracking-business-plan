import { StartupData } from "../types";

export const steps = [
  "Perfil",
  "Mercado",
  "Solução",
  "Tecnologia",
  "Estratégia",
  "Financeiro",
];

export const initialData: StartupData = {
  name: "",
  mission: "",
  vision: "",
  values: "",
  segment: "",
  targetAudience: "",
  problem: "",
  solution: "",
  products: "",
  technology: "",
  roadmap: "",
  intellectualProperty: "",
  structure: "",
  marketingStrategy: "",
  financialForecast: "",
  investmentNeeded: "",
};

export const requiredFieldsByStep: { [key: number]: (keyof StartupData)[] } = {
  0: ["name", "mission", "vision", "values"],
  1: ["segment", "targetAudience"],
  2: ["problem", "solution", "products"],
  3: ["technology"],
  4: ["structure", "marketingStrategy"],
  5: ["investmentNeeded", "financialForecast"],
};

export const segments = [
  "SaaS (Software)",
  "E-commerce / Varejo",
  "Fintech",
  "Healthtech / Saúde",
  "Educação / EdTech",
  "Serviços / Consultoria",
  "Agronegócio",
  "Indústria 4.0",
  "Logística",
];

export const audiences = [
  "B2B (Empresas)",
  "B2C (Consumidor Final)",
  "B2B2C",
  "PME (Pequenas Empresas)",
  "Governo / Setor Público",
];

export const investments = [
  "Bootstrapping (Zero / Próprio)",
  "Até R$ 10.000",
  "R$ 10k - R$ 50k",
  "R$ 50k - R$ 200k",
  "R$ 200k - R$ 500k",
  "Acima de R$ 1 Milhão",
];

export const structures = [
  "Fundador Solo",
  "2-3 Sócios",
  "Pequena Equipe (< 10)",
  "Equipe Média (10-50)",
];
