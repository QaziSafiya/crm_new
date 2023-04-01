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
import uuid from "react-uuid";
import { redirect } from "react-router-dom";


const styles = StyleSheet.create({
  viewer: {
    width: window.innerWidth, //the pdf viewer will take up all of the width and height
    height: window.innerHeight,
  },
  page: {
    backgroundColor: "white",
    color: "black",
  },
  image: {
    position: "absolute",
    left: "33%",
    top: "35%",
    transform: "translate(-50%,-50%)",
    width: 300,
    height: 300,
    opacity: 0.2,
    zIndex: -100,
    margin: "auto",
  },
  page1: {
    position: "absolute",
    top: "25%",
    width: "100%",
    height: "100%",
    margin: "auto",
    textAlign: "center",
    fontSize: "30px",
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2a275c",
  },
  logo: {
    position: "absolute",
    left: "33%",
    width: 200,
    height: 200,
    margin: "auto",
  },
  commonHeading: {
    top: "26%"
  },
  topic: {
    top: "28%",
    padding: "20px 15px",
    backgroundColor: "#CDCDCD",

  },
  link: {
    color: "black",
    textDecoration: "none",
    paddingRight: "10px",
    fontSize: "15px",
  },
  footer: {
    position: "absolute",
    bottom: "5%",
    left: "33%",
    textAlign: "center",
    transform: "translate(-50%,0)",
    display: "flex",
    flexDirection: "row",
  },
  introContent: {
    width: "95%",
    margin: "auto",
    fontSize: "13px",
    marginTop: "14px",
    padding: "10px 10px",
    backgroundColor: "#CDCDCD",
    borderRadius: "5px"
  },
  underline: {
    fontSize: "25px",
    textDecoration: "underline",
    padding: "20px 0 0 0",
  },
  tableRow: {
    width: "90%",
    margin: "auto",
    display: "flex",
    flexDirection: "row",
    fontSize: "15px",
  },
  tableHeader: {
    width: "90%",
    margin: "20px auto 0 auto",
    backgroundColor: "#cdcdcd",
    display: "flex",
    flexDirection: "row",
    fontSize: "15px",
  },
  totalRow: {
    width: "90%",
    margin: "auto",
    backgroundColor: "#cdcdcd",
    display: "flex",
    flexDirection: "row",
    fontSize: "15px",
  }
  // heading: {
  //   top: "23%",
  //   textAlign:"center",
  //   fontSize:"30px",
  //   fontWeight:"extrabold"
  // }
});

const PdfViewer = () => {
  const [state, dispatch] = useContext(StoreContext);
  const navigate = useNavigate();

  const businessName = state.pdfDoc.businessName;
  const intro = state.pdfDoc.intro;
  const loan = state.pdfDoc.loan;
  const owner = state.pdfDoc.owner;
  const pnmList = state.pdfDoc?.pnmList;
  const rented = state.pdfDoc.rented;
  const data = state.pdfDoc?.data;


  useEffect(() => {
    if (!state.pdfDoc?.businessName) {
      navigate("../project-report",{replace:true})
    }
  }, [state]);

  const pnmTotal = () => {
    const value = pnmList.map((obj, i) => obj.price);
    return value.reduce((acc, currentVal) => +acc + (+currentVal), 0);
  };

  const totalWorkinCapital = () => {
    return +data.otherCharge + (+data.electricity_charges) + (+data.wages) + (+data.rawMaterial) + (+data.monthlyRent || 0)
  }


  const totalInitialCost = () => {
    return +pnmTotal() + (+totalWorkinCapital()) + ((+data.value_of_land) || (+data.securityDeposit))
  }

  const totalFinance = () => {
    return +data.promoter + (+data.amountLoan || 0)
  }

  const totalDepreciation = () => {
    return pnmList.map(item => +item.price * (+item.rate / 100)).reduce((acc, curr) => +acc + (+curr), 0)
  }

  const totalCostYearly=()=>{
    return (+totalWorkinCapital() * 12) + (+totalDepreciation()) + ((+data.value_of_land * (+data.depreciationValue / 100)) || 0) + ((+data.amountLoan * (+data.interestRate / 100))||0)
  }

  return (
    <>
      {state.pdfDoc?.businessName && <PDFViewer style={styles.viewer}>
        <Document styles={styles.page}>
          <Page styles={styles.page} size="A4">
            <View style={{
              position: "relative",
              width: "95%",
              margin: "auto",
              height: "97vh",
              border: "4px solid #2a275d"
            }}>
              <View style={styles.page1}>
                <Image style={styles.logo} src="/logo.png" />
                <Text style={styles.commonHeading}>
                  Project profile on
                </Text>
                <Text style={styles.topic}>
                  {businessName}
                </Text>
              </View>
            </View>
            <View style={styles.footer}>
              <Link style={styles.link} src="itaxeasy.com">
                www.itaxeasy.com{"   |   "}
              </Link>
              <Text style={styles.link}>
                Email : info@itaxeasy.com
              </Text>
            </View>
          </Page>
          <Page styles={styles.page} size="A4">
            <View style={{
              position: "relative",
              width: "95%",
              margin: "auto ", ////
              minHeight: "97vh",
              border: "4px solid #2a275d",
              display: "flex",
              flexDirection: "column",
            }}>
              <View style={{
                position: "relative",
                padding: "20px 0 0 0",
                textAlign: "center",
                width: "100%",
              }}>
                <Text style={{
                  fontSize: "25px",
                  textDecoration: "underline",
                }}>
                  Introduction
                </Text>
                <Text style={styles.introContent}>
                  {intro}
                </Text>
                <Text style={styles.underline}>
                  Fixed Capital
                </Text>
                <Text style={{
                  textAlign: "left",
                  width: "95%",
                  margin: "auto",
                  fontSize: "13px",
                  padding: "20px 0 0 0",
                }}>
                  Area of Land/Building - {data.land_building} sq/m
                </Text>
                <Text style={{
                  textAlign: "left",
                  width: "95%",
                  margin: "auto",
                  fontSize: "13px",
                  padding: "20px 0 0 0",
                }}>
                  {data.value_of_land && `Price of Land/Building - ${data.value_of_land} Rs`}
                  {data.securityDeposit && `Price of Security of Land/Building - ${data.securityDeposit} Rs`}
                </Text>
                <Text style={{
                  fontSize: "16px",
                  textDecoration: "underline",
                  padding: "20px 0 0 0",
                }} >
                  Plant and Machinery
                </Text>
                <View style={styles.tableHeader}>
                  <Text style={{ width: "15%", border: "1px solid black" }}>
                    S.no
                  </Text>
                  <Text style={{ width: "60%", border: "1px solid black" }}>
                    Item
                  </Text>
                  <Text style={{ width: "25%", border: "1px solid black" }}>
                    Price
                  </Text>
                </View>
                {pnmList.map((item, i) => {
                  return <View style={styles.tableRow}>
                    <Text style={{ width: "15%", border: "1px solid black" }}>
                      {i + 1}
                    </Text>
                    <Text style={{ width: "60%", border: "1px solid black" }}>
                      {item.name}
                    </Text>
                    <Text style={{ width: "25%", border: "1px solid black" }}>
                      {item.price}
                    </Text>
                  </View>
                })}
                <View style={styles.totalRow}>
                  <Text style={{ width: "75%", border: "1px solid black", textAlign: "right", paddingRight: "5px" }}>
                    TOTAL
                  </Text>
                  <Text style={{ width: "25%", border: "1px solid black" }}>
                    {pnmTotal()} Rs
                  </Text>
                </View>
                <View>
                  <Text style={{ fontSize: "16px", marginTop: "20px" }}>
                    Total Fixed Capital - {`${data.value_of_land || data.securityDeposit} Rs + ${pnmTotal()} Rs`} - {(+data.value_of_land || +data.securityDeposit) + (+pnmTotal())} Rs
                  </Text>
                </View>
              </View>
            </View>
          </Page>





          <Page>
            <View style={{
              position: "relative",
              width: "95%",
              margin: "auto ", ////
              minHeight: "97vh",
              border: "4px solid #2a275d"
            }}>
              <View style={{
                position: "relative",
                padding: "40px 0 0 0",
                textAlign: "center",
                width: "100%",
              }}>
                <Text style={{
                  fontSize: "25px",
                  textDecoration: "underline",
                }}>
                  Working Capital per Month
                </Text>
                <View style={styles.tableHeader}>
                  <Text style={{ width: "15%", border: "1px solid black" }}>
                    S.no
                  </Text>
                  <Text style={{ width: "60%", border: "1px solid black" }}>
                    Item
                  </Text>
                  <Text style={{ width: "25%", border: "1px solid black" }}>
                    Price
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={{ width: "15%", border: "1px solid black" }}>
                    1
                  </Text>
                  <Text style={{ width: "60%", border: "1px solid black" }}>
                    Raw Materials
                  </Text>
                  <Text style={{ width: "25%", border: "1px solid black" }}>
                    {data.rawMaterial}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={{ width: "15%", border: "1px solid black" }}>
                    2
                  </Text>
                  <Text style={{ width: "60%", border: "1px solid black" }}>
                    Wages
                  </Text>
                  <Text style={{ width: "25%", border: "1px solid black" }}>
                    {data.wages}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={{ width: "15%", border: "1px solid black" }}>
                    3
                  </Text>
                  <Text style={{ width: "60%", border: "1px solid black" }}>
                    Electricity Charges
                  </Text>
                  <Text style={{ width: "25%", border: "1px solid black" }}>
                    {data.electricity_charges}
                  </Text>
                </View>
                {data.monthlyRent && <View style={styles.tableRow}>
                  <Text style={{ width: "15%", border: "1px solid black" }}>
                    4
                  </Text>
                  <Text style={{ width: "60%", border: "1px solid black" }}>
                    Monthly Rent
                  </Text>
                  <Text style={{ width: "25%", border: "1px solid black" }}>
                    {data.monthlyRent}
                  </Text>
                </View>}
                <View style={styles.tableRow}>
                  <Text style={{ width: "15%", border: "1px solid black" }}>
                    {data.monthlyRent ? "5" : "4"}
                  </Text>
                  <Text style={{ width: "60%", border: "1px solid black" }}>
                    Other Charges
                  </Text>
                  <Text style={{ width: "25%", border: "1px solid black" }}>
                    {data.otherCharge}
                  </Text>
                </View>
                <View style={styles.totalRow}>
                  <Text style={{ width: "75%", border: "1px solid black", textAlign: "right", paddingRight: "5px" }}>
                    TOTAL
                  </Text>
                  <Text style={{ width: "25%", border: "1px solid black" }}>
                    {totalWorkinCapital()} Rs
                  </Text>
                </View>
                <View>
                  <Text style={{ fontSize: "16px", marginTop: "20px" }}>
                    Total Working Capital (Monthly) - {totalWorkinCapital()} Rs
                  </Text>
                </View>
                <Text style={{
                  fontSize: "25px",
                  textDecoration: "underline",
                  marginTop: "30px",
                }}>
                  Initial Project Cost
                </Text>
                <View style={styles.tableHeader}>
                  <Text style={{ width: "15%", border: "1px solid black" }}>
                    S.no
                  </Text>
                  <Text style={{ width: "60%", border: "1px solid black" }}>
                    Item
                  </Text>
                  <Text style={{ width: "25%", border: "1px solid black" }}>
                    Price
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={{ width: "15%", border: "1px solid black" }}>
                    1
                  </Text>
                  <Text style={{ width: "60%", border: "1px solid black" }}>
                    Machinery
                  </Text>
                  <Text style={{ width: "25%", border: "1px solid black" }}>
                    {pnmTotal()}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={{ width: "15%", border: "1px solid black" }}>
                    2
                  </Text>
                  <Text style={{ width: "60%", border: "1px solid black" }}>
                    Working Capital
                  </Text>
                  <Text style={{ width: "25%", border: "1px solid black" }}>
                    {totalWorkinCapital()}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={{ width: "15%", border: "1px solid black" }}>
                    3
                  </Text>
                  <Text style={{ width: "60%", border: "1px solid black" }}>
                    Building/Security Deposit
                  </Text>
                  <Text style={{ width: "25%", border: "1px solid black" }}>
                    {data.value_of_land || data.securityDeposit}
                  </Text>
                </View>
                <View style={styles.totalRow}>
                  <Text style={{ width: "75%", border: "1px solid black", textAlign: "right", paddingRight: "5px" }}>
                    TOTAL
                  </Text>
                  <Text style={{ width: "25%", border: "1px solid black" }}>
                    {totalInitialCost()} Rs
                  </Text>
                </View>
                <View>
                  <Text style={{ fontSize: "16px", marginTop: "20px" }}>
                    Total Initial Project Cost - {totalInitialCost()} Rs
                  </Text>
                </View>
                <Text style={{
                  fontSize: "25px",
                  textDecoration: "underline",
                  marginTop: "30px",
                }}>
                  Means Of Finance
                </Text>
                <View style={styles.tableHeader}>
                  <Text style={{ width: "15%", border: "1px solid black" }}>
                    S.no
                  </Text>
                  <Text style={{ width: "60%", border: "1px solid black" }}>
                    Item
                  </Text>
                  <Text style={{ width: "25%", border: "1px solid black" }}>
                    Price
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={{ width: "15%", border: "1px solid black" }}>
                    1
                  </Text>
                  <Text style={{ width: "60%", border: "1px solid black" }}>
                    Promoter's Contribution
                  </Text>
                  <Text style={{ width: "25%", border: "1px solid black" }}>
                    {data.promoter}
                  </Text>
                </View>
                {data.amountLoan && <View style={styles.tableRow}>
                  <Text style={{ width: "15%", border: "1px solid black" }}>
                    2
                  </Text>
                  <Text style={{ width: "60%", border: "1px solid black" }}>
                    Loan {(`(at ${data.interestRate}%)`)}
                  </Text>
                  <Text style={{ width: "25%", border: "1px solid black" }}>
                    {data.amountLoan}
                  </Text>
                </View>}
                <View style={styles.totalRow}>
                  <Text style={{ width: "75%", border: "1px solid black", textAlign: "right", paddingRight: "5px" }}>
                    TOTAL
                  </Text>
                  <Text style={{ width: "25%", border: "1px solid black" }}>
                    {totalFinance()} Rs
                  </Text>
                </View>
                <View>
                  <Text style={{ fontSize: "16px", marginTop: "20px" }}>
                    Total Finance Value - {totalFinance()} Rs
                  </Text>
                </View>
                <Text style={{
                  textAlign: "left",
                  width: "95%",
                  margin: "auto",
                  fontSize: "13px",
                  padding: "50px 0 0 0",
                }}>
                  Expected Sale Turnover per Year - {data.turnover} Rs
                </Text>
              </View>
            </View>
          </Page>



          <Page>
            <View style={{
              position: "relative",
              width: "95%",
              margin: "auto",
              height: "97vh",
              border: "4px solid #2a275d"
            }}>
              <View style={{
                position: "relative",
                padding: "40px 0 0 0",
                textAlign: "center",
                width: "100%",
              }}>
                <Text style={{
                  fontSize: "25px",
                  textDecoration: "underline",
                  marginTop: "30px",
                }}>
                  Cost of Production (anually)
                </Text>
                <View style={styles.tableHeader}>
                  <Text style={{ width: "15%", border: "1px solid black" }}>
                    S.no
                  </Text>
                  <Text style={{ width: "60%", border: "1px solid black" }}>
                    Item
                  </Text>
                  <Text style={{ width: "25%", border: "1px solid black" }}>
                    Price
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={{ width: "15%", border: "1px solid black" }}>
                    1
                  </Text>
                  <Text style={{ width: "60%", border: "1px solid black" }}>
                    Total recurring cost per year(i.e Working Capital for 12 months)
                  </Text>
                  <Text style={{ width: "25%", border: "1px solid black" }}>
                    {+totalWorkinCapital() * 12}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={{ width: "15%", border: "1px solid black" }}>
                    2
                  </Text>
                  <Text style={{ width: "60%", border: "1px solid black" }}>
                    Depreciation on machinery & Equipment
                  </Text>
                  <Text style={{ width: "25%", border: "1px solid black" }}>
                    {totalDepreciation()}
                  </Text>
                </View>
                {data.depreciationValue && <View style={styles.tableRow}>
                  <Text style={{ width: "15%", border: "1px solid black" }}>
                    3
                  </Text>
                  <Text style={{ width: "60%", border: "1px solid black" }}>
                    Depreciation on Building
                  </Text>
                  <Text style={{ width: "25%", border: "1px solid black" }}>
                    {+data.value_of_land * (+data.depreciationValue/100)}
                  </Text>
                </View>}
                {
                  data.interestRate && <View style={styles.tableRow}>
                    <Text style={{ width: "15%", border: "1px solid black" }}>
                      {data.depreciationValue?"4":"3"}
                    </Text>
                    <Text style={{ width: "60%", border: "1px solid black" }}>
                      Interest on Loan Amount
                    </Text>
                    <Text style={{ width: "25%", border: "1px solid black" }}>
                      {+data.amountLoan * (+data.interestRate / 100)}
                    </Text>
                  </View>
                }
                <View style={styles.totalRow}>
                  <Text style={{ width: "75%", border: "1px solid black", textAlign: "right", paddingRight: "5px" }}>
                    TOTAL
                  </Text>
                  <Text style={{ width: "25%", border: "1px solid black" }}>
                    {totalCostYearly()} Rs
                  </Text>
                </View>
                <View>
                  <Text style={{ fontSize: "16px", marginTop: "20px" }}>
                    Total Cost of Production (anually) - {totalCostYearly()} Rs
                  </Text>
                </View>


                <Text style={{
                  fontSize: "25px",
                  textDecoration: "underline",
                  marginTop: "30px",
                }}>
                  Profit Analysis (P.A)
                </Text>

                  <Text style={{ fontSize: "15px", marginTop: "20px" }}>
                   Profit = Expected Sale Turnover - Total Cost of Production (anually) 
                  </Text>
                  <Text style={{ fontSize: "15px", marginTop: "20px" , backgroundColor:"#cdcdcd" , padding:"10px 0"}}>
                    Profit = {data.turnover} - {totalCostYearly()}  = {+data.turnover - (+totalCostYearly())} Rs
                  </Text>

                <Text style={{
                  fontSize: "25px",
                  textDecoration: "underline",
                  marginTop: "30px",
                }}>
                  Rate of Return
                </Text>

                <Text style={{ fontSize: "15px", marginTop: "20px", backgroundColor: "#cdcdcd", padding: "10px 0" }}>
                  On Sale = [Profit * 100/Cost of Production] = {(((+data.turnover - (+totalCostYearly())) * 100) / +totalCostYearly()).toFixed('2')} %
                </Text>
                <Text style={{ fontSize: "15px", marginTop: "20px", backgroundColor: "#cdcdcd", padding: "10px 0" }}>
                  On Capital Investment = [ Profit * 100/Total Capital Investment] = {(((+data.turnover - (+totalCostYearly())) * 100) / +totalInitialCost()).toFixed('2')} %
                </Text>



              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>}
    </>
  );
};

export default PdfViewer;

