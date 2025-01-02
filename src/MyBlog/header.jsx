import React, { useState, useRef } from "react";
import { FaSearch, FaMicrophone } from "react-icons/fa";

const Header = ({ handleSearch, searchTerm }) => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const handleMicrophoneClick = () => {
    if (!recognitionRef.current) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.lang = "en-US";
        recognitionRef.current.interimResults = false;

        recognitionRef.current.onstart = () => {
          setIsListening(true);
          recognitionRef.stop();
        };

        recognitionRef.current.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          const searchInput = document.querySelector("input[type='text']");
          if (searchInput) {
            searchInput.value = transcript;
          }
          console.log("Recognized speech:", transcript);

          handleSearch(transcript);
          setIsListening(false);
        };

        recognitionRef.current.onerror = () => {
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
          recognitionRef.current = null;
        };
      } else {
        alert("Speech recognition is not supported in this browser.");
        return;
      }
    }

    if (!isListening) {
      recognitionRef.current.start();
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
              value={searchTerm}
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
