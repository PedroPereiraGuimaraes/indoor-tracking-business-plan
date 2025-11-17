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
import { Input, TextArea, SelectWithOther } from "../components/Input";
import Button from "../components/Button";
import { StartupData, GenerationStatus } from "../types";
import { generateBusinessPlan } from "../services/geminiService";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
  Font,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";

// Registrar fontes (opcional - melhora a renderização)
Font.register({
  family: "Helvetica",
  fonts: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Helvetica/helvetica_regular.woff",
      fontWeight: "normal",
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Helvetica/helvetica_bold.woff",
      fontWeight: "bold",
    },
  ],
});

const steps = [
  "Perfil",
  "Mercado",
  "Solução",
  "Tecnologia",
  "Estratégia",
  "Financeiro",
];

const initialData: StartupData = {
  name: "",
  mission: "",
  vision: "",
  values: "",
  segment: "",
  targetAudience: "",
  competitors: "",
  problem: "",
  solution: "",
  products: "",
  technology: "",
  roadmap: "",
  intellectualProperty: "",
  structure: "",
  marketingStrategy: "",
  financialForecast: "",
  investmentNeeded: "",
};

// Definição dos campos obrigatórios
const requiredFieldsByStep: { [key: number]: (keyof StartupData)[] } = {
  0: ["name", "mission", "vision", "values"],
  1: ["segment", "targetAudience", "competitors"],
  2: ["problem", "solution", "products"],
  3: ["technology"],
  4: ["structure", "marketingStrategy"],
  5: ["investmentNeeded", "financialForecast"],
};

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

const getLoadingMessage = (progress: number) => {
  if (progress < 20) return "Conectando aos servidores de IA...";
  if (progress < 40) return "Analisando o mercado e concorrência...";
  if (progress < 60) return "Estruturando estratégias de crescimento...";
  if (progress < 80) return "Projetando modelo financeiro...";
  return "Diagramando documento final...";
};

// Estilos ajustados para reduzir espaçamento
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
    lineHeight: 1.3, // Reduzido
    color: "#333333",
  },
  header: {
    marginBottom: 40, // Reduzido
    textAlign: "center",
    borderBottom: "2pt solid #000000",
    paddingBottom: 10, // Reduzido
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4, // Reduzido
    color: "#000000",
  },
  subtitle: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 3, // Reduzido
  },
  date: {
    fontSize: 10,
    color: "#999999",
    fontStyle: "italic",
  },
  section: {
    marginBottom: 10, // Reduzido
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4, // Reduzido
    color: "#000000",
    backgroundColor: "#f8f9fa",
    padding: 4, // Reduzido
    borderLeft: "3pt solid #000000",
  },
  subsectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 3, // Reduzido
    color: "#444444",
    marginTop: 6, // Reduzido
  },
  subsubsectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 2, // Reduzido
    color: "#555555",
    marginTop: 4, // Reduzido
  },
  paragraph: {
    marginBottom: 4, // Reduzido
    textAlign: "justify",
  },
  bold: {
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 9,
    color: "#999999",
    borderTop: "1pt solid #eeeeee",
    paddingTop: 8,
  },
});

// Função processContent atualizada com menos espaçamento
const processContent = (content: string) => {
  const lines = content.split("\n");
  const elements = [];

  lines.forEach((line, index) => {
    if (line.trim() === "") {
      // Espaçamento mínimo entre parágrafos
      elements.push(<Text key={index}>{"\n"}</Text>);
      return;
    }

    // Processar títulos com menos espaçamento
    if (line.startsWith("# ")) {
      elements.push(
        <Text key={index} style={styles.sectionTitle}>
          {line.replace("# ", "").replace(/\*\*/g, "")}
        </Text>
      );
    } else if (line.startsWith("## ")) {
      elements.push(
        <Text key={index} style={styles.subsectionTitle}>
          {line.replace("## ", "").replace(/\*\*/g, "")}
        </Text>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <Text key={index} style={styles.subsubsectionTitle}>
          {line.replace("### ", "").replace(/\*\*/g, "")}
        </Text>
      );
    } else {
      // Processar texto com negrito
      const textParts = line.split(/(\*\*.*?\*\*)/g);
      const textElements = textParts
        .map((part, partIndex) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <Text key={partIndex} style={styles.bold}>
                {part.slice(2, -2)}
              </Text>
            );
          } else if (part) {
            return part;
          }
          return null;
        })
        .filter(Boolean);

      elements.push(
        <Text key={index} style={styles.paragraph}>
          {textElements}
        </Text>
      );
    }
  });

  return elements;
};

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
  const [timeLeft, setTimeLeft] = useState(20);
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
    setTimeLeft(20);
    progressInterval.current = setInterval(() => {
      setProgress((prev) => {
        const increment = prev < 50 ? 2 : prev < 80 ? 1 : 0.2;
        const next = prev + increment;
        return next >= 95 ? 95 : next;
      });
      setTimeLeft((prev) => {
        const next = prev - 0.5;
        return next > 0 ? next : 0;
      });
    }, 500);
  };

  const stopSimulation = () => {
    if (progressInterval.current) clearInterval(progressInterval.current);
    setProgress(100);
    setTimeLeft(0);
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

  // MyDocument corrigido
  const MyDocument = ({ data, content }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>{data.name}</Text>
          <Text style={styles.subtitle}>Plano de Negócios</Text>
        </View>

        <View>{processContent(content)}</View>

        <Text style={styles.footer} fixed>
          Documento gerado por Indoor Tracking Business Plan
        </Text>
      </Page>
    </Document>
  );

  const handleDirectDownload = async () => {
    if (!generatedPlan) {
      alert("O plano ainda não foi gerado.");
      return;
    }

    setIsDownloading(true);
    try {
      const blob = await pdf(
        <MyDocument data={data} content={generatedPlan} />
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
          <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">
            Tempo estimado: {Math.ceil(timeLeft)}s
          </p>
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

              <TextArea
                name="competitors"
                label="Principais Concorrentes"
                value={data.competitors}
                onChange={handleChange}
                error={isError("competitors")}
                placeholder="Liste quem disputa o mercado com você..."
              />
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
                <p className="text-red-500 text-xs -mt-3 mb-3">
                  Campo obrigatório
                </p>
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
                <p className="text-red-500 text-xs -mt-3 mb-3">
                  Campo obrigatório
                </p>
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
    </div>
  );
};

export default CreatePlan;
