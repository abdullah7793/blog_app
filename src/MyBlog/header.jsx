import React, { useState } from "react";
import { FaSearch, FaMicrophone } from "react-icons/fa";

const Header = ({ handleSearch }) => {
  const [isListening, setIsListening] = useState(false);

  const handleMicrophoneClick = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log("Recognized speech:", transcript);

        handleSearch(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();

      console.log("");
    } else {
      alert("Speech recognition is not supported in this browser.");
    }
  };

  return (
    <header className="bg-gray-200 text-black p-4 shadow-lg fixed top-0 left-0 right-0 z-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Blog</h1>
        <div className="flex-grow flex justify-center">
          <div className="flex items-center bg-white rounded-full px-6 py-2 shadow-sm w-1/4">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="outline-none bg-transparent text-gray-700 w-full"
              onChange={(e) => handleSearch(e.target.value)}
            />
            <button
              onClick={handleMicrophoneClick}
              className="ml-2 focus:outline-none"
            >
              <FaMicrophone
                className={`text-gray-500 ${
                  isListening ? "text-red-500 animate-pulse" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
