import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../lib/constant";
import { FaTrophy } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const words = [
  { word: "apple", missing: "p" },
  { word: "banana", missing: "n" },
  { word: "grape", missing: "a" },
  { word: "orange", missing: "g" },
  { word: "peach", missing: "c" },
  { word: "cherry", missing: "r" },
  { word: "melon", missing: "o" },
  { word: "kiwi", missing: "w" },
  { word: "mango", missing: "g" },
  { word: "lemon", missing: "m" },
];

function FindMissingLetter({ id }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();

  // Sends the final score to the API and opens the completion modal
  const sendFinalScore = async () => {
    const payload = {
      studentId: +localStorage.getItem("sub"),
      activityId: +id,
      score: score,
    };

    try {
      await axios.post(`${BASE_URL}/activities`, payload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      document.getElementById("completion_modal").showModal();
    } catch (error) {
      console.error("Error sending score:", error);
    }
  };

  const { word, missing } = words[currentWordIndex];
  const options = [
    missing,
    String.fromCharCode(missing.charCodeAt(0) + 1),
    String.fromCharCode(missing.charCodeAt(0) - 1),
  ].sort(() => Math.random() - 0.5);

  const handleSelectLetter = (letter) => {
    setSelectedLetter(letter);
    if (letter === missing) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  const handleNextWord = () => {
    setSelectedLetter(null);
    setShowResult(false);
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      sendFinalScore(); // End game when all words are completed
    }
  };

  const displayWord = word.replace(missing, "_");

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-50 p-6">
        <h1 className="text-4xl font-extrabold mb-6 text-blue-700">
          Find the Missing Letter
        </h1>
        <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-6 text-center">
          <h2 className="text-2xl font-semibold mb-6">{displayWord}</h2>
          <div className="flex justify-center gap-4">
            {options.map((letter, index) => (
              <button
                key={index}
                onClick={() => handleSelectLetter(letter)}
                disabled={showResult}
                className={`px-4 py-2 rounded-full text-lg font-bold text-gray-900 ${
                  letter === selectedLetter
                    ? letter === missing
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
          {showResult && (
            <p className="mt-4 text-lg font-medium">
              {selectedLetter === missing
                ? "🎉 Correct!"
                : `❌ Wrong! The correct letter was '${missing}'.`}
            </p>
          )}
        </div>
        {showResult ? (
          <button
            onClick={handleNextWord}
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg text-lg font-semibold hover:bg-blue-700 transition-all"
          >
            Next Word
          </button>
        ) : (
          <button
            onClick={() => {}}
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg text-lg font-semibold hover:bg-blue-700 transition-all"
            disabled
          >
            Select an Answer
          </button>
        )}
        <p className="mt-4 text-lg font-semibold text-gray-700">
          Score: <span className="text-blue-700">{score}</span>/{words.length}
        </p>
      </div>

      {/* Completion Modal */}
      <dialog id="completion_modal" className="modal">
        <div className="modal-box w-3/4 max-w-md text-center">
          <FaTrophy className="text-yellow-500 text-6xl mx-auto mb-4" />
          <h2 className="text-lg font-bold">Congratulations!</h2>
          <p className="text-gray-600 mt-2">
            You have successfully completed this activity!
          </p>
          <p className="text-xl mt-2">Your Score: {score}</p>
          <div className="modal-action flex justify-center">
            <button
              className="btn btn-primary"
              onClick={() => {
                document.getElementById("completion_modal").close();
                navigate("/activities");
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default FindMissingLetter;
