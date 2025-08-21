import "dotenv/config";
import express from "express";
import multer from "multer";
import cors from "cors";
import OpenAI from "openai";

const app = express();

// CORS для локалу та фронтенду
app.use(cors({
  origin: ["https://docnotes-1.onrender.com", "http://localhost:5173"]
}));

// Перевірка ключа
if (!process.env.OPENAI_API_KEY) {
  console.error("OPENAI_API_KEY не знайдено! Додай його в Environment на Render.");
  process.exit(1);
}

// Створюємо екземпляр OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Multer
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 },
});

// Роут для транскрипції
app.post("/transcribe", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const resp = await openai.audio.transcriptions.create({
      model: "whisper-1",
      file: req.file.buffer,
      filename: req.file.originalname,
    });

    res.json({ text: resp.text ?? "" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err?.message || "Transcription failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
