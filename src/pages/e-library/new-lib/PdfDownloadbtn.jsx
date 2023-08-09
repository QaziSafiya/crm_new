import { PDFDownloadLink } from "@react-pdf/renderer";

import PdfViewer from "./libraryPdfViewer";

export const PdfDownloadButton = ({ pageData }) => (
    <PDFDownloadLink style={{padding:"15px 40px",borderRadius:"9px",backgroundColor:"#2a275c",color:"white",fontWeight:"bold"}} document={<PdfViewer libraryPdfDoc={pageData} />} fileName="library.pdf">
      {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
    </PDFDownloadLink>
);
  