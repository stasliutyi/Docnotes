import { useState, useRef } from "react";

export const useAudioRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const start = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (e) => {
      audioChunksRef.current.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      setAudioBlob(blob);
      audioChunksRef.current = [];
    };

    mediaRecorder.start();
    mediaRecorderRef.current = mediaRecorder;
    setRecording(true);
  };

  const stop = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  const reset = () => setAudioBlob(null);

  return { recording, audioBlob, start, stop, reset };
};

export const transcribeAudio = async (audioBlob: Blob) => {
  const formData = new FormData();

  const safeBlob = new Blob([audioBlob], { type: "application/octet-stream" });

  formData.append("file", safeBlob, "audio.webm");

  const response = await fetch("https://docnotes-1.onrender.com/transcribe", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error("Transcription failed: " + err);
  }

  const data = await response.json();
  return data.text;
};
