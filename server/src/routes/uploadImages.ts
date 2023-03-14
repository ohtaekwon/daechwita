import * as express from "express";
import { storageService } from "../firebase";

import { ref, uploadString } from "firebase/storage";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, "uploads/");
  },
  filename: function (request, file, callback) {
    callback(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

const uploadImagesRoute = [
  // CREATE File
  {
    method: "post",
    route: "/files",
    upload: upload.single("image"),
    handler: (req: express.Request, res: express.Response) => {
      const { body, file } = req;

      try {
        storageService;
        const resumesImageRef = ref(storageService, "resume-images/");
        const message = "upload가 되었습니다.";

        uploadString(resumesImageRef, message).then((snapshot) => {
          console.log("Uploaded a raw string!");
        });

        const obj = JSON.parse(JSON.stringify(body));
        console.log(file);
        console.log("body", obj);
        //   let result = {
        //     originalName : file.originalname,
        //     size : file.size,
        // }

        // res.json(result);

        res.send(file);
      } catch (error) {
        res.send(500).send({ error: error });
      }
    },
  },
];
export default uploadImagesRoute;
