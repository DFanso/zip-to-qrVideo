const qrHelper = require('./helpers/qrHelper');
const zipHelper = require('./helpers/zipHelper');
const fs = require('fs');
const path = require('path');

// Directory containing the extracted QR code images
const framesDirectory = path.join(__dirname, 'output/extracted_frames');
// Path for the reconstructed ZIP file
const outputZipPath = path.join(__dirname, 'output/reconstructed_zipfile.zip');

async function reconstructZipFromQR() {
    try {
        const decodedDataChunks = [];
        const frameFiles = fs.readdirSync(framesDirectory)
        .filter(file => path.extname(file).toLowerCase() === '.png')
        .map(file => ({ 
            name: file, 
            number: parseInt(file.match(/\d+/)[0], 10) // Extracting number from filename
        }))
        .sort((a, b) => a.number - b.number) // Sorting numerically
        .map(file => file.name);

        for (const file of frameFiles) {
            if (path.extname(file).toLowerCase() === '.png') {
                const filePath = path.join(framesDirectory, file);
                console.log(`Decoding QR code from image: ${filePath}`);
                const decodedData = await qrHelper.decodeQR(filePath);
                decodedDataChunks.push(Buffer.from(decodedData, 'base64'));
            }
        }

        console.log('Reassembling ZIP file...');
        await zipHelper.combineChunks(decodedDataChunks, outputZipPath);
        console.log(`ZIP file reassembled at ${outputZipPath}`);
    } catch (error) {
        console.error('Error in reconstructing ZIP file:', error);
    }
}

reconstructZipFromQR();
