# DocNotes – Audio Transcription App

## Description
DocNotes is a simple web service for transcribing audio files (MP3/WAV) using OpenAI Whisper.
Users can upload an audio file, the server processes it through the OpenAI API, and returns the text transcription.

---

## Quick Start

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/docnotes.git
cd docnotes

2. **Install dependencies:**
```bash
npm install

3. **Create a .env file in the root directory:**
```bash
OPENAI_API_KEY=your_openai_api_key


4. **Run  locally:**
```bash
npm run dev
node api/transcribe.js