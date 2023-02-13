import * as express from "express";
import { clientId, clientSecret } from "../../clovaConfig";
import { DBField, writeStream } from "../dbController";

const setStream = () => writeStream(DBField.STREAM);

const API_URL = "https://naveropenapi.apigw.ntruss.com/voice/v1/tts";
const ttsARoute = [
  // GET ALL ITEM A
  {
    method: "get",
    route: "/tts",
    handler: (req: express.Request, res: express.Response) => {
      const { body, params } = req;
      const options = {
        url: API_URL,
        form: { speaker: "mijin", speed: "0", text: "좋은 하루 되세요" },
        headers: {
          "X-NCP-APIGW-API-KEY-ID": clientId,
          "X-NCP-APIGW-API-KEY": clientSecret,
        },
      };

      var request = require("request");

      const _req = request
        .post(options)
        .on("response", function (response: any) {
          console.log("상태코드", response.statusCode); // 200
          console.log("헤더", response.headers["content-type"]);
        });
      _req.pipe(res);
      // res.send();
    },
  },
];
export default ttsARoute;
