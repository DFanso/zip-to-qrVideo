const QRCode = require('qrcode');
const fs = require('fs');
const Jimp = require('jimp');
const jsQR = require('jsqr');

// Function to generate a QR code from a data chunk
const generateQRFromChunk = async (dataChunk, outputPath) => {
    try {
      // Encode data chunk to base64
      const base64Data = dataChunk.toString('base64');
      await QRCode.toFile(outputPath, base64Data, {
        color: {
          dark: '#000',  // Black dots
          light: '#FFF' // White background
        }
      });
    } catch (error) {
      console.error('Error generating QR Code:', error);
    }
  };

// Function to decode data from a QR code image
const decodeQR = async (imagePath) => {
  try {
    const image = await Jimp.read(imagePath);
    const { data } = image.bitmap;
    const qrCode = jsQR(data, image.bitmap.width, image.bitmap.height);

    if (qrCode) {
      return qrCode.data;
    } else {
      throw new Error('QR code could not be decoded.');
    }
  } catch (error) {
    console.error('Error decoding QR Code:', error);
  }
};

module.exports = {
  generateQRFromChunk,
  decodeQR
};
