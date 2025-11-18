import { StartupData } from "../types";
import { callWithRetry } from "./retryUtils";
import { createBusinessPlanPrompt } from "./promptTemplates";
import { AIClient } from "./aiClient";

export const generateBusinessPlan = async (
  data: StartupData
): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing");
  }

  const aiClient = new AIClient(process.env.API_KEY);
  const prompt = createBusinessPlanPrompt(data);

  try {
    const response = await callWithRetry(async () => {
      return await aiClient.generateContent(prompt);
    });

    return response.text || "Erro ao gerar o conteúdo. O retorno veio vazio.";
  } catch (error) {
    console.error("Error generating plan after retries:", error);
    throw new Error(
      "Instabilidade na conexão com a IA. Tentamos várias vezes mas não conseguimos gerar o plano completo agora. Por favor, verifique sua internet e tente novamente em instantes."
    );
  }
};
