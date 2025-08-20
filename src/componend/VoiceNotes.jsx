import { useState, useRef } from "react";
import { Mic, Description as FileText } from "@mui/icons-material";
import { Button, Card, CardContent, TextField } from "@mui/material";
const VoiceNotes = () => {
    const [listening, setListening] = useState(false);
    const [notes, setNotes] = useState([]);
    const recognitionRef = useRef(null);

    const handleStartRecording = () => {
        const SpeechRecognition =
            (window).SpeechRecognition || (window).webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Speech Recognition not supported in this browser.");
            return;
        }

        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = "en-US";

        recognitionRef.current.onresult = (event) => {
            let transcript = "";
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                transcript += event.results[i][0].transcript;
            }
            setNotes((prev) => [...prev.slice(0, -1), transcript]);
        };

        recognitionRef.current.onstart = () => setListening(true);
        recognitionRef.current.onend = () => setListening(false);

        recognitionRef.current.start();
        setNotes((prev) => [...prev, ""]);
    };

    const handleStopRecording = () => {
        recognitionRef.current?.stop();
        setListening(false);
    };

    return (
        <>
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 space-y-12">
                {/* Voice to Notes Section */}
                <Card className="w-full max-w-2xl rounded-2xl" style={{ boxShadow: "0 4px 12px rgb(0 0 0 / 66%)" }}>
                    <CardContent className="flex flex-col items-center p-6 space-y-6" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <h1 style={{width:"500px"}}className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center gap-1">
                            {/* <Mic className="!w-8 !h-6 text-gray-700" /> Voice to <FileText className="!w-8 !h-8 text-gray-700" /> Notes */}
                            Word Drop
                        </h1>
                        <Button
                            variant="contained"
                            color={listening ? "error" : "primary"}
                            onClick={listening ? handleStopRecording : handleStartRecording}
                            className="px-6 py-3 text-lg rounded-xl"
                        >
                            {listening ? "Stop Recording" : "Start Recording"}
                        </Button>
                        {/* <div className="flex gap-2 text-xl font-semibold text-gray-700" style={{ display: "flex", justifyContent: "center" }}>
                            <FileText className="!w-6 !h-6" /> Notes
                        </div> */}
                        {notes && (
                            <TextField
                                multiline
                                fullWidth
                                minRows={4}
                                placeholder="Recording Notes"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="w-full bg-white"
                            />
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default VoiceNotes;
