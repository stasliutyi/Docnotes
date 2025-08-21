import "dotenv/config";
import express from "express";
import multer from "multer";
import fs from "fs";
import OpenAI from "openai";
import cors from "cors";

const app = express();
app.use(cors());

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 },
});

app.post("/transcribe", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const buffer = req.file.buffer;
    const resp = await openai.audio.transcriptions.create({
      model: "whisper-1",
      file: buffer,
      filename: req.file.originalname,
    });

    res.json({ text: resp.text ?? "" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err?.message || "Transcription failed" });
  }
});


app.listen(3000, () => console.log("Listening on http://localhost:3000"));
