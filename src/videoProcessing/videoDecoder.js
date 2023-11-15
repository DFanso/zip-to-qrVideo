const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const Jimp = require('jimp');
const jsQR = require('jsqr');

// Function to extract frames from a video file
const extractFramesFromVideo = (videoPath, outputDirectory, frameRate = 1) => {
    // Ensure output directory exists
    if (!fs.existsSync(outputDirectory)){
        fs.mkdirSync(outputDirectory);
    }

    // Construct the ffmpeg command for extracting frames
    const ffmpegCommand = `ffmpeg -i ${videoPath} -vf fps=${frameRate} ${outputDirectory}/%d.png`;

    return new Promise((resolve, reject) => {
        exec(ffmpegCommand, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                reject(error);
                return;
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return;
            }
            resolve(outputDirectory);
        });
    });
};

// Function to decode a QR code from an image file
const decodeQRFromImage = async (imagePath) => {
    try {
        const image = await Jimp.read(imagePath);
        const qrCode = jsQR(image.bitmap.data, image.bitmap.width, image.bitmap.height);

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
    extractFramesFromVideo,
    decodeQRFromImage
};
