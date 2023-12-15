import express from "express";
import { upload } from "./middleware/uploader.js";

const app = express();

const logoUpload = upload.single("image");
app.post("/test/upload-logo", (req, res) => {
  logoUpload(req, res, (err) => {
    if (err) {
      console.log(`I am here:::`, err);
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).send("file size exceeds maximum limit");
      }
      console.log(err.message);
      return res.status(400).send({ error: err.message });
    }
    console.log("path to the file::", req.file.path);
    return res.status(200).send("file uploaded successfully");
  });
});

app.listen(5000, () => {
  console.log("listening successfully on port 3000");
});

//to check if there if file or not is also required so below code shows that
// export const logoUploadController = async (req, res) => {
//   const uniLogoUpload = uploadSingleLogoMiddleware.single("logo");
//   let pathToUploadedFile;

//   uniLogoUpload(req, res, (err) => {
//     if (err) {
//       if (err.code === "ERR_HTTP_HEADERS_SENT") {
//         return res.status(400).send("Please select a file to upload");
//       }
//       if (err.code === "LIMIT_FILE_SIZE") {
//         return res.status(400).send("file size is greater than 5MB");
//       }
//       if (err.code === "LIMIT_UNEXPECTED_FILE") {
//         return res
//           .status(400)
//           .send("field name not matching the one in middleware");
//       }
//       return res.status(400).send({ error: err.message });
//     }

//     if (!req.file) {
//       return res.status(400).send("no files selected for upload");
//     }
//     pathToUploadedFile = req.file.path;
//     console.log(`here's path to uploaded file`, pathToUploadedFile);

//     //when no error then ::>
//     if (!req.file) {
//       return res.status(400).send("nothing has been uploaded");
//     }

//     //Service here to add to logo_table

//     const { uni_id } = req.body;
//     const result = addLogoUrlService(pathToUploadedFile, parseInt(uni_id));

//     result
//       .then((val) => {
//         return res.status(200).json({
//           message: "file uploaded successfully and url written to table",
//           path: pathToUploadedFile,
//         });
//       })
//       .catch((e) => {
//         if (e.code == "P2002") {
//           return res
//             .status(400)
//             .send("One university cannot have multiple logos");
//         }
//         console.log(e);
//         return res
//           .status(400)
//           .send("some error occured while updating database");
//       });
//   });
// };
