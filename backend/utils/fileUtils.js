const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const saveProfilePicture = async (file) => {
  const filename = `${uuidv4()}-${file.originalname}`;
  const filepath = path.join(__dirname, '../public/assets', filename);

  await fs.promises.writeFile(filepath, file.buffer);

  return `http://localhost:${process.env.PORT}/assets/${filename}`;
};

module.exports = { saveProfilePicture };
