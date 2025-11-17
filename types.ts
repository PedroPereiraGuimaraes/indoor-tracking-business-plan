export interface StartupData {
  // 1. General
  name: string;
  mission: string;
  vision: string;
  values: string;

  // 2. Market
  segment: string;
  targetAudience: string;

  // 3. Product
  problem: string;
  solution: string;
  products: string;

  // 4. Tech
  technology: string;
  roadmap: string;
  intellectualProperty: string;

  // 5. Strategy
  structure: string; // Organizational structure
  marketingStrategy: string;

  // 6. Financial
  financialForecast: string;
  investmentNeeded: string;
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
