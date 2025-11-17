import { GoogleGenAI } from "@google/genai";
import { StartupData } from "../types";

const MAX_RETRIES = 3;
const INITIAL_DELAY_MS = 2000;

// Helper para esperar um tempo determinado
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Função wrapper para tentar executar a chamada à API múltiplas vezes
async function callWithRetry<T>(
  fn: () => Promise<T>,
  retries = MAX_RETRIES,
  delayMs = INITIAL_DELAY_MS
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;

    console.warn(
      `Tentativa falhou. Tentando novamente em ${delayMs}ms... Restam ${retries} tentativas. Erro:`,
      error
    );
    await delay(delayMs);

    // Tenta novamente com o dobro do tempo de espera (Backoff Exponencial)
    return callWithRetry(fn, retries - 1, delayMs * 2);
  }
}

export const generateBusinessPlan = async (
  data: StartupData
): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    Atue como um consultor de negócios sênior especializado em startups e inovação.
    Crie um Plano de Negócios profissional, detalhado e contínuo (formato texto corrido estruturado) em Markdown para a startup "${data.name}".
    
    Utilize os seguintes dados fornecidos pelo empreendedor:
    
    - Missão: ${data.mission}
    - Visão: ${data.vision}
    - Valores: ${data.values}
    - Segmento: ${data.segment}
    - Público-alvo: ${data.targetAudience}
    - Concorrentes: ${data.competitors}
    - Problema: ${data.problem}
    - Solução: ${data.solution}
    - Produtos/Serviços: ${data.products}
    - Tecnologia: ${data.technology}
    - Roadmap: ${data.roadmap}
    - Propriedade Intelectual: ${data.intellectualProperty}
    - Estrutura Organizacional: ${data.structure}
    - Estratégia de Marketing: ${data.marketingStrategy}
    - Previsão Financeira (Dados Brutos): ${data.financialForecast}
    - Investimento Necessário: ${data.investmentNeeded}

    A estrutura do documento DEVE ser esta (use cabeçalhos Markdown # para Título Principal, ## para Seções e ### para Subseções):

    # Plano de Negócios: ${data.name}

    ## 1. Resumo Executivo
    ### 1.1 Apresentação da Startup
    ### 1.2 Missão, Visão e Valores
    ### 1.3 Diferenciais Competitivos

    ## 2. Modelo de Negócio e Estrutura
    ### 2.1 O Modelo de Negócio
    ### 2.2 Estrutura Organizacional

    ## 3. Produtos, Serviços e Tecnologia
    ### 3.1 Descrição Detalhada
    ### 3.2 Base Tecnológica
    ### 3.3 Roadmap Tecnológico
    ### 3.4 Validação e Propriedade Intelectual

    ## 4. Plano de Marketing
    ### 4.1 Análise de Mercado e Tendências
    ### 4.2 Análise da Concorrência
    ### 4.3 Estratégias de Branding e Posicionamento

    ## 5. Estratégia Corporativa
    ### 5.1 Análise SWOT
    ### 5.2 Estratégia Go-to-Market
    ### 5.3 Escalabilidade

    ## 6. Plano Financeiro
    (Com base nos dados fornecidos, elabore uma projeção textual profissional).

    IMPORTANTE:
    - O texto deve ser fluido, profissional e técnico.
    - Use Markdown limpo.
    - Não quebre o texto em páginas artificiais, escreva como um documento único e coeso.
    - Retorne APENAS o texto do plano de negócios em markdown, sem comentários adicionais.
  `;

  try {
    // Usando o mecanismo de retry
    const response = await callWithRetry(async () => {
      return await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          temperature: 0.7,
          topK: 40,
        },
      });
    });

    return response.text || "Erro ao gerar o conteúdo. O retorno veio vazio.";
  } catch (error) {
    console.error("Error generating plan after retries:", error);
    throw new Error(
      "Instabilidade na conexão com a IA. Tentamos várias vezes mas não conseguimos gerar o plano completo agora. Por favor, verifique sua internet e tente novamente em instantes."
    );
  }
};
