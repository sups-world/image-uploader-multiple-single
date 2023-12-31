import multer from "multer";
import path from "path";

const maxSize = 5 * 1000 * 1000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images/uploads");
  },
  filename: (req, file, cb) => {
    const date = Date.now();
    const uniqueSuffix = date + "-" + Math.round(Math.random() * 1e9);
    const extensionName = path.extname(file.originalname);

    cb(null, file.fieldname + "-" + uniqueSuffix + extensionName);
  },
});

export const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const mime = file.mimetype;

    if (
      mime !== "image" &&
      ext !== ".png" &&
      ext !== ".jpg" &&
      ext !== ".gif" &&
      ext !== ".jpeg"
    ) {
      return cb(new Error("Only images allowed"));
    }
    cb(null, true);
  },
  limits: { fileSize: maxSize },
});

//for multiple image uploading

const storageMultiple = multer.diskStorage({
  destination: (req, file, cb) => {
    // TODO::: if(!req.file){throw error} or cb(Error('No file selected"))
    //to check if file exists in req
    cb(null, "./images/multiple");
  },
  filename: (req, file, cb) => {
    const date = Date.now();
    const uniqueSuffix = date + "-" + Math.round(Math.random() * 1e9);
    const extensionName = path.extname(file.originalname);

    cb(null, file.fieldname + "-" + uniqueSuffix + extensionName);
  },
});

export const uploadMultiple = multer({
  storage: storageMultiple,
  fileFilter: (req, file, cb) => {
    // if (!req.file) {
    //   return cb(new Error("No images selected"));
    // }
    const ext = path.extname(file.originalname);
    const mime = file.mimetype;

    if (
      mime !== "image" &&
      ext !== ".png" &&
      ext !== ".jpg" &&
      ext !== ".gif" &&
      ext !== ".jpeg"
    ) {
      return cb(new Error("Only images allowed"));
    }
    cb(null, true);
  },
  limits: { fileSize: maxSize },
});
