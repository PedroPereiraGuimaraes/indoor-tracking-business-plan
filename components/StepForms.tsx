import React from "react";
import { Input, TextArea, SelectWithOther } from "./Input";
import { StartupData } from "../types";

interface StepFormsProps {
  currentStep: number;
  data: StartupData;
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { target: { name: string; value: string } }
  ) => void;
  isError: (fieldName: string) => string | undefined;
  validationErrors: string[];
}

export const StepForms: React.FC<StepFormsProps> = ({
  currentStep,
  data,
  handleChange,
  isError,
  validationErrors,
}) => {
  const segments = [
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

  const audiences = [
    "B2B (Empresas)",
    "B2C (Consumidor Final)",
    "B2B2C",
    "PME (Pequenas Empresas)",
    "Governo / Setor Público",
  ];

  const investments = [
    "Bootstrapping (Zero / Próprio)",
    "Até R$ 10.000",
    "R$ 10k - R$ 50k",
    "R$ 50k - R$ 200k",
    "R$ 200k - R$ 500k",
    "Acima de R$ 1 Milhão",
  ];

  const structures = [
    "Fundador Solo",
    "2-3 Sócios",
    "Pequena Equipe (< 10)",
    "Equipe Média (10-50)",
  ];

  return (
    <div className="animate-fade-in-up w-full">
      {currentStep === 0 && (
        <>
          <Input
            name="name"
            label="Nome da Startup"
            value={data.name}
            onChange={handleChange}
            error={isError("name")}
            placeholder="Ex: TechSolution"
            autoFocus
          />
          <TextArea
            name="mission"
            label="Missão"
            value={data.mission}
            onChange={handleChange}
            error={isError("mission")}
            placeholder="Qual o propósito da empresa?"
          />
          <TextArea
            name="vision"
            label="Visão"
            value={data.vision}
            onChange={handleChange}
            error={isError("vision")}
            placeholder="Onde querem chegar?"
          />
          <TextArea
            name="values"
            label="Valores"
            value={data.values}
            onChange={handleChange}
            error={isError("values")}
            placeholder="Princípios éticos..."
          />
        </>
      )}

      {currentStep === 1 && (
        <>
          <SelectWithOther
            name="segment"
            label="Segmento"
            options={segments}
            value={data.segment}
            onChange={handleChange}
          />
          {validationErrors.includes("segment") && (
            <p className="text-red-500 text-xs -mt-3 mb-3">
              Selecione um segmento
            </p>
          )}

          <SelectWithOther
            name="targetAudience"
            label="Público-Alvo"
            options={audiences}
            value={data.targetAudience}
            onChange={handleChange}
          />
          {validationErrors.includes("targetAudience") && (
            <p className="text-red-500 text-xs -mt-3 mb-3">
              Selecione um público
            </p>
          )}
        </>
      )}

      {currentStep === 2 && (
        <>
          <TextArea
            name="problem"
            label="O Problema"
            value={data.problem}
            onChange={handleChange}
            error={isError("problem")}
            placeholder="Qual dor sua startup resolve?"
          />
          <TextArea
            name="solution"
            label="A Solução"
            value={data.solution}
            onChange={handleChange}
            error={isError("solution")}
            placeholder="Como você resolve isso?"
          />
          <TextArea
            name="products"
            label="Produtos/Serviços"
            value={data.products}
            onChange={handleChange}
            error={isError("products")}
            placeholder="O que você vende exatamente?"
          />
        </>
      )}

      {currentStep === 3 && (
        <>
          <TextArea
            name="technology"
            label="Tecnologia"
            value={data.technology}
            onChange={handleChange}
            error={isError("technology")}
            placeholder="Stack, IA, App, Plataforma..."
          />
          <TextArea
            name="roadmap"
            label="Próximos Passos (Opcional)"
            value={data.roadmap}
            onChange={handleChange}
            placeholder="O que será desenvolvido em breve?"
          />
          <Input
            name="intellectualProperty"
            label="Propriedade Intelectual (Opcional)"
            value={data.intellectualProperty}
            onChange={handleChange}
            placeholder="Patentes, marcas..."
          />
        </>
      )}

      {currentStep === 4 && (
        <>
          <SelectWithOther
            name="structure"
            label="Estrutura Atual"
            options={structures}
            value={data.structure}
            onChange={handleChange}
          />
          {validationErrors.includes("structure") && (
            <p className="text-red-500 text-xs -mt-3 mb-3">Campo obrigatório</p>
          )}

          <TextArea
            name="marketingStrategy"
            label="Canais de Aquisição"
            value={data.marketingStrategy}
            onChange={handleChange}
            error={isError("marketingStrategy")}
            placeholder="Como os clientes vão te achar?"
          />
        </>
      )}

      {currentStep === 5 && (
        <>
          <SelectWithOther
            name="investmentNeeded"
            label="Investimento Inicial"
            options={investments}
            value={data.investmentNeeded}
            onChange={handleChange}
          />
          {validationErrors.includes("investmentNeeded") && (
            <p className="text-red-500 text-xs -mt-3 mb-3">Campo obrigatório</p>
          )}

          <TextArea
            name="financialForecast"
            label="Expectativa de Receita (1º Ano)"
            value={data.financialForecast}
            onChange={handleChange}
            error={isError("financialForecast")}
            placeholder="Quanto espera faturar?"
          />
        </>
      )}
    </div>
  );
};
