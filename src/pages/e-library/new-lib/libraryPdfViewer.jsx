import React, { useContext } from "react";
// import { StoreContext } from "../../store/store-context";
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

const styles = StyleSheet.create({
    page: {
        backgroundColor: "white",
        color: "black",
        marginTop: "70",
    },
    rowViewHeader: {
        width: "90%",
        display: "flex",
        flexDirection: "row",
        alignSelf: "center",
        border: "1px solid grey",
        paddingTop: 8,
        paddingBottom: 8,
        textAlign: "center",
        backgroundColor: "gray",
        fontWeight: "bold",
        fontSize: "18px",
    },
    rowView: {
        width: "90%",
        display: "flex",
        flexDirection: "row",
        alignSelf: "center",
        border: "1px solid grey",
        paddingTop: 8,
        paddingBottom: 8,
        textAlign: "center",
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
        width: window.innerWidth, //the pdf viewer will take up all of the width and height
        height: window.innerHeight,
    },
    link: {
        color: "black",
        textDecoration: "none",
        paddingRight: "10px",
        fontSize: "10px",
    },
    footer: {
        position: "absolute",
        bottom: "10%",
        left: "40%",
        textAlign: "center",
        transform: "translate(-50%,0)",
        display: "flex",
        flexDirection: "row",
    },
});





const PdfViewer = (state) => {
    //   const [state, dispatch] = useContext(StoreContext);
console.log("abcd",state)

    return (
        <>
            {state.libraryPdfDoc ?
                <Document styles={styles.page}>
                    <Page size="A4" style={styles.page}>
                        <Image style={styles.image} src="/logo.png" />
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
                            {/* {state.libraryPdfDoc?.subject} */}
                            Case Details
                        </Text>
                        <View style={styles.rowViewHeader}>
                            <Text
                                style={{
                                    position: "relative",
                                    width: `${40}%`,
                                }}
                            >
                                Field
                            </Text>
                            <Text
                                style={{
                                    position: "relative",
                                    width: `${60}%`,
                                }}
                            >
                                Value
                            </Text>
                        </View>
                        {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                        <View style={styles.rowView}>
                            <Text
                                style={{
                                    width: `${40}%`,
                                    position: "relative",
                                    fontSize: "12px",
                                }}
                            >
                                PAN
                            </Text>
                            <Text
                                style={{
                                    width: `${60}%`,
                                    position: "relative",
                                    fontSize: "12px",
                                }}
                            >
                                {state.libraryPdfDoc?.pan}
                            </Text>
                        </View>

                        <View style={styles.rowView}>
                            <Text
                                style={{
                                    width: `${40}%`,
                                    position: "relative",
                                    fontSize: "12px",
                                }}
                            >
                                Section
                            </Text>
                            <Text
                                style={{
                                    width: `${60}%`,
                                    position: "relative",
                                    fontSize: "12px",
                                }}
                            >
                                {state.libraryPdfDoc?.section}
                            </Text>
                        </View>

                        <View style={styles.rowView}>
                            <Text
                                style={{
                                    width: `${40}%`,
                                    position: "relative",
                                    fontSize: "12px",
                                }}
                            >
                                Sub Section
                            </Text>
                            <Text
                                style={{
                                    width: `${60}%`,
                                    position: "relative",
                                    fontSize: "12px",
                                }}
                            >
                                {state.libraryPdfDoc?.sub_section}
                            </Text>
                        </View>

                        <View style={styles.rowView}>
                            <Text
                                style={{
                                    width: `${40}%`,
                                    position: "relative",
                                    fontSize: "12px",
                                }}
                            >
                                Subject
                            </Text>
                            <Text
                                style={{
                                    width: `${60}%`,
                                    position: "relative",
                                    fontSize: "12px",
                                }}
                            >
                                {state.libraryPdfDoc?.subject}
                            </Text>
                        </View>

                        <View style={styles.rowView}>
                            <Text
                                style={{
                                    width: `${40}%`,
                                    position: "relative",
                                    fontSize: "12px",
                                }}
                            >
                                AO Order
                            </Text>
                            <Text
                                style={{
                                    width: `${60}%`,
                                    position: "relative",
                                    fontSize: "12px",
                                }}
                            >
                                {state.libraryPdfDoc?.ao_order}
                            </Text>
                        </View>

                        <View style={styles.rowView}>
                            <Text
                                style={{
                                    width: `${40}%`,
                                    position: "relative",
                                    fontSize: "12px",
                                }}
                            >
                                ITAT No.
                            </Text>
                            <Text
                                style={{
                                    width: `${60}%`,
                                    position: "relative",
                                    fontSize: "12px",
                                }}
                            >
                                {state.libraryPdfDoc?.itat_no}
                            </Text>
                        </View>


                        <View style={styles.rowView}>
                            <Text
                                style={{
                                    width: `${40}%`,
                                    position: "relative",
                                    fontSize: "12px",
                                }}
                            >
                                 Judgment
                            </Text>
                            <Text
                                style={{
                                    width: `${60}%`,
                                    position: "relative",
                                    fontSize: "12px",
                                }}
                            >
                             {state.libraryPdfDoc?.judgment}
                            </Text>
                        </View>


                        <View style={styles.rowView}>
                            <Text
                                style={{
                                    width: `${40}%`,
                                    position: "relative",
                                    fontSize: "12px",
                                }}
                            >
                                Appeal No.
                            </Text>
                            <Text
                                style={{
                                    width: `${60}%`,
                                    position: "relative",
                                    fontSize: "12px",
                                }}
                            >
                                {state.libraryPdfDoc?.appeal_no}
                            </Text>
                        </View>

                        <View style={styles.rowView}>
                            <Text
                                style={{
                                    width: `${40}%`,
                                    position: "relative",
                                    fontSize: "12px",
                                }}
                            >
                                Respondent
                            </Text>
                            <Text
                                style={{
                                    width: `${60}%`,
                                    position: "relative",
                                    fontSize: "12px",
                                }}
                            >
                                {state.libraryPdfDoc?.respondent}
                            </Text>
                        </View>

                        <View style={styles.rowView}>
                            <Text
                                style={{
                                    width: `${40}%`,
                                    position: "relative",
                                    fontSize: "12px",
                                }}
                            >
                                Appealant
                            </Text>
                            <Text
                                style={{
                                    width: `${60}%`,
                                    position: "relative",
                                    fontSize: "12px",
                                }}
                            >
                                {state.libraryPdfDoc?.appellant}
                            </Text>
                        </View>

                        <View style={styles.rowView}>
                            <Text
                                style={{
                                    width: `${40}%`,
                                    position: "relative",
                                    fontSize: "12px",
                                }}
                            >
                                Appeal Filled By
                            </Text>
                            <Text
                                style={{
                                    width: `${60}%`,
                                    position: "relative",
                                    fontSize: "12px",
                                }}
                            >
                                {state.libraryPdfDoc?.appeal_filed_by}
                            </Text>
                        </View>

                        <View style={styles.rowView}>
                            <Text
                                style={{
                                    width: `${40}%`,
                                    position: "relative",
                                    fontSize: "12px",
                                }}
                            >
                                Appeal Type
                            </Text>
                            <Text
                                style={{
                                    width: `${60}%`,
                                    position: "relative",
                                    fontSize: "12px",
                                }}
                            >
                                {state.libraryPdfDoc?.appeal_type}
                            </Text>
                        </View>

                        <View style={styles.rowView}>
                            <Text
                                style={{
                                    width: `${40}%`,
                                    position: "relative",
                                    fontSize: "12px",
                                }}
                            >
                                Order result
                            </Text>
                            <Text
                                style={{
                                    width: `${60}%`,
                                    position: "relative",
                                    fontSize: "12px",
                                }}
                            >
                                {state.libraryPdfDoc?.order_result}
                            </Text>
                        </View>

                        <View style={styles.rowView}>
                            <Text
                                style={{
                                    width: `${40}%`,
                                    position: "relative",
                                    fontSize: "12px",
                                }}
                            >
                                Tribunal Order Date
                            </Text>
                            <Text
                                style={{
                                    width: `${60}%`,
                                    position: "relative",
                                    fontSize: "12px",
                                }}
                            >
                                {state.libraryPdfDoc?.tribunal_order_date}
                            </Text>
                        </View>

                        <View style={styles.rowView}>
                            <Text
                                style={{
                                    width: `${40}%`,
                                    position: "relative",
                                    fontSize: "12px",
                                }}
                            >
                                Assesment Year
                            </Text>
                            <Text
                                style={{
                                    width: `${60}%`,
                                    position: "relative",
                                    fontSize: "12px",
                                }}
                            >
                                {state.libraryPdfDoc?.assessment_year}
                            </Text>
                        </View>

                        <View style={styles.rowView}>
                            <Text
                                style={{
                                    width: `${40}%`,
                                    position: "relative",
                                    fontSize: "12px",
                                }}
                            >
                                Conclusion
                            </Text>
                            <Text
                                style={{
                                    width: `${60}%`,
                                    position: "relative",
                                    fontSize: "12px",
                                }}
                            >
                                {state.libraryPdfDoc?.conclusion}
                            </Text>
                        </View>


                        {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                        <View style={styles.footer}>
                            <Link style={styles.link} src="itaxeasy.com">
                                www.itaxeasy.com{"   |   "}
                            </Link>
                            <Text style={styles.link}>
                                Email : info@itaxeasy.com
                            </Text>
                        </View>
                    </Page>
                    {/* <Page>
                        <View>
                            <Text style={{
                                position: "relative",
                                textAlign: "center",
                                fontSize: "30px",
                                fontWeight: "bold",
                                marginBottom: 10,
                                marginTop: 20,
                                color: "#2a275c",
                            }}>
                                Judgment
                            </Text>
                            <Text style={{
                                width: "85%",
                                margin: "auto",
                                fontSize: "11px"
                            }}>
                                {state.libraryPdfDoc?.judgment}
                            </Text>
                        </View>
                    </Page> */}
                </Document>
             : <div className="fixed h-screen w-screen bg-white flex items-center justify-center">
                <img src='/loading.svg' alt='loading...' style={{ width: '100px' }} />
            </div> }
        </>
    );
};

export default PdfViewer;
