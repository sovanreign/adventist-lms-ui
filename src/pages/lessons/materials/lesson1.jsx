import React from "react";
import { FaBible, FaGlobe, FaTree, FaHeart } from "react-icons/fa";

export default function Lesson1() {
  return (
    <div className="p-4 bg-green-100 text-gray-800">
      <div className="my-4 p-4 bg-white rounded-lg shadow flex items-center">
        <FaBible className="text-3xl text-blue-500 mr-4" />
        <div>
          <h2 className="text-xl font-semibold">Memory Verse</h2>
          <p className="italic">
            "God saw all that he had made. And it was very good" (Genesis 1:31,
            NIV).
          </p>
        </div>
      </div>

      <div className="my-4 p-4 bg-white rounded-lg shadow flex items-center">
        <FaHeart className="text-3xl text-red-500 mr-4" />
        <div>
          <h2 className="text-xl font-semibold">Objectives</h2>
          <ul className="list-disc ml-6">
            <li>Show appreciation for God's creation</li>
            <li>Identify how I am a girl and if I am a boy</li>
            <li>Tell what my favorite food is</li>
          </ul>
        </div>
      </div>

      <div className="my-4 p-4 bg-white rounded-lg shadow flex items-center">
        <FaGlobe className="text-3xl text-green-500 mr-4" />
        <div>
          <h2 className="text-xl font-semibold">My Week</h2>
          <p>God created the wonderful world because He loves me.</p>
        </div>
      </div>

      <div className="my-4 p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold flex items-center">
          <FaTree className="text-3xl text-green-700 mr-4" /> Discussion
        </h2>
        <p>
          Have you ever thought about how everything in the world began? Books,
          houses, and gardens all came from somewhere.
        </p>
        <p>
          Where did the trees, your body, your purpose, the rooster, and the
          mountains come from?
        </p>
        <p>
          Have you ever read about the sun, the sea, and the land coming into
          being?
        </p>
        <p>
          How about you, your father, your mother, your brother, and sister?
          Where did they come from?
        </p>
        <p>Have you read about it?</p>
        <p>
          If people have tried to explain how you and all these things exist,
          you should read the Bible, which records the truth.
        </p>
        <p>
          It tells us that God, who created everything, is the one who made the
          wonderful world.
        </p>
        <p>
          Just as words are written in a book, God spoke and the world came into
          existence.
        </p>
        <p>
          This learning is in the verse: "In the beginning, God created the
          world."
        </p>
        <p>Remember: God created this world because He loves us.</p>
      </div>
    </div>
  );
}
