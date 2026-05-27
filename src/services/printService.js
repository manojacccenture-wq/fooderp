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

    const canvas = await html2canvas(element, {
      scale: 3,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

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
      colorType: 'grayscale'
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
