import express from "express";
import cors from "cors";
import documentsRoute from "./routes/documents";

const app: any = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const routes = [...documentsRoute];

routes.forEach(({ method, route, handler }) => {
  app[method](route, handler);
});

app.listen({ port: 8000 });
console.log("server is listening on port 8000...");

// app.get('/', (res:any,req)=>{
//   res.send('ok')
// })
// app.post('/documents', (req,res)=>{
//   ....
// })
