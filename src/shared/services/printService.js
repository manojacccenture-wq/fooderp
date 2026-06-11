import qz from 'qz-tray';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const connectPrinter = async () => {
  if (!qz.websocket.isActive()) {
    try {
      await qz.websocket.connect({ retries: 2, delay: 1 });
      return true;
    } catch (err) {
      
      return false;
    }
  }
  return true;
};

export const findAvailablePrinters = async () => {
  try {
    const isConnected = await connectPrinter();
    if (!isConnected) return [];

    return await qz.printers.find();
  } catch (err) {
    
    return [];
  }
};

export const printReceiptElement = async (printerName, element) => {
  try {
    const isConnected = await connectPrinter();
    if (!isConnected) {
      throw new Error('QZ Tray not connected');
    }

    // Give React and any images (like QR code) a tiny bit of time to fully render
    await new Promise(resolve => setTimeout(resolve, 300));

    // Clone element to ensure it's rendered correctly by html2canvas without viewport clipping
    const clone = element.cloneNode(true);
    clone.style.position = 'fixed';
    clone.style.top = '0px';
    clone.style.left = '0px';
    clone.style.zIndex = '-9999';

    // Target a 78mm printable area for an 80mm paper to use full width
    clone.style.width = '78mm';
    clone.style.backgroundColor = '#ffffff';

    // Inject optimization styles specifically for TRUE 80mm thermal printing
    const styleBlock = document.createElement('style');
    styleBlock.innerHTML = `
      /* Global reset for crisp monochrome printing */
      * {
        color: #000 !important;
        font-family: monospace, sans-serif !important;
        box-shadow: none !important;
      }
      
      /* Base font sizes */
      body, div, span, p { font-size: 8px !important; line-height: 1.2 !important; }

      /* Proportional font size reduction */
      .text-xs, .text-sm, .text-base, .text-lg { font-size: 8px !important; line-height: 1.2 !important; }
      .text-xl { font-size: 10px !important; line-height: 1.2 !important; font-weight: bold !important; }
      .text-2xl, .text-3xl { font-size: 11px !important; line-height: 1.2 !important; font-weight: bold !important; }
      
      /* Typography adjustments */
      .font-bold, .font-semibold, .font-extrabold { font-weight: bold !important; }

      /* Compress vertical spacing and padding */
      .p-4, .p-5, .p-6, .p-8 { padding: 2px !important; }
      .px-4, .px-5, .px-6, .px-8 { padding-left: 2px !important; padding-right: 2px !important; }
      .py-4, .py-5, .py-6, .py-8 { padding-top: 2px !important; padding-bottom: 2px !important; }
      .m-4, .m-5, .m-6, .m-8 { margin: 2px !important; }
      .my-4, .my-5, .my-6, .my-8 { margin-top: 2px !important; margin-bottom: 2px !important; }
      .mb-2 { margin-bottom: 1px !important; }
      .mb-4, .mb-6 { margin-bottom: 2px !important; }
      .mt-4, .mt-6 { margin-top: 2px !important; }
      .gap-1, .gap-2 { gap: 1px !important; }
      .gap-3, .gap-4, .gap-6 { gap: 2px !important; }

      /* Maximize printable area */
      .container, .max-w-md, .mx-auto { 
        max-width: 100% !important; 
        margin: 0 !important; 
        padding: 0 !important;
      }

      /* Optimize item table layout */
      table {
        width: 100% !important;
        table-layout: fixed !important;
        border-collapse: collapse !important;
      }
      th, td {
        padding: 1px 0 !important;
        word-wrap: break-word !important;
        font-size: 8px !important;
      }
      /* Ensure first column (Item) gets max width */
      th:first-child, td:first-child {
        width: 70% !important;
        text-align: left !important;
      }
      /* Ensure middle columns are compact */
      th:not(:first-child):not(:last-child), td:not(:first-child):not(:last-child) {
        width: 10% !important;
        text-align: center !important;
      }
      /* Amount column right aligned */
      th:last-child, td:last-child {
        width: 20% !important;
        text-align: right !important;
      }
      
      /* Separators and lines */
      hr, .border-b, .border-t, .border-dashed {
        border-color: #000 !important;
        margin-top: 1px !important;
        margin-bottom: 1px !important;
        width: 100% !important;
      }
      
      /* Disable rounded corners and background colors */
      .rounded-xl, .rounded-lg, .rounded-md, .rounded-full { border-radius: 0 !important; }
      .bg-gray-50, .bg-gray-100 { background-color: transparent !important; }
    `;
    clone.appendChild(styleBlock);

    document.body.appendChild(clone);

    const canvas = await html2canvas(clone, {
      scale: 3, // High resolution
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    // Remove clone after capture
    document.body.removeChild(clone);

    const imgData = canvas.toDataURL('image/jpeg', 1.0);

    // Thermal receipt standard 80mm paper
    const paperWidth = 80;
    // We rendered at 78mm printable area to utilize full width
    const printWidth = 78; 
    const printHeight = (canvas.height * printWidth) / canvas.width;
    
    // Center the 78mm print area onto the 80mm paper (leaves 1mm margin on left and right)
    const xOffset = 1;

    const pdf = new jsPDF({
      unit: 'mm',
      format: [paperWidth, printHeight],
      orientation: 'portrait'
    });

    pdf.addImage(imgData, 'JPEG', xOffset, 0, printWidth, printHeight);

    // We get the raw base64 data string (ignoring the 'data:application/pdf;base64,' prefix)
    const base64Pdf = pdf.output('datauristring').split(',')[1];

    
    

    const config = qz.configs.create(printerName, {
      margins: 0,
      colorType: 'grayscale',

      // Added for 80mm paper
      units: 'mm',
      size: {
        width: paperWidth,
        height: printHeight
      }
    });

    const data = [{
      type: 'pdf',
      format: 'base64',
      data: base64Pdf
    }];

    await qz.print(config, data);
    return { success: true };
  } catch (err) {
    
    return { success: false, error: err.message };
  }
};

export const disconnectPrinter = () => {
  if (qz.websocket.isActive()) {
    qz.websocket.disconnect();
  }
};