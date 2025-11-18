export const getLoadingMessage = (progress: number) => {
  if (progress < 10) return "Inicializando motor estratégico do construtor...";
  if (progress < 20)
    return "Conectando aos servidores de IA e carregando modelos avançados...";
  if (progress < 30) return "Interpretando dados essenciais da startup...";
  if (progress < 40)
    return "Mapeando setor, tendências e movimentos de mercado...";
  if (progress < 50)
    return "Analisando concorrentes e oportunidades estratégicas...";
  if (progress < 60) return "Construindo narrativa do problema e solução...";
  if (progress < 70)
    return "Modelando estrutura de negócio e proposta de valor...";
  if (progress < 80)
    return "Calculando projeções financeiras e métricas-chave...";
  if (progress < 90)
    return "Consolidando insights e integrando seções do plano...";
  return "Finalizando formatação e diagramando o plano de negócios...";
};
