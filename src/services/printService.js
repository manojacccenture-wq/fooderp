import qz from 'qz-tray';

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

export const printReceipt = async (printerName, htmlContent) => {
  try {
    const isConnected = await connectPrinter();
    if (!isConnected) {
      throw new Error('QZ Tray not connected');
    }

    // Wrap the innerHTML in basic HTML tags for proper rendering in QZ
    const fullHtml = `
      <html>
        <head>
          <style>
            body { margin: 0; padding: 0; font-family: monospace; }
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `;

    const config = qz.configs.create(printerName, {
      margins: 0,
      colorType: 'grayscale', // typical for thermal receipts
    });

    const data = [
      {
        type: 'pixel',
        format: 'html',
        flavor: 'plain',
        data: fullHtml
      }
    ];

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
