export interface StartupData {
  // 1. Identificação
  name: string;
  description: string;
  sector: string;
  businessModel: string;

  // 2. Problema & Solução
  location: string;
  problem: string;
  solution: string;

  // 3. Produto & Mercado
  stage: string;
  valueProposition: string;
  differential: string;

  // 4. Equipe & Recursos
  teamStructure: string;
  teamRoles: string;

  // 5. Estratégia & Finanças
  availableInvestment: string;
  costStructure: string;
}

export enum GenerationStatus {
  IDLE,
  LOADING,
  SUCCESS,
  ERROR,
}

export interface NavigationItem {
  label: string;
  path: string;
}
