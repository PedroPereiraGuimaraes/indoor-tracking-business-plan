export const getLoadingMessage = (progress: number) => {
  if (progress < 20) return "Conectando aos servidores de IA...";
  if (progress < 40) return "Analisando o mercado e concorrência...";
  if (progress < 60) return "Estruturando estratégias de crescimento...";
  if (progress < 80) return "Projetando modelo financeiro...";
  return "Diagramando documento final...";
};
