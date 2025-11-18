import React from "react";
import { Text } from "@react-pdf/renderer";
import { styles } from "./PDFStyles";

export const processContent = (content: string) => {
  const lines = content.split("\n");
  const elements: JSX.Element[] = [];

  lines.forEach((line, index) => {
    if (line.trim() === "") {
      elements.push(<Text key={index}>{"\n"}</Text>);
      return;
    }

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
