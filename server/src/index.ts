import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import documentsRoute from "./routes/documents";
import usersRoute from "./routes/users";
import schedulesRoute from "./routes/schedules";
import applicationsRoute from "./routes/applications";

export const app = express();

const multipart = require("connect-multiparty");

app.use(express.json()); // application/json 파싱을 위해서
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser(process.env.COOKIE_SECRET)); // get요청이 오면 uri변수들이 파싱되어 req.cookies객체에 저장된다.
app.use(express.urlencoded({ extended: true }));
app.use(multipart()); //formdata를 파싱해줌
app.use(bodyParser.json());

const routes = [
  ...usersRoute,
  ...applicationsRoute,
  ...documentsRoute,
  ...schedulesRoute,
];

routes.forEach(({ method, route, handler }) => {
  app[method as Method](route, handler);
});

app.listen({ port: 8000 });
console.log("server is listening on port 8000...");

type Method =
  | "get"
  | "post"
  | "put"
  | "delete"
  | "head"
  | "options"
  | "patch"
  | "connect";

// app.get('/', (res:any,req)=>{
//   res.send('ok')
// })
// app.post('/documents', (req,res)=>{
//   ....
// })
