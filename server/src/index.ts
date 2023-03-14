import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import usersRoute from "./routes/users";
import schedulesRoute from "./routes/schedules";
import resumesRoute from "./routes/resumes";
import uploadImagesRoute from "./routes/uploadImages";

export const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json()); // application/json 파싱을 위해서
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser(process.env.COOKIE_SECRET)); // get요청이 오면 uri변수들이 파싱되어 req.cookies객체에 저장된다.
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = [
  ...usersRoute,
  ...resumesRoute,
  ...schedulesRoute,
  ...uploadImagesRoute,
];

routes.forEach(({ method, route, upload, handler }) => {
  app[method as Method](route, upload, handler);
});

app.listen({ port: PORT });
console.log(`server is listening on port ${PORT}...`);

type Method =
  | "get"
  | "post"
  | "put"
  | "delete"
  | "head"
  | "options"
  | "patch"
  | "connect";
