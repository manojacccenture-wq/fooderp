import qz from 'qz-tray';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const connectPrinter = async () => {
  if (!qz.websocket.isActive()) {
    try {
      await qz.websocket.connect({ retries: 2, delay: 1 });
      return true;
    } catch (err) {
      console.error('Failed to connect to QZ Tray:', err);
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
    console.error('Error finding printers:', err);
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

    // Added for 80mm receipt rendering
    clone.style.width = '80mm';

    document.body.appendChild(clone);

    const canvas = await html2canvas(clone, {
      scale: 3,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    // Remove clone after capture
    document.body.removeChild(clone);

    const imgData = canvas.toDataURL('image/jpeg', 1.0);

    // Thermal receipt width is standard 80mm
    const pdfWidth = 80;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    const pdf = new jsPDF({
      unit: 'mm',
      format: [pdfWidth, pdfHeight],
      orientation: 'portrait'
    });

    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);

    // We get the raw base64 data string (ignoring the 'data:application/pdf;base64,' prefix)
    const base64Pdf = pdf.output('datauristring').split(',')[1];

    console.log("PDF generated successfully");
    console.log("Base64 preview:", base64Pdf.substring(0, 100));

    const config = qz.configs.create(printerName, {
      margins: 0,
      colorType: 'grayscale',

      // Added for 80mm paper
      units: 'mm',
      size: {
        width: 80,
        height: pdfHeight
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
    console.error('Print failed:', err);
    return { success: false, error: err.message };
  }
};

export const disconnectPrinter = () => {
  if (qz.websocket.isActive()) {
    qz.websocket.disconnect();
  }
};