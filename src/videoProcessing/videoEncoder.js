const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Function to create a video from a directory of QR code images
const createVideoFromImages = (imagesDirectory, outputVideoPath, frameRate = 1) => {
  return new Promise((resolve, reject) => {
    // Construct the ffmpeg command
    const ffmpegCommand = `ffmpeg -framerate ${frameRate} -i ${imagesDirectory}/%d.png -c:v libx264 -r 30 -pix_fmt yuv420p ${outputVideoPath}`;

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
      console.log(`stdout: ${stdout}`);
      resolve(outputVideoPath);
    });
  });
};

module.exports = {
  createVideoFromImages
};
