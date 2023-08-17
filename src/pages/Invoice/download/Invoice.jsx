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
    // border:"1px solid green"
  },
  section1: {
    marginBottom: 10,
    display:"flex",
    justifyContent:"flex-start",
    alignContent:"flex-start",
    alignItems:"flex-start",
    textAlign:"left"
    // border:"1px solid green"
  },
  section2: {
    margin: "auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    // padding: "20px", // Add padding for spacing
    // backgroundColor: "#f2f2f2", // Add background color
    // borderRadius: "8px", // Add border radius for a rectangular block look
   
    gap:"140px"
   

  },
  section3: {
    margin: "auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    // padding: "20px", // Add padding for spacing
    // backgroundColor: "#f2f2f2", // Add background color
    // borderRadius: "8px", // Add border radius for a rectangular block look
   
    gap:"250px",
    // marginTop:"15px"
   

  },
  label: {
    // fontWeight: 'bold',
    color: '#666',
    fontSize: "14px",
    marginBottom:"2px"
  },
  value: {
    fontSize: "12px",
    marginBottom:"5px"
  },
  table: {
    display: 'table',
    width: 'auto',
    marginTop: 10,
    marginBottom:15
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
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
    
  },
  logo: {
    width: 150,
    height: 100,
  },
  bdr: {
    // border: "1px solid gray",
    // paddingBottom: "3px",
    // paddingTop: "3px",
    // paddingLeft: "5px",
    // paddingRight: "3px",
    // width: "150px",
    // wordWrap: "break-word",   // Wrap long words
    // overflowWrap: "break-word" // Wrap between characters
    // backgroundColor:"#d2f7c2"
    
  }
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
          {/* <View style={styles.logoContainer}> */}
          {uploadedLogo && (
            <View style={styles.logoContainer}>
              <Image style={styles.logo} src={uploadedLogo} />
            </View>
          )}
          {/* </View> */}

          {/* <Text style={styles.title}>Invoice</Text> */}

          <View style={styles.section2}>
          

          <View style={styles.section1}>
          <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell]}>Party Details</Text>
            </View>
          </View>
           <View style={styles.bdr}>
            <Text style={styles.label}>Party Name:</Text>
            <Text style={styles.value}>{invoiceData.partyName}</Text>
           </View>

           <View style={styles.bdr}>
            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.value}>{invoiceData.phone}</Text>
            </View>

            <View style={styles.bdr}>
            <Text style={styles.label}>State of Supply:</Text>
            <Text style={styles.value}>{invoiceData.stateOfSupply}</Text>
            </View>
            
            <View style={styles.bdr} >
            <Text style={styles.label}>ID:</Text>
            <Text style={styles.value}>{invoiceData.id}</Text>
            </View>
           
          </View>

          <View style={styles.section1}>
          <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell]}>Invoice Details</Text>
            </View>
          </View>
          <View style={styles.totalAmountContainer}>
          <Text style={styles.label}>Invoice Type: </Text>
          <Text style={styles.value}>{invoiceData.type}</Text>
          </View>

          <View style={styles.totalAmountContainer}>
          <Text style={styles.label}>Invoice Number: </Text>
          <Text style={styles.value}>{invoiceData.invoiceNumber}</Text>
          </View>
 
          <View style={styles.totalAmountContainer}>
          <Text style={styles.label}>Mode Of Payment: </Text>
          <Text style={styles.value}>{invoiceData.modeOfPayment}</Text>
          </View>

          </View>
          
          </View>

          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={[styles.tableCell, { flex: 1 }]}>Item Description</Text>
              <Text style={[styles.tableCell]}>Quantity</Text>
              <Text style={[styles.tableCell]}>Gst</Text>
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
           
          <View style={styles.section3}>

          <View style={styles.section1}>
            <Text style={styles.label}>Details:</Text>
            <Text style={styles.value}>{invoiceData.details}</Text>
            <Text style={styles.label}>Extra Details:</Text>
            <Text style={styles.value}>{invoiceData.extraDetails}</Text>
            <Text style={styles.label}>Created At:</Text>
            <Text style={styles.value}>{invoiceData.createdAt}</Text>
          </View>

            <View style={styles.section1}>
          <View style={styles.totalAmountContainer}>
            <Text style={styles.label}>Total Amount: </Text>
            <Text style={styles.value}>${invoiceData.totalAmount}</Text>
          </View>

          <View style={styles.totalAmountContainer}>
            <Text style={styles.label}>Total GST: </Text>
            <Text style={styles.value}>{invoiceData.totalGst}</Text>
          </View>
          </View>

         
          </View>
        </View>
      </Page>
    </Document>
  );

  return (
    <div className='flex justify-between'> 
    {/* Add input element to allow the user to upload the logo */}
    
    <div>
    <span className='bg-blue-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-16'>Upload Logo </span>
    <br></br><br></br>
    <input type="file" accept="image/*" onChange={handleLogoUpload} style={{color:"blue"}} />
    </div>
    
    <div>
    <PDFDownloadLink document={<MyDoc />} fileName="invoice.pdf">
      {({ blob, url, loading, error }) =>
        loading ? 'Loading document...' : (
          <a href={url} target="_blank" rel="noopener noreferrer">
    

            <button className="bg-blue-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Open PDF</button>
          </a>
        )
      }
    </PDFDownloadLink>
    </div>
  </div>
  );
};

export default Invoice;
