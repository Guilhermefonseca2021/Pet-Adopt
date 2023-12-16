import multer from "multer";
import path from "path";
import fs from 'fs';

const imageStorage = multer.diskStorage({
  destination: async function (req, file, cb) {
    let folder = "";
    
    if (req.originalUrl.includes('users')) {
      folder = "users";
    } else if (req.originalUrl.includes('pets')) {
      folder = "pets";
    }
    
    const destinationFolder = path.join(__dirname, `../public/images/${folder}`);

    try {
      await fs.promises.access(destinationFolder, fs.constants.F_OK);
    } catch (error) {
      try {
        await fs.promises.mkdir(destinationFolder, { recursive: true });
      } catch (error) {
        console.error("Error creating destination folder:", error);
      }
    }

    cb(null, destinationFolder);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      return cb(new Error("Por favor, envie apenas png ou jpg!"));
    }
    cb(null, true);
  },
});

export { imageUpload };