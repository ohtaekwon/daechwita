import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import usersRoute from "./routes/users";
import schedulesRoute from "./routes/schedules";
import resumesRoute from "./routes/resumes";
import charts from "./routes/charts";

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

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = [...charts, ...usersRoute, ...resumesRoute, ...schedulesRoute];

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
