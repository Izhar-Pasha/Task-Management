import express from "express";
import cors from "cors";
import { dbconnection } from "./db_connection/connection.js";
import router from "./routes/publicRoutes.js";
import userRouter from "./routes/userRoutes.js";
import projectRoute from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import countRouter from "./routes/countRoute.js";

const app = express();
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://yourfrontenddomain.com",
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use("/", router);
app.use("/user", userRouter);
app.use("/Pro", projectRoute);
app.use("/Tas", taskRoutes);
app.use("/api", countRouter);

dbconnection();

export default app;
