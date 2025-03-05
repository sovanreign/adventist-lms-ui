import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ACTIVITIES_URL } from "../../lib/constant";
import CountTheFruit from "./games/count-the-fruit";
import FindMissingLetter from "./games/find-missing-letter";
import NameTheColor from "./games/name-the-color";

export default function Game() {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // screen 0: initial view; 1: game view (or more if you add additional game screens)
  const [screen, setScreen] = useState(0);

  useEffect(() => {
    async function fetchActivity() {
      try {
        const response = await axios.get(`${ACTIVITIES_URL}/${id}`);
        setActivity(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchActivity();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl font-semibold text-red-500">
          Error: {error.message}
        </p>
      </div>
    );
  }

  // If the screen state is not the initial view, render the appropriate game component.
  if (screen !== 0) {
    // Check the activity content and render the corresponding component.
    if (activity.content === "count-the-fruit") {
      return <CountTheFruit id={id} />;
    } else if (activity.content === "find-missing-letter") {
      return <FindMissingLetter id={id} />;
    } else if (activity.content === "name-the-color") {
      return <NameTheColor id={id} />;
    }
    // Fallback for unrecognized game types.
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl font-semibold">Game type not available.</p>
      </div>
    );
  }

  // Render the initial screen with activity details.
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold">{activity.title}</h2>
          <p className="py-2 text-gray-700">{activity.description}</p>
          <div className="py-4">
            <span className="badge badge-primary text-lg">
              Points: {activity.totalPoints}
            </span>
          </div>
          <div className="card-actions justify-end">
            <button
              className="btn btn-primary"
              onClick={() => {
                if (activity.content === "count-the-fruit") {
                  setScreen(1);
                } else {
                  console.warn(
                    "No matching game component for this activity content"
                  );
                }
              }}
            >
              Start
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
