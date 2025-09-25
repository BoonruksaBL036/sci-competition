import express from "express";
import activityRouter from "./routers/activity.router.js";
import db from "./models/index.js";
import authRouter from "./routers/auth.router.js";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./models/db.js";

dotenv.config();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV || "development";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync({ force: false }).then(() => {
  console.log("create table user_roles");
});

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173", FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-access-token"],
  })
);

const initDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully");

    if (NODE_ENV === "development") {
      await db.sequelize.sync({ alter: true });
      console.log("database Synced in development mode");
    }
  } catch (error) {
    console.error("Unable to connect to database", error);
  }
};
initDatabase();

app.get("/hello", (req, res) => {
  return res.send("Hello world!");
});

//use authentication router
app.use("/api/v1/activity", activityRouter);
app.use("/api/v1/auth", authRouter);

app.listen(PORT, () => {
  console.log("Listening to http://localhost:" + PORT);
});
