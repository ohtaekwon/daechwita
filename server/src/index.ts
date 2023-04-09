import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";
import "dotenv/config";

import verifyTokenAuthMiddleware from "./middleware/verifyTokenAuthMiddleware";

import authMiddleware from "./middleware/authMiddleware";

import totalCharts from "./routes/totalChart";
import usersCharts from "./routes/usersChart";
import authRoute from "./routes/auth";
import schedulesRoute from "./routes/schedules";
import resumesRoute from "./routes/resumes";
import searchRoute from "./routes/search";
// import charts from "./routes/charts";

/**
 * 서버 구동
 */
export const app = express();
const PORT = process.env.PORT || 8000;
app.use(
  express.json({
    limit: "50mb",
  })
); // application/json 파싱을 위해서
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: false,
  })
);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(compression());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = [
  ...authRoute,
  ...totalCharts,
  ...usersCharts,
  ...resumesRoute,
  ...schedulesRoute,
  ...searchRoute,
];

const passMiddleWare = totalCharts.map(({ method, route, handler }) => route);

routes.forEach(({ method, route, handler }) => {
  const newRoute = passMiddleWare.includes(route);
  if (newRoute) {
    app[method as Method](route, handler);
  } else {
    // 로그인 했을 떄, 토큰을 확인하는 미들웨어 설정
    app[method as Method](route, authMiddleware, handler);
  }
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
