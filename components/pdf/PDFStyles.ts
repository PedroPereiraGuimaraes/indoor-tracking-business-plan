import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    padding: 30, // Reduzi o padding
    fontSize: 11, // Voltei para 11pt
    fontFamily: "Times-Roman",
    lineHeight: 1.3, // Reduzi o line-height
    color: "#333333",
  },
  header: {
    marginBottom: 25, // Reduzi
    textAlign: "center",
    borderBottom: "1pt solid #000000", // Linha mais fina
    paddingBottom: 8,
  },
  title: {
    fontSize: 16, // Reduzi
    fontWeight: "bold",
    marginBottom: 4,
    color: "#000000",
    fontFamily: "Times-Bold",
  },
  subtitle: {
    fontSize: 12, // Reduzi
    fontWeight: "normal",
    marginBottom: 6,
    marginTop: 10, // Reduzi
    color: "#000000",
    fontFamily: "Times-Roman",
  },
  date: {
    fontSize: 9,
    color: "#999999",
    fontStyle: "italic",
    fontFamily: "Times-Italic",
  },
  sectionTitle: {
    fontSize: 12, // Reduzi
    fontWeight: "bold",
    marginBottom: 6, // Reduzi
    color: "#000000",
    fontFamily: "Times-Bold",
  },
  subsectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 4, // Reduzi
    color: "#444444",
    marginTop: 8, // Reduzi
    fontFamily: "Times-Bold",
  },
  subsubsectionTitle: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 3, // Reduzi
    color: "#555555",
    marginTop: 6, // Reduzi
    fontFamily: "Times-Bold",
  },
  paragraph: {
    marginBottom: 4, // Reduzi bastante
    textAlign: "justify",
    lineHeight: 1.3,
    fontFamily: "Times-Roman",
    paddingLeft: 15, // TAB alternativo - recuo no início
  },
  paragraphFirst: {
    marginBottom: 4,
    textAlign: "justify",
    lineHeight: 1.3,
    fontFamily: "Times-Roman",
    paddingLeft: 15, // TAB para primeiro parágrafo
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    borderBottomStyle: "solid",
    marginVertical: 8, // Reduzi
    width: "100%",
  },
  bold: {
    fontWeight: "bold",
    fontFamily: "Times-Bold",
  },
  footer: {
    position: "absolute",
    bottom: 20, // Reduzi
    left: 30,
    right: 30,
    textAlign: "center",
    fontSize: 8,
    color: "#999999",
    borderTop: "1pt solid #eeeeee",
    paddingTop: 6,
    fontFamily: "Times-Roman",
  },
  mainTitle: {
    fontSize: 14, // Reduzi
    fontWeight: "bold",
    marginBottom: 10, // Reduzi
    marginTop: 15, // Reduzi
    color: "#000000",
    fontFamily: "Times-Bold",
  },
});
