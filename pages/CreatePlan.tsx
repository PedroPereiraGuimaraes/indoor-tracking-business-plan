import React, { useState, useEffect, useRef } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Download,
  Sparkles,
  AlertCircle,
  RefreshCcw,
  CheckCircle,
  FileText,
} from "lucide-react";
import Button from "../components/Button";
import { StartupData, GenerationStatus } from "../types";
import { generateBusinessPlan } from "../services/geminiService";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { steps, initialData, requiredFieldsByStep } from "../constants";
import { getLoadingMessage } from "../utils/loadingMessages";
import { BusinessPlanDocument } from "../components/pdf/BusinessPlanDocument";
import { StepForms } from "../components/StepForms";

const CreatePlan: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<StartupData>(initialData);
  const [status, setStatus] = useState<GenerationStatus>(GenerationStatus.IDLE);
  const [generatedPlan, setGeneratedPlan] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState("");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);

  // Loading Logic
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef<any>(null);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    if (validationErrors.includes(name)) {
      setValidationErrors((prev) => prev.filter((field) => field !== name));
    }
  };

  const validateCurrentStep = (): boolean => {
    const fieldsToCheck = requiredFieldsByStep[currentStep];
    const errors: string[] = [];

    fieldsToCheck.forEach((field) => {
      if (!data[field] || data[field].trim() === "") {
        errors.push(field);
      }
    });

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
        window.scrollTo(0, 0);
      } else {
        handleGenerate();
      }
    } else {
      const firstErrorField = document.getElementsByName(
        validationErrors[0]
      )[0];
      if (firstErrorField) firstErrorField.focus();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setValidationErrors([]);
      window.scrollTo(0, 0);
    }
  };

  const startSimulation = () => {
    setProgress(0);
    progressInterval.current = setInterval(() => {
      setProgress((prev) => {
        const increment = prev < 50 ? 2 : prev < 80 ? 1 : 0.2;
        const next = prev + increment;
        return next >= 95 ? 95 : next;
      });
    }, 500);
  };

  const stopSimulation = () => {
    if (progressInterval.current) clearInterval(progressInterval.current);
    setProgress(100);
  };

  const handleGenerate = async () => {
    setStatus(GenerationStatus.LOADING);
    setErrorMsg("");
    startSimulation();

    try {
      const planMarkdown = await generateBusinessPlan(data);
      setGeneratedPlan(planMarkdown);
      stopSimulation();
      setTimeout(() => {
        setStatus(GenerationStatus.SUCCESS);
      }, 600);
    } catch (err) {
      stopSimulation();
      setStatus(GenerationStatus.ERROR);
      setErrorMsg(
        err instanceof Error ? err.message : "Ocorreu um erro inesperado."
      );
    }
  };

  useEffect(() => {
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, []);

  const handleDirectDownload = async () => {
    if (!generatedPlan) {
      alert("O plano ainda não foi gerado.");
      return;
    }

    setIsDownloading(true);
    try {
      const blob = await pdf(
        <BusinessPlanDocument data={data} content={generatedPlan} />
      ).toBlob();
      saveAs(
        blob,
        `Plano_Negocios_${data.name.replace(/[^a-z0-9]/gi, "_")}.pdf`
      );
    } catch (err) {
      console.error("Erro:", err);
      alert("Erro ao gerar PDF.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadTXT = () => {
    const element = document.createElement("a");
    const file = new Blob([generatedPlan], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `Plano_Negocios_${data.name.replace(/\s+/g, "_")}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const isError = (fieldName: string) =>
    validationErrors.includes(fieldName) ? "Campo obrigatório" : undefined;

  // Renderização do Loading
  if (status === GenerationStatus.LOADING) {
    return (
      <div className="h-[calc(100vh-80px)] bg-white flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-md text-center">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-imperial/20 rounded-full animate-ping"></div>
            <div className="relative bg-white p-4 rounded-full border-2 border-gray-100 shadow-sm z-10">
              <Sparkles size={32} className="text-imperial animate-pulse" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-charcoal mb-2 tabular-nums">
            {Math.floor(progress)}%
          </h2>
          <p className="text-gray-500 font-medium mb-8 h-6 transition-all duration-300">
            {getLoadingMessage(progress)}
          </p>
          <div className="w-full bg-gray-100 rounded-full h-3 mb-4 overflow-hidden relative">
            <div
              className="h-full bg-imperial rounded-full transition-all duration-500 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/30 w-full h-full animate-[shimmer_2s_infinite] skew-x-12 opacity-50"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Renderização do Sucesso
  if (status === GenerationStatus.SUCCESS) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-gray-50 flex items-center justify-center py-12">
        <div className="max-w-xl mx-auto px-4 w-full">
          <div className="text-center mb-12 bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
            <div className="inline-flex items-center justify-center p-4 bg-green-100 rounded-full text-green-600 mb-6 animate-fade-in-up">
              <CheckCircle size={48} />
            </div>
            <h1 className="text-3xl font-bold text-charcoal mb-4">
              Plano de Negócios Gerado!
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Sua estratégia foi criada com sucesso pela IA. <br />O documento
              está pronto para ser baixado.
            </p>

            {/* Botões de Ação */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-full">
                <Button
                  variant="primary"
                  onClick={handleDirectDownload}
                  disabled={isDownloading}
                  className="shadow-xl hover:shadow-2xl px-8 py-4 text-lg w-full relative overflow-hidden justify-center"
                >
                  {isDownloading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Gerando Arquivo...
                    </div>
                  ) : (
                    <>
                      {" "}
                      <Download size={22} /> Baixar PDF Agora{" "}
                    </>
                  )}
                </Button>
              </div>

              <div className="w-full">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={handleDownloadTXT}
                  className="py-3 text-sm justify-center border-gray-300"
                >
                  <FileText size={16} /> Baixar versão .txt (Texto Puro)
                </Button>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <Button
                variant="ghost"
                onClick={() => setStatus(GenerationStatus.IDLE)}
                className="text-xs text-gray-400 hover:text-charcoal w-full justify-center"
              >
                <RefreshCcw size={14} /> Criar Novo Plano
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Renderização do Formulário (Default)
  return (
    <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center bg-white overflow-hidden py-12">
      <div className="w-full max-w-2xl px-6 flex flex-col justify-center h-full">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-charcoal mb-2">
            {steps[currentStep]}
          </h1>
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
            <span>
              Passo {currentStep + 1} de {steps.length}
            </span>
          </div>
          <div className="w-full max-w-xs mx-auto bg-gray-100 h-1 rounded-full overflow-hidden">
            <div
              className="h-full bg-imperial transition-all duration-500 ease-out rounded-full"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form */}
        <StepForms
          currentStep={currentStep}
          data={data}
          handleChange={handleChange}
          isError={isError}
          validationErrors={validationErrors}
        />

        {/* Error Message Global */}
        {validationErrors.length > 0 && (
          <div className="bg-red-50 text-red-500 px-4 py-3 rounded-lg mb-4 flex items-center gap-2 text-sm animate-fade-in-up">
            <AlertCircle size={16} />
            Por favor, preencha todos os campos obrigatórios para continuar.
          </div>
        )}

        <div className="flex justify-between mt-8 items-center">
          <Button
            variant="ghost"
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`${
              currentStep === 0
                ? "invisible"
                : "text-gray-400 hover:text-charcoal"
            }`}
          >
            <ChevronLeft size={18} /> Voltar
          </Button>

          <Button
            onClick={nextStep}
            variant="primary"
            className="rounded-full px-8 shadow-lg"
          >
            {currentStep === steps.length - 1 ? (
              <>
                Gerar Plano <Sparkles size={18} />
              </>
            ) : (
              <>
                Próximo <ChevronRight size={18} />
              </>
            )}
          </Button>
        </div>

        {errorMsg && (
          <div className="mt-4 text-center text-red-500 text-sm">
            {errorMsg}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePlan;
