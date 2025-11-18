import React from "react";
import { Input, TextArea, SelectWithOther } from "./Input";
import { StartupData } from "../types";
import {
  sectors,
  businessModels,
  stages,
  teamStructures,
  investmentRanges,
} from "../constants";

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
            name="description"
            label="Descrição Resumida"
            value={data.description}
            onChange={handleChange}
            error={isError("description")}
            placeholder="Descreva seu negócio em um texto simples"
            maxLength={120}
          />
          <SelectWithOther
            name="sector"
            label="Setor Principal"
            options={sectors}
            value={data.sector}
            onChange={handleChange}
          />
          <SelectWithOther
            name="businessModel"
            label="Modelo de Negócio"
            options={businessModels}
            value={data.businessModel}
            onChange={handleChange}
          />
        </>
      )}

      {currentStep === 1 && (
        <>
          <TextArea
            name="problem"
            label="Problema"
            value={data.problem}
            onChange={handleChange}
            error={isError("problem")}
            placeholder="Qual é o principal problema que você resolve para seus clientes?"
          />
          <TextArea
            name="solution"
            label="Solução Proposta"
            value={data.solution}
            onChange={handleChange}
            error={isError("solution")}
            placeholder="Como sua solução resolve esse problema de forma única?"
          />
        </>
      )}

      {currentStep === 2 && (
        <>
          <SelectWithOther
            name="stage"
            label="Estágio do Produto"
            options={stages}
            value={data.stage}
            onChange={handleChange}
          />
          <TextArea
            name="valueProposition"
            label="Proposta de Valor"
            value={data.valueProposition}
            onChange={handleChange}
            error={isError("valueProposition")}
            placeholder="Que valor único você entrega aos clientes?"
          />
          <TextArea
            name="differential"
            label="Diferencial Competitivo"
            value={data.differential}
            onChange={handleChange}
            error={isError("differential")}
            placeholder="O que torna sua solução melhor que a concorrência?"
          />
        </>
      )}

      {currentStep === 3 && (
        <>
          <SelectWithOther
            name="teamStructure"
            label="Estrutura da Equipe"
            options={teamStructures}
            value={data.teamStructure}
            onChange={handleChange}
          />
          <TextArea
            name="teamRoles"
            label="Principais Funções"
            value={data.teamRoles}
            onChange={handleChange}
            error={isError("teamRoles")}
            placeholder="Quais são as principais funções/competências do time?"
          />
          <Input
            name="location"
            label="Localização/Atuação"
            value={data.location}
            onChange={handleChange}
            error={isError("location")}
            placeholder="Cidade, região ou países de atuação"
          />
        </>
      )}

      {currentStep === 4 && (
        <>
          <SelectWithOther
            name="availableInvestment"
            label="Capital Disponível"
            options={investmentRanges}
            value={data.availableInvestment}
            onChange={handleChange}
          />
          <TextArea
            name="costStructure"
            label="Estrutura de Custos"
            value={data.costStructure}
            onChange={handleChange}
            error={isError("costStructure")}
            placeholder="Quais são os principais custos operacionais?"
          />
        </>
      )}
    </div>
  );
};
