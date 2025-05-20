import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import sequelize from "./config/database.js";

import notesRoutes from "./routes/notesRoutes.js";
import userRoutes from "./routes/userRoute.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://be-1061342868557.us-central1.run.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/notes", notesRoutes);
app.use(userRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server berjalan di port ${PORT}`);
});

sequelize
  .sync()
  .then(() => {
    console.log("✅ Database & tabel berhasil disinkronisasi");
  })
  .catch((err) => {
    console.error("❌ Gagal sinkronisasi database:", err);
  });
