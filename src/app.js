import express from "express";
import cors from "cors";
import { PORT } from "./config.js";
import appRoute from "./routes.js";

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors())

app.get("/", (req, res) => {
  res.json({ message: "API NODE JS" });
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

app.use("/", appRoute);
