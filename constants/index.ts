import { StartupData } from "../types";

/* -------------------------------------------------------------------------- */
/*                                   STEPS                                    */
/* -------------------------------------------------------------------------- */

export const steps = [
  "Identificação",
  "Problema & Solução",
  "Produto & Mercado",
  "Equipe & Recursos",
  "Estratégia & Finanças",
];

/* -------------------------------------------------------------------------- */
/*                                INITIAL DATA                                */
/* -------------------------------------------------------------------------- */

export const initialData: StartupData = {
  name: "",
  description: "",
  sector: "",
  businessModel: "",
  location: "",
  problem: "",
  solution: "",
  stage: "",
  valueProposition: "",
  differential: "",
  teamStructure: "",
  teamRoles: "",
  availableInvestment: "",
  costStructure: "",
};

/* -------------------------------------------------------------------------- */
/*                           REQUIRED FIELDS PER STEP                          */
/* -------------------------------------------------------------------------- */

export const requiredFieldsByStep: { [key: number]: (keyof StartupData)[] } = {
  0: ["name", "description", "sector", "businessModel"],
  1: ["problem", "solution"],
  2: ["stage", "valueProposition", "differential"],
  3: ["teamStructure", "teamRoles", "location"],
  4: ["availableInvestment", "costStructure"],
};

/* -------------------------------------------------------------------------- */
/*                                   LISTS                                    */
/* -------------------------------------------------------------------------- */

export const sectors = [
  "Saúde e Biotecnologia",
  "Finanças",
  "Educação",
  "Varejo e Serviços",
  "Indústria e Logística",
  "Agronegócio e Sustentabilidade",
  "Construção e Imobiliário",
  "Recursos Humanos e Gestão",
  "Marketing e Mídia",
  "Segurança e Governança",
  "Turismo e Alimentação",
  "Inteligência Artificial e Tecnologia",
];

export const businessModels = [
  "B2B: Venda para empresas",
  "B2C: Venda para consumidores finais",
  "B2B2C: Empresas que vendem para consumidores",
  "B2G: Venda para governo",
];

export const stages = [
  "Ideia: Apenas no papel",
  "Protótipo: Testes iniciais",
  "MVP: Produto mínimo viável",
  "Beta: Testes com usuários reais",
  "Lançado: Em operação no mercado",
  "Escalando: Crescimento acelerado",
];

export const teamStructures = [
  "Empreendedor Solo",
  "Dupla de Sócios",
  "Time Fundador (3-5 pessoas)",
  "Startup Pequena (6-15 pessoas)",
  "Startup Média (16-50 pessoas)",
  "Empresa Estabelecida (+50 pessoas)",
];

export const investmentRanges = [
  "Sem investimento inicial",
  "Até R$ 10.000",
  "R$ 10.000 - R$ 50.000",
  "R$ 50.000 - R$ 200.000",
  "R$ 200.000 - R$ 500.000",
  "R$ 500.000 - R$ 1.000.000",
  "Acima de R$ 1.000.000",
];
