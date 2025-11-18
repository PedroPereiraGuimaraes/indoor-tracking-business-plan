import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
    lineHeight: 1.3,
    color: "#333333",
  },
  header: {
    marginBottom: 40,
    textAlign: "center",
    borderBottom: "2pt solid #000000",
    paddingBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#000000",
  },
  subtitle: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 3,
  },
  date: {
    fontSize: 10,
    color: "#999999",
    fontStyle: "italic",
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#000000",
    backgroundColor: "#f8f9fa",
    padding: 4,
    borderLeft: "3pt solid #000000",
  },
  subsectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 3,
    color: "#444444",
    marginTop: 6,
  },
  subsubsectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 2,
    color: "#555555",
    marginTop: 4,
  },
  paragraph: {
    marginBottom: 4,
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
