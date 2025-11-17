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
    /* INSTRUÇÕES E CONTEXTO */

    // 1. Papel e Contexto
    Atue como um **Consultor de Negócios Sênior e Estrategista de Inovação** com vasta experiência em análise de mercado, financiamento de startups (Venture Capital) e elaboração de Planos de Negócios profissionais e detalhados.

    // 2. Objetivo Principal
    Crie um **Plano de Negócios** completo, profissional e coeso (em formato de texto corrido estruturado) para a startup "${data.name}".

    // 3. Requisito de Busca de Dados (Pesquisa de Mercado)
    **ANTES DE ELABORAR O PLANO**, você DEVE realizar uma análise de mercado usando uma ferramenta de pesquisa (como Google Search) para complementar, validar e enriquecer os dados fornecidos. A pesquisa deve focar em:
    * **Tendências de Mercado** no segmento "${data.segment}".
    * **Análise de Concorrência** e principais players (no segmento e/ou para o público-alvo "${data.targetAudience}").
    * **Validação da Solução** e do Problema em relação ao mercado atual.
    * **Melhores Práticas e KPIs** relevantes para o setor.
    * **Informações de Referência** para apoiar a previsão financeira e estratégia de Go-to-Market.
    **É PROIBIDO INCLUIR QUALQUER INFORMAÇÃO FALSA.** Todo o texto deve ser baseado nos dados fornecidos e nas informações factuais encontradas na pesquisa.

    // 4. Dados Fornecidos pelo Empreendedor
    Utilize os seguintes dados como base, enriquecendo-os com a pesquisa de mercado:

    - Nome da Startup: ${data.name}
    - Missão: ${data.mission}
    - Visão: ${data.vision}
    - Valores: ${data.values}
    - Segmento: ${data.segment}
    - Público-alvo: ${data.targetAudience}
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

    // 5. Formato e Estrutura (OBRIGATÓRIO)
    O documento DEVE ser apresentado **INTEIRAMENTE em formato Markdown** (limpo).
    * Use cabeçalhos '#' para o Título Principal.
    * Use cabeçalhos '##' para as Seções (1., 2., 3., etc.).
    * Use cabeçalhos '###' para as Subseções (1.1, 1.2, 1.3, etc.).

    # Plano de Negócios: ${data.name}

    ## 1. Resumo Executivo
    ### 1.1 Apresentação da Startup e Proposta de Valor
    ### 1.2 Missão, Visão e Valores Fundamentais
    ### 1.3 Diferenciais Competitivos (Baseado em Dados e Análise)

    ## 2. Análise de Mercado, Segmento e Público
    ### 2.1 Análise de Mercado e Tendências (ENRIQUECIDA PELA PESQUISA)
    ### 2.2 Análise da Concorrência e Posicionamento (ENRIQUECIDA PELA PESQUISA)
    ### 2.3 Segmentação e Público-Alvo Detalhado

    ## 3. Solução, Produtos e Tecnologia
    ### 3.1 O Problema e a Solução
    ### 3.2 Descrição Detalhada dos Produtos/Serviços
    ### 3.3 Base Tecnológica e Infraestrutura
    ### 3.4 Roadmap de Desenvolvimento e Evolução Tecnológica
    ### 3.5 Propriedade Intelectual e Validação

    ## 4. Modelo de Negócio, Marketing e Estratégia
    ### 4.1 O Modelo de Negócio (Fontes de Receita, Canais, Estrutura de Custos)
    ### 4.2 Estratégia Go-to-Market e Marketing Detalhado
    ### 4.3 Análise SWOT (Forças, Fraquezas, Oportunidades, Ameaças)
    ### 4.4 Estratégia de Escalabilidade e Crescimento

    ## 5. Estrutura e Governança
    ### 5.1 Estrutura Organizacional e Equipe (Time Chave)
    ### 5.2 Estratégia de Recrutamento e Cultura

    ## 6. Plano Financeiro e Pedido de Investimento
    (Com base nos dados ${data.financialForecast} e ${data.investmentNeeded}, elabore uma projeção textual profissional, justificando a necessidade de investimento e o retorno esperado.)
    ### 6.1 Previsão Financeira (Projeção de 3 anos)
    ### 6.2 Necessidade de Investimento e Uso de Capital
    ### 6.3 Indicadores de Desempenho Chave (KPIs)

    // 6. Restrição de Saída
    **RETORNE APENAS O TEXTO COMPLETO DO PLANO DE NEGÓCIOS EM MARKDOWN, SEM NENHUM COMENTÁRIO, INTRODUÇÃO OU TEXTO ADICIONAL FORA DA ESTRUTURA SOLICITADA.** O texto deve ser fluido, profissional e técnico, sem quebras artificiais.
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
