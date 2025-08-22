import "dotenv/config";
import express from "express";
import multer from "multer";
import cors from "cors";
import OpenAI from "openai";

const app = express();

// CORS для локалу та фронтенду
app.use(cors({
  origin: "*"
}));

// Перевірка ключа
if (!process.env.OPENAI_API_KEY) {
  console.error("OPENAI_API_KEY не знайдено! Додай його в Environment на Render.");
  process.exit(1);
}

console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY ? "OK" : "MISSING");


// Створюємо екземпляр OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Multer
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 },
});

app.post("/transcribe", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    // Перетворюємо Buffer у Blob
    const blob = new Blob([req.file.buffer], { type: req.file.mimetype });

    const resp = await openai.audio.transcriptions.create({
      model: "whisper-1",
      file: blob,
      filename: req.file.originalname,
    });

    res.json({ text: resp.text ?? "" });
  } catch (err) {
    console.error("Transcription error:", err);
    res.status(500).json({ error: err?.message || "Transcription failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
