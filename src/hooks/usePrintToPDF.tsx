import { useReactToPrint } from "react-to-print";

export const usePrintToPDF = (ref: React.RefObject<HTMLDivElement | null>) => {
  const handlePrint = useReactToPrint({
    contentRef: ref,
    documentTitle: "Staff Roster Calendar",
    pageStyle: `
        @page {
          size: 0mm 0mm;
        }
    `,
  });

  return handlePrint;
};
