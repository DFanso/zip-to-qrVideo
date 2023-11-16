---

# Zip-to-QR Video Converter

## Overview
This project provides a unique solution for encoding ZIP files into a series of QR codes, which are then compiled into a video. It also allows for decoding, where the process is reversed - the video is broken down into QR codes, which are then reassembled into the original ZIP file.

## Features
- **Encode ZIP to Video**: Splits a ZIP file into chunks, converts these chunks into QR codes, and assembles these QR codes into a video file.
- **Decode Video to ZIP**: Extracts QR codes from a video file, decodes them, and reassembles them into the original ZIP file.

## Requirements
- Node.js
- ffmpeg (for video processing)

## Installation
Clone the repository and install dependencies:
```bash
git clone [your-repo-link](https://github.com/DFanso/zip-to-qrVideo)
cd zip-to-qrVideo
npm install
```

## Usage
Navigate to the project directory and run the following commands as needed:

### Encoding a ZIP File
To encode a ZIP file into a video:
change the zip file path and
```bash
node src/index.js encode
```
This will create a video file from the ZIP file at the specified path.

### Decoding a Video File
To decode a video back into a ZIP file:
change the video file path and
```bash
node src/index.js decode
```
This will extract the QR codes from the video and reconstruct the ZIP file.

## Structure
- `src/helpers`: Contains utility functions for ZIP and QR code processing.
- `src/videoProcessing`: Scripts for video encoding and decoding.
- `src/index.js`: The main script to run the encode/decode process.
- `src/reconstructZip.js`: A separate script for reconstructing the ZIP file.

## Contributions
Contributions are welcome. Please open an issue to discuss your idea or submit a Pull Request.

## License
[MIT]

---
