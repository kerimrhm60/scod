import express from "express";
import cors from "cors";
import { setRoutes } from "./routes";
import dotenv from "dotenv"; // dotenv paketini dahil edin

dotenv.config(); // dotenv.config() çağrısını yapın

const port: number = 3000;
const app: express.Application = express();

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || origin.startsWith("http://localhost") || origin.startsWith("http://192.168.1.197")|| origin === "https://baysoftworks.com") {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["POST", "PUT", "GET", "DELETE", "OPTIONS", "HEAD"],
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setRoutes(app);
app.listen(port, () => console.log(`Listening on port ${port}`));

export default app;
