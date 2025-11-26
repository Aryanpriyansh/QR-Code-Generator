import express from "express";
import qr from "qr-image";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/generate", (req, res) => {
  const url = req.body.url;
  if (!url) {
    return res.send("Please enter a valid URL");
  }

  const qr_svg = qr.image(url, { type: "png" });
  res.type("png");
  qr_svg.pipe(res);
});

app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
