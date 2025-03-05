import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import { FaLock, FaScroll, FaUnlock } from "react-icons/fa";
import { LESSONS_URL } from "../../lib/constant";
import { useNavigate } from "react-router-dom";

export default function Lessons() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get(LESSONS_URL);
        setLessons(response.data);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLessons();
  }, []);

  const toggleLock = async (id, isLocked) => {
    try {
      await axios.patch(`${LESSONS_URL}/${id}`, {
        isOpen: !isLocked,
      });
      setLessons((prevLessons) =>
        prevLessons.map((lesson) =>
          lesson.id === id ? { ...lesson, isOpen: !lesson.isOpen } : lesson
        )
      );
      // print(res.data.isOpen);
    } catch (error) {
      console.error("Error updating lesson lock state:", error);
    }
  };

  const navigate = useNavigate();

  return (
    <main>
      <Sidebar />
      <div className="ml-64">
        <Navbar title={"Learning Materials"} />

        <div className="p-8">
          <h1 className="font-semibold text-xl">Text Lessons</h1>
        </div>

        {loading ? (
          <div className="flex justify-center items-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : lessons.length === 0 ? (
          <div className="text-center text-gray-500 mt-10 flex flex-col items-center">
            <img src="/no-data.png" alt="No Lessons" className="w-1/4" />
            <p className="text-lg">No lessons found</p>
          </div>
        ) : (
          <div className="px-8 grid grid-cols-1 gap-4">
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                className={`flex w-3/4 items-center p-4 shadow rounded-lg ${
                  !lesson.isOpen ? "bg-gray-300" : "bg-white"
                }`}
              >
                <div className="flex-shrink-0">
                  <FaScroll className="w-12 h-12 text-gray-500" />
                </div>
                <div
                  className="ml-4 flex-1 cursor-pointer"
                  onClick={() => {
                    if (!lesson || !lesson.isOpen) {
                      return;
                    }

                    navigate(`/lessons/${lesson.id}`);
                  }}
                >
                  <h2 className="font-semibold text-lg">{lesson.title}</h2>
                  <p className="text-gray-600">{lesson.description}</p>
                </div>
                <div className="ml-4">
                  {role === "Student" ? (
                    <p className="text-sm italic text-gray-800">
                      This lesson is not yet available
                    </p>
                  ) : role === "Student" && lesson.isOpen ? (
                    ""
                  ) : (
                    <button
                      className="px-4 py-2 bg-violet-700 text-white rounded cursor-pointer"
                      onClick={() => toggleLock(lesson.id, lesson.isOpen)}
                    >
                      {lesson.isOpen ? <FaLock /> : <FaUnlock />}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
