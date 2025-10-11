import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const BillPDF = ({ selectedProducts, total, height }) => {
  const styles = StyleSheet.create({
    page: {
      paddingTop: 8,
      paddingBottom: 8,
      paddingLeft: 10,
      paddingRight: 10,
      fontSize: 9,
      width: 226.77, // 80mm width
      height: height, // dynamic height
    },
    title: {
      fontSize: 30,
      textAlign: "center",
      marginBottom: 10,
      fontWeight: "bold",
    },
    table: { 
      display: "table", 
      width: "100%", 
      marginTop: 4
    },
    tableRow: { 
      flexDirection: "row",
      width: "100%",
      borderBottom: 0.5,
      borderColor: "#000",
      paddingTop: 2,
      paddingBottom: 2
    },
    tableColHeader: {
      width: "auto",
      fontWeight: "bold",
      padding: 4,
      flexGrow: 1,
      textAlign: "left",
      borderBottom: 1,
      borderColor: "#000"
    },
    tableCol: {
      width: "auto",
      padding: 4,
      flexGrow: 1,
      textAlign: "left",
    },
    total: { marginTop: 6, textAlign: "right", fontWeight: "bold" },
    footer: { marginTop: 8, textAlign: "center", fontSize: 8 },
  });

  return (
    <Document>
      <Page size={{ width: 226.77, height: height }} style={styles.page}>
        <Text style={styles.title}>Rasi</Text>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Item</Text>
            <Text style={styles.tableColHeader}>Qty</Text>
            <Text style={styles.tableColHeader}>Price</Text>
            <Text style={styles.tableColHeader}>Amt</Text>
          </View>

          {selectedProducts.map((p, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={styles.tableCol}>{p.name}</Text>
              <Text style={styles.tableCol}>{p.quantity}</Text>
              <Text style={styles.tableCol}>{p.price}</Text>
              <Text style={styles.tableCol}>
                {(p.price * p.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        <Text style={styles.total}>Total: {(total || 0).toFixed(2)}</Text>
        <Text style={styles.footer}>Thank you for shopping!</Text>
      </Page>
    </Document>
  );
};

export default BillPDF;
