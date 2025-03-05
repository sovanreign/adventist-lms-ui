import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../lib/constant";
import { FaTrophy } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const colors = [
  { name: "Red", code: "#FF0000" },
  { name: "Blue", code: "#0000FF" },
  { name: "Green", code: "#008000" },
  { name: "Yellow", code: "#FFFF00" },
  { name: "Purple", code: "#800080" },
  { name: "Orange", code: "#FFA500" },
  { name: "Pink", code: "#FFC0CB" },
  { name: "Cyan", code: "#00FFFF" },
  { name: "Brown", code: "#A52A2A" },
  { name: "Gray", code: "#808080" },
];

function NameTheColor({ id }) {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
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

  const { name, code } = colors[currentColorIndex];
  const options = colors
    .map((color) => color.name)
    .sort(() => Math.random() - 0.5);

  const handleSelectAnswer = (answer) => {
    setSelectedAnswer(answer);
    if (answer === name) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  const handleNextColor = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    if (currentColorIndex < colors.length - 1) {
      setCurrentColorIndex(currentColorIndex + 1);
    } else {
      sendFinalScore(); // End game when all colors are completed
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-100 to-indigo-50 p-6">
        <h1 className="text-4xl font-extrabold mb-6 text-indigo-700">
          Name the Color
        </h1>
        <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-6 text-center">
          <div
            className="w-40 h-40 rounded-md shadow-md mb-6 mx-auto"
            style={{ backgroundColor: code }}
          ></div>
          <div className="grid grid-cols-2 gap-4 w-full">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelectAnswer(option)}
                disabled={showResult}
                className={`w-full px-4 py-3 text-lg font-semibold rounded-lg shadow-md transition-colors duration-200 ${
                  option === selectedAnswer
                    ? option === name
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          {showResult && (
            <p className="mt-4 text-lg font-medium">
              {selectedAnswer === name
                ? "🎉 Correct!"
                : `❌ Wrong! The correct color was '${name}'.`}
            </p>
          )}
        </div>
        {showResult ? (
          <button
            onClick={handleNextColor}
            className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg text-lg font-semibold hover:bg-indigo-700 transition-all"
          >
            Next Color
          </button>
        ) : (
          <button
            className="mt-6 bg-gray-400 text-white px-6 py-3 rounded-lg shadow-lg text-lg font-semibold"
            disabled
          >
            Select an Answer
          </button>
        )}
        <p className="mt-4 text-lg font-semibold text-gray-700">
          Score: <span className="text-indigo-700">{score}</span>/
          {colors.length}
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

export default NameTheColor;
