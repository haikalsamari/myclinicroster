import { useReactToPrint } from "react-to-print";

export const usePrintToPDF = (ref: React.RefObject<HTMLDivElement | null>) => {
  const handlePrint = useReactToPrint({
    contentRef: ref,
    documentTitle: "Staff Roster Calendar",
    pageStyle: `
        @page {
            size: 400mm 210mm;
            margin: 0mm 0mm 0mm 0mm;
        }
    `,
  });

  return handlePrint;
};
