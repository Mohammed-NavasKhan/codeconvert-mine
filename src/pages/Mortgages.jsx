import React,{useState} from "react";
import { ArrowRightIcon, MicrophoneIcon } from "@heroicons/react/16/solid";

const Mortgages = () => {
    const [isListening, setIsListening] = useState(false);
    const [inputText, setInputText] = useState("");

    const handleVoice = () => {
        if (!("webkitSpeechRecognition" in window)) {
          alert("Speech Recognition is not supported in this browser.");
          return;
        }
    
        const recognition = new window.webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-US";
    
        recognition.onstart = () => {
          setIsListening(true);
        };
    
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setInputText(transcript);
        };
    
        recognition.onerror = (event) => {
          console.error("Speech recognition error", event);
        };
    
        recognition.onend = () => {
          setIsListening(false);
        };
    
        recognition.start();
      };

  const handlePrompt = () => {
    console.log("Adding Prompt...");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        {/* Header */}
        <div className="flex items-center justify-between  pb-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Hello, I am Ana, How I can assist you?
          </h1>
        </div>

        {/* Voice Input */}
        <div className="relative flex items-center gap-2 mt-4 pb-4 mb-6">
          <input
            type="text"
            placeholder="Ask a question..."
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            className={`p-2 rounded-full  ${ isListening ? "bg-red-500" : "bg-gray-100 hover:bg-gray-200"}`}
            onClick={handleVoice}
          >
            <MicrophoneIcon className={`h-5 w-5  ${isListening ? "text-white" : "text-gray-600"}`} />
          </button>
          <button
            className="p-2 rounded-full bg-primary hover:bg-primary/90"
            onClick={handlePrompt}
          >
            <ArrowRightIcon className="h-5 w-5 text-white" />
          </button>
        </div>

        {/* Recommendations */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Recommendations
          </h2>
          <div className="flex flex-wrap gap-3">
            <button className="p-2 border border-primary rounded-lg hover:bg-gray-300 transition whitespace-nowrap">
              You could borrow up to £475,000 over a term of 25 years.
            </button>
            <button className="p-2 border border-primary rounded-lg hover:bg-gray-300 transition whitespace-nowrap">
              You are eligible for Club Lloyds
            </button>
            <button className="p-2 border border-primary rounded-lg hover:bg-gray-300 transition whitespace-nowrap">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </button>
            <button className="p-2 border border-primary rounded-lg hover:bg-gray-300 transition whitespace-nowrap">
              Lorem ipsum dolor sit amet.
            </button>
          </div>
        </div>

        {/* You might also be interested in */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            You might also be interested in
          </h2>
          <div className="flex gap-3 mb-3">
            <button className="p-2 border border-primary rounded-lg hover:bg-gray-300 transition whitespace-nowrap">
              Home Insurance
            </button>
            <button className="p-2 border border-primary rounded-lg hover:bg-gray-300 transition whitespace-nowrap">
              Moving Home
            </button>
            <button className="p-2 border border-primary rounded-lg hover:bg-gray-300 transition whitespace-nowrap">
              Home Mover Mortgages
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mortgages;
