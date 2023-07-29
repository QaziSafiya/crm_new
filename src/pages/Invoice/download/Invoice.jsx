import React from 'react';
import { Document, Page, View, Text, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
      padding: 40,
      fontFamily: 'Helvetica',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      textDecoration: 'underline',
    },
    section: {
      marginBottom: 10,
    },
    label: {
      fontWeight: 'bold',
      color: '#666', // Use a lighter color (gray)
      fontSize: 14, // Adjust the font size
    },
    value: {
      fontSize: 12, // Adjust the font size
    },
    table: {
      display: 'table',
      width: 'auto',
      marginTop: 20,
    },
    tableHeader: {
      backgroundColor: '#e5e5e5',
      fontWeight: 'bold',
      padding: 5,
    },
    tableRow: {
      flexDirection: 'row',
    },
    tableCell: {
      padding: 5,
      border: '1 solid #ccc',
      color: '#333', // Use a darker color for table text (dark gray)
      fontSize: 12, // Adjust the font size
    },
    totalAmount: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 20,
    },
    downloadButton: {
      backgroundColor: 'blue',
      color: 'white',
      padding: 8,
      borderRadius: 4,
      cursor: 'pointer',
    },
  });

const Invoice = ({ invoiceData }) => {
  const MyDoc = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.title}>Invoice</Text>
          <View style={styles.section}>
            <Text style={styles.label}>Invoice Number:</Text>
            <Text style={styles.value}>{invoiceData.invoiceNumber}</Text>
            <Text style={styles.label}>Party Name:</Text>
            <Text style={styles.value}>{invoiceData.partyName}</Text>
            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.value}>{invoiceData.phone}</Text>
            <Text style={styles.label}>State of Supply:</Text>
            <Text style={styles.value}>{invoiceData.stateOfSupply}</Text>
            {/* Add the new fields here */}
            <Text style={styles.label}>Total GST:</Text>
            <Text style={styles.value}>{invoiceData.totalGst}</Text>
            <Text style={styles.label}>Party ID:</Text>
            <Text style={styles.value}>{invoiceData.partyId}</Text>
            <Text style={styles.label}>ID:</Text>
            <Text style={styles.value}>{invoiceData.id}</Text>
            <Text style={styles.label}>Created At:</Text>
            <Text style={styles.value}>{invoiceData.createdAt}</Text>
            <Text style={styles.label}>Type:</Text>
            <Text style={styles.value}>{invoiceData.type}</Text>
          </View>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={[styles.tableCell, { flex: 1 }]}>Item Description</Text>
              <Text style={[styles.tableCell]}>Quantity</Text>
              <Text style={[styles.tableCell]}>Price</Text>
              <Text style={[styles.tableCell]}>Total</Text>
            </View>
            {/* Remove the mapping for invoiceData.items */}
          </View>
          <View style={styles.totalAmount}>
            <Text style={styles.label}>Total Amount:</Text>
            <Text style={styles.value}>${invoiceData.totalAmount}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );

  return (
    <div>
      <PDFDownloadLink document={<MyDoc />} fileName="invoice.pdf">
        {({ blob, url, loading, error }) =>
          loading ? 'Loading document...' : (
            <a href={url} target="_blank" rel="noopener noreferrer">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Open PDF</button>
            </a>
          )
        }
      </PDFDownloadLink>
    </div>
  );
};

export default Invoice;
