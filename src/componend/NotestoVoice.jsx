import { useState } from "react";
import { Button, Card, CardContent, TextField } from "@mui/material";

export default function NotesToVoice() {
  const [note, setNote] = useState("");
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleGenerateVoice = async () => {
    if (!note.trim()) return alert("Please enter a note first!");

    setLoading(true);
    setAudioUrl(null);

    try {
      const res = await fetch("https://word-drop-waves.vercel.app/api/notes-to-voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: note }),
      });

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (err) {
      console.error(err);
      alert("Error generating voice");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 space-y-12">
      {/* Notes to Voice Section */}
      <Card className="w-full max-w-2xl rounded-2xl" style={{ boxShadow: "0 4px 12px rgb(0 0 0 / 66%)" }}>
        <CardContent className="flex flex-col items-center p-6 space-y-6" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <h1 style={{ width: "500px" }} className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center gap-2">
            {/* <FileText className="!w-8 !h-8 text-gray-700" />  */}
            Word To Waves
            {/* <Mic className="!w-8 !h-8 text-gray-700" /> */}
            
          </h1>
          <TextField
            multiline
            fullWidth
            minRows={4}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Type or edit your notes here..."
            className="w-full bg-white"
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleGenerateVoice}
            disabled={loading}
            className="px-6 py-3 text-lg rounded-xl"
            style={{ display: "flex", justifyContent: "center" }}
          >
            Convert to Voice
          </Button>
          {audioUrl && (
            <div className="flex flex-col items-center space-y-2 w-full" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <audio controls className="w-full">
                <source src={audioUrl} type="audio/mpeg" />
              </audio>
              <a href={audioUrl} download className="text-blue-600 hover:underline">
                Download Audio
              </a>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
