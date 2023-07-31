import React, { useState } from 'react';
import { Document, Page, View, Text, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textDecoration: 'underline',
  },
  section: {
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    color: '#666',
    fontSize: 14,
  },
  value: {
    fontSize: 12,
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
    color: '#333',
    fontSize: 12,
  },
  totalAmountContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
});

const Invoice = ({ invoiceData }) => {
  const [uploadedLogo, setUploadedLogo] = useState(null);

  // Function to handle logo upload
  const handleLogoUpload = (event) => {
    const logoFile = event.target.files[0];
    if (logoFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedLogo(reader.result);
      };
      reader.readAsDataURL(logoFile);
    }
  };
  const MyDoc = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <View style={styles.logoContainer}>
          {uploadedLogo && (
            <View style={styles.logoContainer}>
              <Image style={styles.logo} src={uploadedLogo} />
            </View>
          )}
          </View>

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
            <Text style={styles.label}>ID:</Text>
            <Text style={styles.value}>{invoiceData.id}</Text>
          </View>

          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={[styles.tableCell, { flex: 1 }]}>Item Description</Text>
              <Text style={[styles.tableCell]}>Quantity</Text>
              <Text style={[styles.tableCell]}>Price</Text>
              <Text style={[styles.tableCell]}>Total</Text>
            </View>
            {/* Loop through invoiceData.items and render the table rows */}
            {invoiceData.items && invoiceData.items.map((item) => (
              <View style={styles.tableRow} key={item.id}>
                <Text style={[styles.tableCell, { flex: 1 }]}>{item.description}</Text>
                <Text style={[styles.tableCell]}>{item.quantity}</Text>
                <Text style={[styles.tableCell]}>{item.price}</Text>
                <Text style={[styles.tableCell]}>{item.quantity * item.price}</Text>
              </View>
            ))}
          </View>

          <View style={styles.totalAmountContainer}>
            <Text style={styles.label}>Total Amount:</Text>
            <Text style={styles.value}>${invoiceData.totalAmount}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Total GST:</Text>
            <Text style={styles.value}>{invoiceData.totalGst}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Details:</Text>
            <Text style={styles.value}>{invoiceData.details}</Text>
            <Text style={styles.label}>Extra Details:</Text>
            <Text style={styles.value}>{invoiceData.extraDetails}</Text>
            <Text style={styles.label}>Created At:</Text>
            <Text style={styles.value}>{invoiceData.createdAt}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );

  return (
    <div>
    {/* Add input element to allow the user to upload the logo */}
    <input type="file" accept="image/*" onChange={handleLogoUpload} />

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
