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
      marginBottom: 5,
      fontWeight: "bold",
    },
    date: {
      fontSize: 9,
      textAlign: "center",
      marginBottom: 10,
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
    total: { 
      marginTop: 2,
      textAlign: "right", 
      fontWeight: "bold", 
      fontSize: 12 
    },
    discount: { 
      marginBottom: 2,
      textAlign: "right", 
      fontSize: 10 
    },
    footer: { 
      marginTop: 8, 
      textAlign: "center", 
      fontSize: 9 
    },
  });

  return (
    <Document>
      <Page size={{ width: 226.77, height: height }} style={styles.page}>
        <Text style={styles.title}>Rasi</Text>
        <Text style={styles.date}>{new Date().toLocaleDateString('en-IN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}</Text>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Item</Text>
            <Text style={styles.tableColHeader}>Qty</Text>
            <Text style={styles.tableColHeader}>MRP</Text>
            <Text style={styles.tableColHeader}>Sale</Text>
            <Text style={styles.tableColHeader}>Net</Text>
          </View>

          {selectedProducts.map((p, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={styles.tableCol}>{p.name}</Text>
              <Text style={styles.tableCol}>{p.quantity}</Text>
              <Text style={styles.tableCol}>{p.mrp}</Text>
              <Text style={styles.tableCol}>{p.sellingPrice}</Text>              
              <Text style={styles.tableCol}>
                {(p.sellingPrice * p.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        <View style={{ marginTop: 6, textAlign: "right" }}>
          <Text style={styles.discount}>
            Discount: {total.discount.toFixed(2)}
          </Text>
          <Text style={styles.total}>
            Total Amount: {total.amount.toFixed(2)}
          </Text>
        </View>
        <Text style={styles.footer}>Thank you for shopping!</Text>
      </Page>
    </Document>
  );
};

export default BillPDF;
