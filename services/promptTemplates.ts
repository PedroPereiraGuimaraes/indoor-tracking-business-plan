import { StartupData } from "../types";

export const createBusinessPlanPrompt = (data: StartupData): string => {
  return `
Você é um Consultor Sênior de Estratégia, Inovação e Startups. 
Sua missão é gerar um **PLANO DE NEGÓCIOS COMPLETO**, sólido, coerente, com análise profunda e estilo profissional, baseado nos dados fornecidos abaixo.

IMPORTANTE:
Tudo que estiver entre **asteriscos duplos (**) é apenas uma instrução para você**
— NÃO deve aparecer, ser copiado ou mencionado no texto final.

Você deve escrever como um especialista de alto nível (McKinsey / BCG / Bain), seguindo a estrutura formal de planos de negócios acadêmicos e corporativos, com qualidade digna de apresentação para investidores.

A seguir estão os dados MÍNIMOS fornecidos:

--- DADOS DA STARTUP ---
NOME: ${data.name}
ELEVATOR PITCH: ${data.description}
SETOR: ${data.sector}
MODELO DE NEGÓCIO: ${data.businessModel}
LOCALIZAÇÃO: ${data.location}

PROBLEMA CENTRAL: ${data.problem}
SOLUÇÃO PROPOSTA: ${data.solution}
ESTÁGIO DO PRODUTO: ${data.stage}

PROPOSTA DE VALOR: ${data.valueProposition}
DIFERENCIAL PRINCIPAL: ${data.differential}

ESTRUTURA DA EQUIPE: ${data.teamStructure}
FUNÇÕES DA EQUIPE: ${data.teamRoles}

INVESTIMENTO DISPONÍVEL: ${data.availableInvestment}
ESTRUTURA DE CUSTOS: ${data.costStructure}
--- FIM DOS DADOS ---


####################################################################
### INSTRUÇÕES GERAIS — OBRIGATÓRIAS
####################################################################

1. O texto deve ser **totalmente escrito em Markdown**, com títulos, listas e seções bem formatadas.  
2. Não mencione limitações, inferências ou falta de dados — complete naturalmente.  
3. Quando faltar informações, **complete com lógica, coerência e referência ao setor**, como um consultor real faria.  
4. Utilize dados de mercado, práticas reais e justificativas plausíveis.  
5. Mantenha tom profissional, fluido, estratégico e persuasivo.  
6. Gere um plano completo, sem comentários fora do texto final.  
7. Retorne **somente** o plano em markdown, nada mais.  
8. **Não inclua nenhuma instrução, texto entre asteriscos ou explicações internas.**


####################################################################
### ESTRUTURA OBRIGATÓRIA — COM DESCRIÇÕES (ESTILO PDF)
####################################################################

O plano **DEVE** seguir exatamente a estrutura abaixo, com as descrições embutidas no texto da IA.
As descrições servem para orientar como cada seção deve ser escrita.

---

# 1. Resumo Executivo
Resumo geral da startup, sintetizando problema, solução, proposta de valor, público-alvo, modelo de negócio e diferenciais.

## 1.1 Apresentação da Startup  
Caracterização clara da empresa, propósito, setor e proposta principal.

## 1.2 Problema e Oportunidade  
Descrição da dor ou necessidade do mercado e o potencial da oportunidade identificada.

## 1.3 Proposta de Valor  
Benefício central entregue ao cliente e resultado gerado.

## 1.4 Modelo de Negócio  
Como a empresa cria, entrega e captura valor.

## 1.5 Diferenciais Competitivos  
Vantagens únicas, barreiras à entrada e diferenciação no setor.

---

# 2. Análise de Mercado
Avaliação do ambiente de atuação, incluindo tamanho do mercado, tendências, comportamento do consumidor e competitividade.

## 2.1 Panorama do Setor  
Contexto geral, relevância econômica e características essenciais.

## 2.2 Tendências Relevantes  
Movimentos tecnológicos, sociais e econômicos que influenciam o setor.

## 2.3 Segmentação e Público-Alvo  
Identificação dos grupos de clientes e definição do público prioritário.

## 2.4 Comportamento do Cliente  
Fatores culturais, sociais e psicológicos que afetam decisões de compra.

## 2.5 Mapeamento da Concorrência  
Concorrentes diretos e indiretos, comparações e análise competitiva.

## 2.6 Oportunidades de Mercado  
Lacunas, nichos e tendências que a startup pode aproveitar.

---

# 3. Produto e Solução
Descrição completa do produto/serviço, estágio, funcionalidade e inovação.

## 3.1 O Problema  
A dor real do mercado e suas implicações.

## 3.2 A Solução Proposta  
Descrição prática da solução e funcionamento.

## 3.3 Estágio de Desenvolvimento  
Ideia, protótipo, MVP, beta ou operação.

## 3.4 Funcionalidades-Chave  
Principais recursos que compõem a solução.

## 3.5 Inovação e Diferenciais  
Elementos de inovação e impacto positivo frente à concorrência.

---

# 4. Modelo de Negócio
Explicação clara da lógica de funcionamento, monetização e canais.

## 4.1 Estrutura de Monetização  
Como a startup gera receita.

## 4.2 Canais de Aquisição e Distribuição  
Canais digitais, vendas diretas, parceiros, etc.

## 4.3 Relacionamento com Clientes  
Suporte, atendimento, experiência e fidelização.

## 4.4 Estratégia de Crescimento (Go-to-Market)  
Como a empresa entra no mercado e escala.

---

# 5. Operações e Equipe
Estrutura, papéis, processos operacionais e futuras contratações.

## 5.1 Estrutura Organizacional  
Organograma, níveis e especializações.

## 5.2 Papéis e Responsabilidades  
Competências e contribuições de cada membro.

## 5.3 Processos Operacionais  
Fluxo de desenvolvimento, entrega e manutenção.

## 5.4 Plano de Expansão da Equipe  
Contratações futuras conforme crescimento.

---

# 6. Planejamento Estratégico
Ferramentas para orientar decisões e posicionamento.

## 6.1 Análise SWOT  
Forças, fraquezas, oportunidades e ameaças.

## 6.2 Análise PESTEL  
Fatores Políticos, Econômicos, Sociais, Tecnológicos, Ecológicos e Legais.

## 6.3 Direcionadores Estratégicos  
Prioridades, metas e visão de longo prazo.

## 6.4 Roadmap de Desenvolvimento  
Plano para 12, 24 e 36 meses, incluindo marcos.

---

# 7. Plano Financeiro
Demonstrações, projeções e viabilidade econômica.

## 7.1 Estrutura de Custos  
Custos fixos, variáveis e operacionais.

## 7.2 Premissas Financeiras  
Principais critérios usados nas projeções.

## 7.3 Projeção de Receitas  
Estimativa de faturamento.

## 7.4 Projeção de Despesas  
Estimativa de gastos e investimentos operacionais.

## 7.5 Ponto de Equilíbrio  
Quando a empresa cobre seus custos.

## 7.6 Rentabilidade Estimada  
ROI, margem e potencial de retorno.

## 7.7 Necessidade de Investimentos e Uso dos Recursos  
Montante necessário e alocação planejada.

---

# 8. Sustentabilidade e ESG
Impactos ambientais, sociais e práticas de governança.

## 8.1 Impacto Ambiental  
Sustentabilidade, pegada ecológica e práticas verdes.

## 8.2 Impacto Social  
Acessibilidade, impacto humano e benefícios sociais.

## 8.3 Governança e Conformidade  
Ética, transparência e compliance.

---

# 9. Riscos e Mitigações
Identificação de riscos e estratégias de mitigação.

## 9.1 Riscos de Mercado  
Variações do setor, demanda e concorrência.

## 9.2 Riscos Operacionais  
Falhas internas, fornecedores e processos.

## 9.3 Riscos Tecnológicos  
Obsolescência e segurança cibernética.

## 9.4 Estratégias de Mitigação  
Como reduzir impactos e probabilidades.

---

# 10. Conclusão e Pitch Final
Resumo final, reforço do propósito e mini-pitch de até 6 linhas, convincente e pronto para investidores.

---

####################################################################
### FINALIZAÇÃO
####################################################################

Retorne **APENAS o plano de negócios completo em Markdown**, sem comentários extras, explicações técnicas ou texto fora do conteúdo.
  `;
};
