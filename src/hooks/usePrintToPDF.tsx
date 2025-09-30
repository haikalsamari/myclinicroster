import { useReactToPrint } from "react-to-print";

export const usePrintToPDF = (ref: React.RefObject<HTMLDivElement | null>) => {
  const handlePrint = useReactToPrint({
    contentRef: ref,
    documentTitle: "Staff Roster Calendar",
    pageStyle: `
      @page {
        margin: 10mm 5mm;
      }
      @media print {
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
          
        body {
          margin: 0;
          padding: 0;
        }
      }
    `,
  });

  return handlePrint;
};
