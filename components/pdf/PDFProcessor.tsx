import React from "react";
import { Text, View } from "@react-pdf/renderer";
import { styles } from "./PDFStyles";

export const processContent = (content: string) => {
  const lines = content.split("\n");
  const elements: JSX.Element[] = [];
  let isFirstParagraph = true;

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();

    if (trimmedLine === "") {
      elements.push(<Text key={index}>{"\n"}</Text>);
      isFirstParagraph = true; // Reseta para próximo parágrafo
      return;
    }

    if (trimmedLine === "---") {
      elements.push(<View key={index} style={styles.divider} />);
      isFirstParagraph = true;
      return;
    }

    if (trimmedLine.startsWith("# ")) {
      elements.push(
        <Text key={index} style={styles.mainTitle}>
          {trimmedLine.replace("# ", "").replace(/\*\*/g, "")}
        </Text>
      );
      isFirstParagraph = true;
    } else if (trimmedLine.startsWith("## ")) {
      elements.push(
        <Text key={index} style={styles.subtitle}>
          {trimmedLine.replace("## ", "").replace(/\*\*/g, "")}
        </Text>
      );
      isFirstParagraph = true;
    } else if (trimmedLine.startsWith("### ")) {
      elements.push(
        <Text key={index} style={styles.subsectionTitle}>
          {trimmedLine.replace("### ", "").replace(/\*\*/g, "")}
        </Text>
      );
      isFirstParagraph = true;
    } else {
      const textParts = trimmedLine.split(/(\*\*.*?\*\*)/g);
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

      // Usa estilo diferente para primeiro parágrafo após título
      const paragraphStyle = isFirstParagraph
        ? styles.paragraphFirst
        : styles.paragraph;

      elements.push(
        <Text key={index} style={paragraphStyle}>
          {textElements}
        </Text>
      );

      isFirstParagraph = false;
    }
  });

  return elements;
};
