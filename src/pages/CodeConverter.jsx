import { useRef } from "react";
import {
  ArrowDownRightIcon,
  ArrowDownTrayIcon,
  ArrowPathIcon,
  ArrowPathRoundedSquareIcon,
  ArrowRightIcon,
  BeakerIcon,
  BookmarkIcon,
  CodeBracketSquareIcon,
  MicrophoneIcon,
  TvIcon,
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/react/16/solid";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import TextareaAutosize from "react-textarea-autosize";
import { useReactToPrint } from "react-to-print";

function CodeConverter() {
  const contentRef = useRef();
  const [inputCode, setInputCode] = useState("");
  const [outputCode, setOutputCode] = useState(
    "Converted code will appear here..."
  );
  const [isPreview, setIsPreview] = useState(true);
  const [messages, setMessages] = useState([
    { role: "system", content: "You are a helpful assistant." },
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    if (!currentMessage.trim()) return;
    const newMessages = [
      ...messages,
      { role: "user", content: currentMessage },
    ];
    setMessages(newMessages);
    setCurrentMessage("");
    setIsThinking(true);
    try {
      const url = "https://api.mistral.ai/v1/chat/completions";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer zly02m3bfr2xKZPuuKdxhHVs4GnBludx`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistral-small-latest",
          temperature: 1.5,
          top_p: 1,
          messages: newMessages,
        }),
      });
      const data = await response.json();
      console.log("Response:", data);
      const responseMessage = data.choices[0]?.message.content || "";
      setMessages([
        ...newMessages,
        { role: "assistant", content: responseMessage },
      ]);
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages([
        ...newMessages, // Use newMessages to maintain conversation history
        { role: "assistant", content: "I am sorry, I cannot help you now." },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleReset = () => {
    console.log("Resetting data...");
    setInputCode("");
    setOutputCode("Converted code will appear here...");
    const fileInput = document.getElementById("fileInput");
    if (fileInput) fileInput.value = "";
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setInputCode(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: "converted_code",
    pageStyle: `
      @media print {
        body {
          padding: 20px;
          font-family: monospace;
          font-size: 16px;
        }        
      }
    `,
  });

  const handleSave = () => {
    console.log("saving pdf");
    setIsPreview(true);
    setTimeout(() => {
      handlePrint();
    }, 100);
  };

  const handleConvert = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL_TECH_SPEC, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {},
        }),
      });
      const data = await response.json();
      setOutputCode(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Error converting code:", error);
      setOutputCode("Error occurred while converting code.");
    }
  };

  const handleGenerate = async () => {
    console.log("Generate Code...", outputCode);
    try {
      const response = await fetch(import.meta.env.VITE_API_URL, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setOutputCode(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Error converting code:", error);
      setOutputCode("Error occurred while converting code.");
    }
  };

  const handleDownload = () => {
    console.log("Downloading code...", isPreview);
  };

  const handleVoice = () => {
    console.log("Voice to text...");
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
      console.log("Transcript:", transcript);
      setCurrentMessage(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  // console.log("Environment: ", import.meta.env.VITE_APP_TITLE);
  console.log("Current Message: ", currentMessage);
  console.log("Messages: ", messages);
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-medium mb-4">Productivity Enhancers</h2>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg transition-colors duration-300 hover:bg-primary hover:border-primary group cursor-pointer">
                <h3 className="font-medium group-hover:text-white">
                  Code Converter
                </h3>
                <p className="text-sm text-gray-600 group-hover:text-white">
                  Lorem ipsum dolor sit amet
                </p>
              </div>
              <div className="p-4 border rounded-lg transition-colors duration-300 hover:bg-primary hover:border-primary group cursor-pointer">
                <h3 className="font-medium group-hover:text-white">
                  Help & Security
                </h3>
                <p className="text-sm text-gray-600 group-hover:text-white">
                  Lorem ipsum dolor sit amet
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-9">
          <div className="bg-white rounded-lg shadow p-4 lg:p-6">
            <h1 className="text-xl lg:text-2xl font-medium mb-4 lg:mb-6 flex items-center gap-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Code Converter
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              <div>
                <h2 className="text-sm font-medium mb-2">
                  Input your legacy code (C/C++/Java/COBOL)
                </h2>
                <textarea
                  className="w-full h-48 lg:h-64 p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary overflow-y-auto"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  placeholder="Type or paste your code here..."
                />
                <div className="relative flex items-center gap-2 mt-3 lg:mt-4">
                  <input
                    type="text"
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    placeholder="Ask a question..."
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleMessageSubmit(e);
                      }
                    }}
                  />
                  <button
                    className={`p-2 rounded-full ${
                      isListening
                        ? "bg-red-500"
                        : "bg-gray-100 hover:bg-gray-200"
                    } group`}
                    onClick={handleVoice}
                  >
                    <MicrophoneIcon
                      className={`${
                        isListening ? "text-white" : "text-gray-600"
                      } h-5 w-5 transition-transform duration-300 group-hover:translate-y-0.5`}
                    />
                  </button>
                  <button
                    className="p-2 rounded-full bg-primary hover:bg-primary/90 group"
                    onClick={handleMessageSubmit}
                  >
                    <ArrowRightIcon className="h-5 w-5 text-white transition-transform duration-300 group-hover:translate-x-0.5" />
                  </button>
                </div>
                <div className="mt-4 lg:mt-6 grid grid-cols-2 md:grid-cols-4 gap-2 lg:gap-4 w-full">
                  <button
                    className="w-full min-h-[40px] px-3 py-2 bg-gray-200 rounded-lg flex items-center justify-center gap-1.5 hover:bg-gray-300 text-sm focus:outline-none group"
                    onClick={handleReset}
                  >
                    <ArrowPathIcon className="h-4 w-4 text-black flex-shrink-0 transition-transform duration-300 group-hover:rotate-180" />
                    Reset
                  </button>
                  <button
                    className="w-full min-h-[40px] px-3 py-2 bg-gray-200 rounded-lg flex items-center justify-center gap-1.5 hover:bg-gray-300 text-sm group relative"
                    onClick={() => document.getElementById("fileInput").click()}
                  >
                    <input
                      type="file"
                      id="fileInput"
                      accept=".js,.jsx,.ts,.tsx,.py,.java,.cpp,.c,.cs,.rb,.php,.go,.rs,.swift,.kt,.pl,.r,.m,.h,.scala,.sql,.cobol"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                    <ArrowDownRightIcon className="h-4 w-4 text-black flex-shrink-0 transition-transform duration-300 group-hover:translate-y-0.5 group-hover:translate-x-0.5" />
                    Import
                  </button>
                  <button
                    className="w-full min-h-[40px] px-3 py-2 bg-gray-200 rounded-lg flex items-center justify-center gap-1.5 hover:bg-gray-300 text-sm group"
                    onClick={handleSave}
                  >
                    <BookmarkIcon className="h-4 w-4 text-black flex-shrink-0 transition-transform duration-300 group-hover:translate-y-0.5" />
                    Save
                  </button>
                  <button
                    className="w-full min-h-[40px] px-3 py-2 bg-primary text-white rounded-lg flex items-center justify-center gap-1.5 hover:bg-primary/90 text-sm focus:outline-none group"
                    onClick={handleConvert}
                  >
                    <ArrowPathRoundedSquareIcon className="h-4 w-4 text-white flex-shrink-0 transition-transform duration-300 group-hover:rotate-180" />
                    Convert
                  </button>
                </div>
              </div>
              <div
                className={`${
                  isFullscreen ? "fixed inset-0 z-50 bg-white p-4" : ""
                }`}
              >
                <div className="flex justify-between mb-2 items-center text-sm font-medium">
                  <h2>Microservices (SpringBoot/Python/Javascript)</h2>

                  <div className="flex items-center gap-1">
                    <button onClick={() => setIsFullscreen(!isFullscreen)}>
                      {isFullscreen ? (
                        <ArrowsPointingInIcon
                          className="h-4 w-4 text-primary hover:text-gray-700"
                          title="Small screen"
                        />
                      ) : (
                        <ArrowsPointingOutIcon
                          className="h-4 w-4 text-primary hover:text-gray-700"
                          title="Fullscreen"
                        />
                      )}
                    </button>
                    {/* <button onClick={() => setIsPreview(!isPreview)}>
                      {isPreview ? (
                        <CodeBracketSquareIcon
                          className={`h-5 w-5 text-primary hover:text-gray-700`}
                          title="Edit"
                        />
                      ) : (
                        <TvIcon
                          className={`h-5 w-5 text-primary hover:text-gray-700`}
                          title="Preview"
                        />
                      )}
                    </button> */}
                  </div>
                </div>
                {/* {isPreview ? (
                  <div
                    className={`w-full ${
                      isFullscreen ? "h-[calc(100vh-120px)]" : "h-48 lg:h-80"
                    } bg-gray-50 border rounded-lg overflow-y-scroll p-3`}
                  >
                    <div ref={contentRef} className="print-content">
                      <div>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {outputCode}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                ) : ( */}
                <div
                  className={`w-full ${
                    isFullscreen ? "h-[calc(100vh-120px)]" : "h-48 lg:h-80"
                  } bg-gray-50 border rounded-lg overflow-y-scroll p-3`}
                >
                  <div className="space-y-4">
                    {messages
                      .filter((message) => message.role !== "system")
                      .map((message, index) => (
                        <div
                          key={index}
                          className={`flex ${
                            message.role === "assistant"
                              ? "justify-start"
                              : "justify-end"
                          }`}
                        >
                          <div
                            className={`max-w-[80%] p-3 rounded-lg ${
                              message.role === "assistant"
                                ? "bg-gray-200 text-gray-800"
                                : "bg-primary text-white"
                            }`}
                          >
                            <ReactMarkdown
                              // className="text-sm whitespace-pre-wrap"
                              remarkPlugins={[remarkGfm]}
                            >
                              {message.content}
                            </ReactMarkdown>
                          </div>
                        </div>
                      ))}
                    {isThinking && (
                      <div className="flex justify-start">
                        <div className="max-w-[80%] p-3 rounded-lg bg-gray-200">
                          <div className="flex items-center gap-2">
                            Thinking...
                          </div>
                        </div>
                      </div>
                    )}
                    {/* <TextareaAutosize
                      className="w-full h-full resize-none outline-none bg-transparent overflow-hidden"
                      value={outputCode}
                      onChange={(e) => setOutputCode(e.target.value)}
                    /> */}
                  </div>
                </div>
                {/* )} */}
                {isFullscreen && (
                  <div className="relative flex items-center gap-2 mt-3 lg:mt-4">
                    <input
                      type="text"
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      placeholder="Ask a question..."
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleMessageSubmit(e);
                        }
                      }}
                    />
                    <button
                      className={`p-2 rounded-full ${
                        isListening
                          ? "bg-red-500"
                          : "bg-gray-100 hover:bg-gray-200"
                      } group`}
                      onClick={handleVoice}
                    >
                      <MicrophoneIcon
                        className={`${
                          isListening ? "text-white" : "text-gray-600"
                        } h-5 w-5 transition-transform duration-300 group-hover:translate-y-0.5`}
                      />
                    </button>
                    <button
                      className="p-2 rounded-full bg-primary hover:bg-primary/90 group"
                      onClick={handleMessageSubmit}
                    >
                      <ArrowRightIcon className="h-5 w-5 text-white transition-transform duration-300 group-hover:translate-x-0.5" />
                    </button>
                  </div>
                )}
                <div
                  className={`flex flex-col sm:flex-row justify-between gap-2 sm:gap-0 mt-3 lg:mt-5 ${
                    isFullscreen
                      ? "w-2/5 fixed left-1/2 transform -translate-x-1/2"
                      : "w-full"
                  }`}
                >
                  <button
                    className="w-full sm:w-[49%] px-4 py-2 flex items-center justify-center gap-2 bg-white rounded-lg hover:bg-gray-300 border-2 border-secondary group"
                    onClick={handleGenerate}
                  >
                    <BeakerIcon
                      className={`h-4 w-4 text-secondary group-hover:animate-[wiggle_0.5s_ease-in-out]`}
                    />
                    Generate
                  </button>
                  <button
                    className="w-full sm:w-[49%] px-4 py-2 flex items-center justify-center bg-secondary gap-2 text-white rounded-lg hover:bg-black/90 group"
                    onClick={handleDownload}
                  >
                    <ArrowDownTrayIcon className="h-4 w-4 text-white flex-shrink-0 transition-transform duration-300 group-hover:translate-y-0.5" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodeConverter;
