import { useState } from "react";
import axios from "axios";
import { RESULT_URL } from "../../../lib/constant";
import { FaTrophy } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const fruits = [
  { name: "Apples", emoji: "🍎", count: Math.floor(Math.random() * 10) + 1 },
  { name: "Bananas", emoji: "🍌", count: Math.floor(Math.random() * 10) + 1 },
  { name: "Oranges", emoji: "🍊", count: Math.floor(Math.random() * 10) + 1 },
  { name: "Grapes", emoji: "🍇", count: Math.floor(Math.random() * 10) + 1 },
  {
    name: "Strawberries",
    emoji: "🍓",
    count: Math.floor(Math.random() * 10) + 1,
  },
  {
    name: "Watermelons",
    emoji: "🍉",
    count: Math.floor(Math.random() * 10) + 1,
  },
  { name: "Cherries", emoji: "🍒", count: Math.floor(Math.random() * 10) + 1 },
  { name: "Peaches", emoji: "🍑", count: Math.floor(Math.random() * 10) + 1 },
  {
    name: "Pineapples",
    emoji: "🍍",
    count: Math.floor(Math.random() * 10) + 1,
  },
  { name: "Lemons", emoji: "🍋", count: Math.floor(Math.random() * 10) + 1 },
];

function CountTheFruit({ id }) {
  const [currentFruitIndex, setCurrentFruitIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();

  // Sends the final score to the API and then shows the completion modal.
  const sendFinalScore = async () => {
    const payload = {
      studentId: +localStorage.getItem("sub"),
      activityId: +id,
      score: score,
    };

    try {
      await axios.post(`${RESULT_URL}`, payload, {});
      // Open the completion modal once the score has been sent.
      document.getElementById("completion_modal").showModal();
      console.log("YES");
    } catch (error) {
      console.error("Error sending score:", error);
    }
  };

  const { name, emoji, count } = fruits[currentFruitIndex];

  const handleCheckAnswer = () => {
    if (parseInt(inputValue) === count) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  const handleNextFruit = () => {
    setInputValue("");
    setShowResult(false);
    if (currentFruitIndex < fruits.length - 1) {
      setCurrentFruitIndex(currentFruitIndex + 1);
    } else {
      // End the game after the last question.
      sendFinalScore();
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-100 to-green-50 p-6">
        <h1 className="text-4xl font-extrabold mb-6 text-green-700">
          Count the Fruit
        </h1>
        <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-6 text-center">
          <div className="text-6xl mb-6">
            {Array.from({ length: count }).map((_, index) => (
              <span key={index}>{emoji}</span>
            ))}
          </div>
          <p className="text-xl font-medium mb-4">
            How many <span className="text-green-700 font-bold">{name}</span> do
            you see?
          </p>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-32 px-4 py-2 mb-4 text-center text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
            placeholder="Enter number"
            disabled={showResult}
          />
          {showResult && (
            <p className="text-lg font-medium">
              {parseInt(inputValue) === count
                ? "🎉 Correct!"
                : `❌ Wrong! The correct number was ${count}.`}
            </p>
          )}
        </div>
        {showResult ? (
          <button
            onClick={handleNextFruit}
            className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg text-lg font-semibold hover:bg-green-700 transition-all"
          >
            Next Fruit
          </button>
        ) : (
          <button
            onClick={handleCheckAnswer}
            className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg text-lg font-semibold hover:bg-green-700 transition-all"
          >
            Check Answer
          </button>
        )}
        <p className="mt-4 text-lg font-semibold text-gray-700">
          Score: <span className="text-green-700">{score}</span>/{fruits.length}
        </p>
      </div>

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

export default CountTheFruit;
