const fs = require('fs');
const path = require('path');

const CHUNK_SIZE = 1000;

// Function to split ZIP file into chunks
const splitZipFile = (filePath) => {
    return new Promise((resolve, reject) => {
        try {
            const fileBuffer = fs.readFileSync(filePath);
            const chunks = [];
            for (let i = 0; i < fileBuffer.length; i += CHUNK_SIZE) {
                chunks.push(fileBuffer.slice(i, i + CHUNK_SIZE));
            }
            resolve(chunks);
        } catch (error) {
            reject(error);
        }
    });
};

// Function to combine chunks into a ZIP file
const combineChunks = (chunks, outputFilePath) => {
    return new Promise((resolve, reject) => {
        try {
            const totalBuffer = Buffer.concat(chunks);
            fs.writeFileSync(outputFilePath, totalBuffer);
            resolve(outputFilePath);
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    splitZipFile,
    combineChunks
};
