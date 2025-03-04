import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaTrophy } from "react-icons/fa";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import { LESSONS_URL } from "../../lib/constant";
import Lesson1 from "./materials/lesson1";

export default function Lesson() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await axios.get(`${LESSONS_URL}/${id}`);
        setLesson(response.data);
      } catch (error) {
        console.error("Error fetching lesson:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLesson();
  }, [id]);

  const displayContent = () => {
    switch (lesson.content) {
      case "Lesson1":
        return <Lesson1 />;
      default:
        return <p>No content available</p>;
    }
  };

  return (
    <main>
      <Sidebar />
      <div className="ml-64">
        <Navbar title={lesson ? lesson.title : "Loading..."} />

        <div className="p-8">
          {loading ? (
            <div className="flex justify-center items-center">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : lesson ? (
            <>
              <div>{displayContent()}</div>
              <div className="flex flex-col justify-end">
                <button
                  className="btn btn-primary mt-4"
                  onClick={() =>
                    document.getElementById("completion_modal").showModal()
                  }
                >
                  Mark as Done
                </button>
              </div>
            </>
          ) : (
            <div className="text-center text-gray-500 mt-10 flex flex-col items-center">
              <img src="/no-data.png" alt="No Lesson Found" className="w-1/4" />
              <p className="text-lg">Lesson not found</p>
            </div>
          )}
        </div>
      </div>

      <dialog id="completion_modal" className="modal">
        <div className="modal-box w-3/4 max-w-md text-center">
          <FaTrophy className="text-yellow-500 text-6xl mx-auto mb-4" />
          <h2 className="text-lg font-bold">Congratulations!</h2>
          <p className="text-gray-600 mt-2">
            You have successfully completed this lesson!
          </p>
          <div className="modal-action flex justify-center">
            <button
              className="btn btn-primary"
              onClick={() => {
                document.getElementById("completion_modal").close();
                navigate("/lessons");
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </dialog>
    </main>
  );
}
