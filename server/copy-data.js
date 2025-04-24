const fs = require('fs');
const path = require('path');

// Create the dist/data directory if it doesn't exist
const distDataDir = path.join(__dirname, 'dist', 'data');
if (!fs.existsSync(distDataDir)) {
  fs.mkdirSync(distDataDir, { recursive: true });
}

// Copy the users.yaml file
const srcFile = path.join(__dirname, 'src', 'data', 'users.yaml');
const destFile = path.join(distDataDir, 'users.yaml');

fs.copyFile(srcFile, destFile, (err) => {
  if (err) {
    console.error('Error copying data file:', err);
    process.exit(1);
  }
  console.log('Successfully copied users.yaml to dist/data');
}); 