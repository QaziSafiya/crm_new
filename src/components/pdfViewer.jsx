import React, { Component, useContext, useEffect } from "react";
import { StoreContext } from "../store/store-context";
import {
  Image,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Link,
} from "@react-pdf/renderer";
import { useNavigate } from "react-router-dom";
import uuid from 'react-uuid';

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    color: "black",
    marginTop: "25",
  },
  image: {
    position: "absolute",
    left: "33%",
    top: "30%",
    transform: "translate(-50%,-50%)",
    width: 300,
    height: 300,
    opacity: 0.2,
    zIndex: -100,
    margin: "auto",
  },
  viewer: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  link: {
    color: "black",
    textDecoration: "none",
    paddingRight: "10px",
    fontSize: "10px",
  },
  h1: { fontSize: "16px", textAlign: "center", textTransform: "uppercase" },
  semiBold: { fontSize: "12px", fontWeight: "bold" },
  flexCol: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    marginTop: "16px",
    },
  flexRow: {display: 'flex', border: '1px solid black', flexDirection: 'row'},
  flexBasis15: {flexBasis: '15%', textAlign: 'center', border: '1px solid black'},
  flexBasis60: {flexBasis: '60%', textAlign: 'center', border: '1px solid black'},
  flexBasis25: {flexBasis: '25%', textAlign: 'center', border: '1px solid black'},
  sidePadding: { width: "80%", padding: "10px 0", margin: "0 auto" },
    smText: { fontSize: "12px" },
    table: { border: '1px solid black', margin: '16px 0' }
});

const PdfViewer = () => {
  const [state, dispatch] = useContext(StoreContext);
  const navigate = useNavigate();

  console.log(state.pdfDoc);
  const businessName = state.pdfDoc.businessName;
  const loan = state.pdfDoc.loan;
  const owner = state.pdfDoc.owner;
  const pnmList = state.pdfDoc.pnmList;
  const rented = state.pdfDoc.rented;
  const data = state.pdfDoc.data;

  console.log(
    "businessName ->",
    businessName,
    "loan ->",
    loan,
    "owner ->",
    owner,
    "pnmList ->",
    pnmList,
    "rented ->",
    rented,
    "data ->",
    data
  );

  useEffect(() => {
    if (!state.pdfDoc) {
      navigate(-1);
    }
  }, []);

  const pnmTotal = () => {
    const value = pnmList.map((obj, i) => obj.price);
    return value.reduce((acc, currentVal) => acc + currentVal, 0);
  };

  return (
    <>
      <PDFViewer style={styles.viewer}>
        <Document styles={styles.page}>
          <Page size="A4" style={styles.page}>
            <View style={styles.sidePadding}>
              <Text style={styles.h1}>Project report on {businessName}</Text>

              <View style={styles.flexCol}>
                <Text style={styles.semiBold}>Introduction :</Text>
                <Text style={styles.smText}>Intro here</Text>
              </View>

              <View style={styles.flexCol}>
                <Text style={styles.semiBold}>Market Potential :</Text>
                <Text>{data.market_potential}</Text>
              </View>

              <View style={styles.flexCol}>
                <Text style={styles.semiBold}>Location :</Text>
                <Text>{data.location}</Text>
              </View>

              <View style={styles.flexCol}>
                <Text style={styles.semiBold}>Presumptions :</Text>
                {/* <Text>{data.location}</Text> */}
              </View>

              <View style={styles.flexCol}>
                <Text style={styles.semiBold}>Presumptions :</Text>
                {/* <Text>{data.location}</Text> */}
              </View>

              <View style={styles.flexCol}>
                <Text style={styles.semiBold}>
                  Schedule of Implementation :
                </Text>
                {/* <Text>{data.location}</Text> */}
              </View>

              <View style={styles.flexCol}>
                <Text style={styles.semiBold}>Technical aspect :</Text>
                <Text>{data.manufacturing_process}</Text>
              </View>

              <View style={styles.flexCol}>
                <Text style={styles.semiBold}>Financial aspect :</Text>

                <View>
                  <Text style={styles.semiBold}>A. Fixed Capital</Text>
                  <Text style={styles.smText}>Land and Building :- {data.land_building}</Text>
                </View>
                <View>
                  <Text style={styles.semiBold}>Plant and Machinery</Text>

                  {/* TABLE START  */}
                  <View style={styles.table}>
                    <View style={styles.flexRow}>
                      <View style={styles.flexBasis15}><Text style={styles.smText}>Sl. No</Text></View>
                      <View style={styles.flexBasis60}><Text style={styles.smText}>Item</Text></View>
                      <View style={styles.flexBasis25}><Text style={styles.smText}>Cost (Rs.)</Text></View>
                    </View>
                    {state.pdfDoc.pnmList && state.pdfDoc.pnmList.length > 0 && state.pdfDoc.pnmList.map((obj, i) => (
                      <View key={uuid() + i}>
                        <View><Text style={styles.smText}>{i + 1}</Text></View> style={styles.smText}
                        <View><Text style={styles.smText}>{obj?.name}</Text></View>
                        <View><Text style={styles.smText}>{obj?.price}</Text></View>
                      </View>
                    ))}
                    <View style={styles.flexRow}>
                      <View style={styles.flexBasis15}></View>
                      <View style={styles.flexBasis60}><Text>Total</Text></View>
                      <View style={styles.flexBasis25}><Text>{pnmTotal()}</Text></View>
                    </View>
                  </View>
                  {/* TABLE END */}
                </View>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </>
  );
};

export default PdfViewer;

{
  /* <Image style={styles.image} src="/logo.png" />
                        <Text
                            style={{
                                position: "relative",
                                textAlign: "center",
                                fontSize: "30px",
                                fontWeight: "bold",
                                marginBottom: 20,
                                color: "#2a275c",
                            }}
                        >
                            {state.pdfDoc.title}
                        </Text>
                        <View
                            style={{
                                width: "95%",
                                marginLeft: "auto",
                                marginRight: "auto",
                                paddingBottom: "20",
                                fontSize: "15",
                            }}
                        >
                            <View
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                }}
                            >
                                <Text>{`Name: ${state.pdfDoc.generalData.name}`}</Text>
                                <Text>{`Phone: ${state.pdfDoc.generalData.phone}`}</Text>
                            </View>
                            <Text>{`Address: ${state.pdfDoc.generalData.address}`}</Text>
                            <Text>{`Invoice Number: ${state.pdfDoc.generalData.invoiceNumber}`}</Text>
                            <Text>{`Invoice Date: ${state.pdfDoc.generalData.invoiceDate}`}</Text>
                        </View>
                        <View style={styles.rowViewHeader}>
                            {state.pdfDoc.column.map((c, i) => (
                                <Text
                                    key={uuid() + i}
                                    style={{
                                        position: "relative",
                                        width: `${100 / state.pdfDoc.column.length}%`,
                                    }}
                                >
                                    {c}
                                </Text>
                            ))}
                        </View>
                        {state.pdfDoc.data.map((rowData) => (
                            <>
                                <View style={styles.rowView}>
                                    {state.pdfDoc.column.map((c) => (
                                        <Text
                                            key={uuid()}
                                            style={{
                                                width: `${100 / state.pdfDoc.column.length}%`,
                                                position: "relative",
                                                fontSize: "12px",
                                            }}
                                        >
                                            {rowData[c]}
                                        </Text>
                                    ))}
                                </View>
                            </>
                        ))}
                        <View
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "95%",
                                flexDirection: "row",
                                alignSelf: "center",
                                border: "1px solid grey",
                                paddingTop: 8,
                                paddingBottom: 8,
                                backgroundColor: "gray",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: "13",
                                    position: "relative",
                                    right: "-100%",
                                }}
                            >
                                Total
                            </Text>
                            <Text
                                style={{ fontSize: "13", position: "relative", left: "-100%" }}
                            >
                                {total} 
                            </Text>
                        </View>
                        <View
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "95%",
                                flexDirection: "row",
                                alignSelf: "center",
                                border: "1px solid grey",
                                paddingTop: 8,
                                paddingBottom: 8,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: "13",
                                    position: "relative",
                                    right: "-100%",
                                }}
                            >
                                GST
                            </Text>
                            <Text
                                style={{ fontSize: "13", position: "relative", left: "-100%" }}
                            >
                                {gst} 
                            </Text>
                        </View>
                        <View
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "95%",
                                flexDirection: "row",
                                alignSelf: "center",
                                border: "1px solid grey",
                                paddingTop: 8,
                                paddingBottom: 8,
                                backgroundColor: "gray",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: "13",
                                    position: "relative",
                                    right: "-100%",
                                }}
                            >
                                Payable Amount
                            </Text>
                            <Text
                                style={{ fontSize: "13", position: "relative", left: "-100%" }}
                            >
                                {payableAmount} 
                            </Text>
                        </View>
                        <View style={styles.footer}>
                            <Link style={
styles.link} src="itaxeasy.com">
                                www.itaxeasy.com{"   |   "}
                            </Link>
                            <Text style={styles.link}>
                                Email : info@itaxeasy.com
                            </Text>
                        </View> */
}
