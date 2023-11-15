const zipHelper = require('./helpers/zipHelper');
const qrHelper = require('./helpers/qrHelper');
const videoEncoder = require('./videoProcessing/videoEncoder');
const videoDecoder = require('./videoProcessing/videoDecoder');
const path = require('path');
const fs = require('fs');

const [operation, filePath] = process.argv.slice(2);

// Directory where QR code images will be saved
const qrImagesDir = path.join(__dirname, 'output/qr_images');
if (!fs.existsSync(qrImagesDir)){
    fs.mkdirSync(qrImagesDir);
}

// Main function to process the ZIP file
async function processZipFile(zipFilePath) {
    try {
        // 1. Split ZIP File into Chunks
        console.log('Splitting ZIP file into chunks...');
        const chunks = await zipHelper.splitZipFile(zipFilePath);

        // 2. Generate QR Codes from Chunks
        console.log('Generating QR codes from chunks...');
        let count = 0;
        for (const chunk of chunks) {
            const qrImagePath = path.join(qrImagesDir, `${++count}.png`);
            await qrHelper.generateQRFromChunk(chunk, qrImagePath);
        }

        // 3. Create Video from QR Code Images
        console.log('Creating video from QR code images...');
        const videoPath = path.join(__dirname, 'output/output_video.mp4');
        await videoEncoder.createVideoFromImages(qrImagesDir, videoPath);

        console.log(`Video created at ${videoPath}`);
    } catch (error) {
        console.error('Error processing ZIP file:', error);
    }
}
// Function to decode Video to ZIP
async function decodeVideoToZip(videoFilePath) {
    try {
        const framesDirectory = '/Users/dfanso/Programming/GitHub/zip-to-qrVideo/src/output/extracted_frames'; // Ensure this directory exists
        const outputZipPath = '/Users/dfanso/Programming/GitHub/zip-to-qrVideo/src/output/'; // Set the desired output path

        console.log('Extracting frames from video...');
        await videoDecoder.extractFramesFromVideo(videoFilePath, framesDirectory);
        console.log('Frames extracted successfully.');

        console.log('Decoding QR codes from frames...');
        const decodedDataChunks = [];
        const frameFiles = fs.readdirSync(framesDirectory);
        for (const file of frameFiles) {
            if (path.extname(file).toLowerCase() === '.png') {
                const filePath = path.join(framesDirectory, file);
                console.log(`Processing file: ${filePath}`); // Log each file being processed
                try {
                    const decodedData = await qrHelper.decodeQRFromImage(filePath);
                    decodedDataChunks.push(Buffer.from(decodedData, 'base64'));
                    console.log(`Decoded data from ${file}`);
                } catch (error) {
                    console.error(`Error decoding QR code from ${file}:`, error);
                }
            }
        }

        console.log('Reassembling ZIP file...');
        await zipHelper.combineChunks(decodedDataChunks, outputZipPath);
        console.log(`ZIP file reassembled at ${outputZipPath}`);
    } catch (error) {
        console.error('Error in decoding process:', error);
    }
}

// Example Usage
const zipFilePath = '/Users/dfanso/Programming/GitHub/zip-to-qrVideo/Arsene_Lupin-Maurice_Leblanc.pdf.zip'; // Replace with your ZIP file path
const videoFilePath ='/Users/dfanso/Programming/GitHub/zip-to-qrVideo/src/output/output_video.mp4' 


switch (operation) {
    case 'encode':
        processZipFile(zipFilePath).catch(console.error);
        break;
    case 'decode':
        decodeVideoToZip(videoFilePath).catch(console.error);
        break;
    default:
        console.log('Please specify the operation (encode or decode) and the file path.');
        break;
}