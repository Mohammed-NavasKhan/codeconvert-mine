import {
  ArrowDownTrayIcon,
  ArrowPathRoundedSquareIcon,
  ArrowRightIcon,
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  BeakerIcon,
  ClipboardIcon,
  HashtagIcon,
  MicrophoneIcon,
  PaperClipIcon,
  PencilIcon,
  SparklesIcon,
  SpeakerWaveIcon,
  TagIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/16/solid";
import html2pdf from "html2pdf.js";
import { marked } from "marked";
import { useState, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";

function Chat() {
  const messageContainerRef = useRef(null);
  const languageOptions = [
    "JavaScript",
    "Python",
    "Java",
    "Rust",
    "PHP",
    "Swift",
  ];
  const [inputCode, setInputCode] = useState("");
  const [messages, setMessages] = useState([
    { role: "system", content: "You are a helpful assistant." },
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingContent, setEditingContent] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      requestAnimationFrame(() => {
        messageContainerRef.current.scrollTop =
          messageContainerRef.current.scrollHeight;
      });
    }
  };

  const handleReset = () => {
    console.log("Resetting data...");
    setInputCode("");
    setMessages([{ role: "system", content: "You are a helpful assistant." }]);
    setCurrentMessage("");
    setSelectedLanguage("");
    setIsLanguageDropdownOpen(false);
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

  const handleMessage = async (e) => {
    e.preventDefault();
    if (!currentMessage.trim()) return;
    const newMessages = [
      ...messages,
      { role: "user", content: currentMessage + "\n\n" + inputCode },
    ];
    setMessages(newMessages);
    setCurrentMessage("");
    setIsThinking(true);
    scrollToBottom();
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
      scrollToBottom();
    }
  };

  const handleConvert = async () => {
    const newMessages = [
      ...messages,
      {
        role: "user",
        content:
          "Convert below code into Technical Specification Document.\n\n" +
          inputCode,
      },
    ];
    setMessages(newMessages);
    setCurrentMessage("");
    setIsThinking(true);
    scrollToBottom();
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
      scrollToBottom();
    }
  };

  const handleGenerate = async () => {
    const newMessages = [
      ...messages,
      {
        role: "user",
        content:
          "Convert below document into code." +
          messages[messages.length - 1]?.content,
      },
    ];
    setMessages(newMessages);
    setCurrentMessage("");
    setIsThinking(true);
    scrollToBottom();
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
      scrollToBottom();
    }
  };

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

  const handleCopyClipboard = (e, message) => {
    const button = e.currentTarget;
    navigator.clipboard
      .writeText(message.content)
      .then(() => {
        if (button) {
          button.classList.add("bg-green-200");
          setTimeout(() => {
            button.classList.remove("bg-green-200");
          }, 500);
        }
      })
      .catch((err) => console.error("Failed to copy:", err));
  };

  const handleDownloadMessage = (message, index) => {
    const pdfContent = document.createElement("div");
    pdfContent.innerHTML = `
        <div style="padding: 20px; font-family: Arial, sans-serif;">
          <div style="white-space: pre-wrap;">${marked.parse(
            message.content
          )}</div>
        </div>
      `;
    const opt = {
      margin: 1,
      filename: `response_${index}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(opt).from(pdfContent).save();
  };

  const handleReadAloud = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
  };

  const handleLanguage = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  };

  const handleEdit = (content, index) => {
    setIsEditMode(true);
    setEditingContent(content);
    setEditingIndex(index);
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null) {
      const updatedMessages = messages.map((msg, idx) => {
        if (idx === editingIndex + 1 && msg.role === "assistant") {
          return {
            ...msg,
            content: editingContent,
          };
        }
        return msg;
      });
      setMessages(updatedMessages);
    }
    setIsEditMode(false);
    setEditingIndex(null);
  };
  return (
    <div
      className="px-4 py-6 h-[calc(100vh-140px)] overflow-y-auto bg-gray-50"
      ref={messageContainerRef}
    >
      <div className="flex flex-col">
        <div className="space-y-4 w-full max-w-3xl mx-auto pb-28">
          {messages
            .filter((message) => message.role !== "system")
            .map((message, index) => {
              return (
                <div key={index} className="relative mb-6">
                  <div
                    className={`flex ${
                      message.role === "assistant"
                        ? "justify-start gap-1"
                        : "justify-end"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <SparklesIcon className="h-6 w-6 text-primary" />
                    )}
                    <div
                      className={`max-w-[80%] p-1 rounded-lg ${
                        message.role === "assistant"
                          ? "bg-gray-200 text-gray-800"
                          : "bg-primary text-white"
                      }`}
                    >
                      {isEditMode ? (
                        <div className="fixed z-10 inset-0 bg-white">
                          <div className="h-full flex flex-col">
                            <div className="flex justify-end">
                              <button
                                onClick={handleSaveEdit}
                                className="p-2 text-primary hover:text-gray-700 flex gap-1 items-center"
                                title="Exit Edit Mode"
                              >
                                <p className="text-sm font-bold underline">
                                  Save & Exit
                                </p>
                                <XCircleIcon className="h-4 w-4" />
                              </button>
                            </div>
                            <div className="flex-1 p-4">
                              <MDEditor
                                value={editingContent}
                                onChange={setEditingContent}
                                preview="live"
                                height="100%"
                                hideToolbar={false}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <MDEditor.Markdown
                          source={message.content}
                          style={{
                            padding: "8px",
                            backgroundColor: "transparent",
                            color: `${
                              message.role === "assistant" ? "#24292f" : "#fff"
                            }`,
                          }}
                        />
                      )}
                    </div>
                  </div>
                  {message.role === "assistant" && (
                    <div className="flex ml-6 mt-1">
                      <button
                        onClick={(e) => handleCopyClipboard(e, message)}
                        className="relative -bottom-1 right-0 p-1 hover:bg-gray-300 rounded-md hover:rounded-md transition-colors"
                        title="Copy to clipboard"
                      >
                        <ClipboardIcon className="h-4 w-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleDownloadMessage(message, index)}
                        className="relative -bottom-1 right-0 p-1 hover:bg-gray-300 rounded-md hover:rounded-md transition-colors"
                        title="Download message"
                      >
                        <ArrowDownTrayIcon className="h-4 w-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleReadAloud(message.content)}
                        className="relative -bottom-1 right-0 p-1 hover:bg-gray-300 rounded-md hover:rounded-md transition-colors"
                        title="Read aloud"
                      >
                        <SpeakerWaveIcon className="h-4 w-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => setCurrentMessage(message.content)}
                        className="relative -bottom-1 right-0 p-1 hover:bg-gray-300 rounded-md hover:rounded-md transition-colors"
                        title="Reply to chat"
                      >
                        <TagIcon className="h-4 w-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleEdit(message.content, index)}
                        className="relative -bottom-1 right-0 p-1 hover:bg-gray-300 rounded-md hover:rounded-md transition-colors"
                        title="Edit mode"
                      >
                        <PencilIcon className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          {isThinking && (
            <div className="flex justify-start">
              <div className="max-w-[80%] p-3 rounded-lg bg-gray-200 ml-4">
                <div className="flex items-center gap-2">Thinking...</div>
              </div>
            </div>
          )}
        </div>
        <div
          className={`fixed md:w-6/12 md:left-[25.33%] bottom-6 mt-6 md:mt-2`}
        >
          <div className="flex flex-col gap-1 bg-white rounded-3xl shadow px-2 py-1 border border-s-gray-100">
            <textarea
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder="Ask a question..."
              className="w-full h-10 resize-none focus:outline-none rounded-lg mt-2 pt-2 px-1"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleMessage(e);
                }
              }}
            />
            <div className="w-full h-full flex flex-wrap justify-between gap-4 mt-2 mb-1">
              <div className="flex gap-2 justify-center items-center ml-2">
                <button
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 group flex gap-1"
                  onClick={handleLanguage}
                  title="Select Language"
                >
                  <HashtagIcon
                    className={`h-4 w-4 text-gray-600 group-hover:animate-[wiggle_0.5s_ease-in-out]`}
                  />
                  {selectedLanguage && (
                    <p className="text-xs pr-1">{selectedLanguage}</p>
                  )}
                </button>
                {isLanguageDropdownOpen && (
                  <div className="absolute bottom-10 left-0 mb-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                    {languageOptions.map((lang) => (
                      <button
                        key={lang}
                        className={`w-full px-4 py-2 text-left hover:bg-gray-100 text-sm ${
                          selectedLanguage === lang
                            ? "bg-gray-50 text-primary"
                            : "text-gray-700"
                        }`}
                        onClick={() => {
                          setSelectedLanguage(lang);
                          setIsLanguageDropdownOpen(false);
                        }}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                )}
                <button
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 group"
                  onClick={handleReset}
                  title="Clear chat"
                >
                  <TrashIcon
                    className={`h-4 w-4 text-gray-600 group-hover:animate-[wiggle_0.5s_ease-in-out]`}
                  />
                </button>
                <button
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 group"
                  onClick={() => document.getElementById("fileInput").click()}
                  title="Upload the file"
                >
                  <input
                    type="file"
                    id="fileInput"
                    accept=".js,.jsx,.ts,.tsx,.py,.java,.cpp,.c,.cs,.rb,.php,.go,.rs,.swift,.kt,.pl,.r,.m,.h,.scala,.sql,.cobol"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  <PaperClipIcon className="h-4 w-4 text-black flex-shrink-0 transition-transform duration-300 group-hover:translate-y-0.5 group-hover:translate-x-0.5" />
                </button>
                <button
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 group"
                  onClick={handleConvert}
                  title="Convert into code"
                >
                  <ArrowPathRoundedSquareIcon className="h-4 w-4 text-gray-600 flex-shrink-0 transition-transform duration-300 group-hover:rotate-180" />
                </button>
              </div>
              <div className="flex gap-2 justify-center items-center mr-2 ml-2 md:ml-0">
                <button
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 group"
                  onClick={handleGenerate}
                  title="Generate code"
                >
                  <BeakerIcon
                    className={`h-4 w-4 text-gray-600 group-hover:animate-[wiggle_0.5s_ease-in-out]`}
                  />
                </button>
                <button
                  className={`p-2 rounded-full ${
                    isListening ? "bg-red-500" : "bg-gray-100 hover:bg-gray-200"
                  } group`}
                  onClick={handleVoice}
                  title="Voice to text"
                >
                  <MicrophoneIcon
                    className={`${
                      isListening ? "text-white" : "text-gray-600"
                    } h-5 w-5 transition-transform duration-300 group-hover:translate-y-0.5`}
                  />
                </button>
                <button
                  className="p-2 rounded-full bg-primary hover:bg-primary/90 group"
                  onClick={handleMessage}
                  title="Submit"
                >
                  <ArrowRightIcon className="h-5 w-5 text-white transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
