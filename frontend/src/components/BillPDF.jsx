import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const BillPDF = ({ selectedProducts, total, height }) => {
  const styles = StyleSheet.create({
    page: {
      padding: 8,
      fontSize: 9,
      width: 226.77, // 80mm width
      height: height, // dynamic height
    },
    title: {
      fontSize: 12,
      textAlign: "center",
      marginBottom: 6,
      fontWeight: "bold",
    },
    table: { display: "table", width: "100%", marginTop: 4 },
    tableRow: { flexDirection: "row" },
    tableColHeader: {
      width: "25%",
      borderBottom: 1,
      borderColor: "#000",
      fontWeight: "bold",
      padding: 2,
    },
    tableCol: {
      width: "25%",
      borderBottom: 0.5,
      borderColor: "#aaa",
      padding: 2,
    },
    total: { marginTop: 6, textAlign: "right", fontWeight: "bold" },
    footer: { marginTop: 8, textAlign: "center", fontSize: 8 },
  });

  return (
    <Document>
      <Page size={{ width: 226.77, height: height }} style={styles.page}>
        <Text style={styles.title}>Rasi Mens Wear</Text>

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

        <Text style={styles.total}>Total: ₹{(total || 0).toFixed(2)}</Text>
        <Text style={styles.footer}>Thank you for shopping!</Text>
      </Page>
    </Document>
  );
};

export default BillPDF;
