import React from "react";
import { Document, Page, Text, View } from "@react-pdf/renderer";
import { StartupData } from "../../types";
import { styles } from "./PDFStyles";
import { processContent } from "./PDFProcessor";

interface BusinessPlanDocumentProps {
  data: StartupData;
  content: string;
}

export const BusinessPlanDocument: React.FC<BusinessPlanDocumentProps> = ({
  data,
  content,
}) => (
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
