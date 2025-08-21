import { useState } from "react";
import { useAudioRecorder, transcribeAudio } from "../../hooks/useAudioRecorder";

interface RecorderProps {
  onTranscribed: (text: string) => void;
}

const Recorder: React.FC<RecorderProps> = ({ onTranscribed }) => {
  const { recording, audioBlob, start, stop, reset } = useAudioRecorder();
  const [loading, setLoading] = useState(false);

  const handleTranscribe = async () => {
    if (!audioBlob) return;
    setLoading(true);
    try {
      const text = await transcribeAudio(audioBlob);
      onTranscribed(text);
      reset();
    } catch (err: unknown) {
      console.error(err);
      const message = err instanceof Error ? err.message : "Error Transcription";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-2 flex flex-col gap-2">
      <button
        onClick={recording ? stop : start}
        className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition-colors"
      >
        {recording ? "Stop" : "Start"}
      </button>

      {audioBlob && !loading && (
        <button
          onClick={handleTranscribe}
          className="bg-green-500 text-white rounded px-4 py-2 hover:bg-green-600 transition-colors"
        >
          Transcription
        </button>
      )}

      {loading && <p className="text-gray-700">Transcription...</p>}
    </div>
  );
};

export default Recorder;