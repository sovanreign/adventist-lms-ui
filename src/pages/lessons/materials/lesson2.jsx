import React from "react";
import {
  FaSun,
  FaHandHoldingHeart,
  FaHome,
  FaTshirt,
  FaCandyCane,
} from "react-icons/fa";

export default function Lesson2() {
  return (
    <div className="p-4 bg-yellow-100 text-gray-800">
      {/* Memory Verse */}
      <div className="my-4 p-4 bg-white rounded-lg shadow flex items-center">
        <FaSun className="text-3xl text-yellow-500 mr-4" />
        <div>
          <h2 className="text-xl font-semibold">Memory Verse</h2>
          <p className="italic">
            "Whatever work you do, do your best." (Ecclesiastes 9:10, ICB)
          </p>
        </div>
      </div>

      {/* First Day of Creation (Reading Section) */}
      <div className="my-4 p-4 bg-white rounded-lg shadow flex items-center">
        <FaHandHoldingHeart className="text-3xl text-blue-500 mr-4" />
        <div>
          <h2 className="text-xl font-semibold">First Day of Creation</h2>
          <p>
            When God created the world, everything was dark. But God said,
            **"Let there be light!"**, and the light appeared. God saw that the
            light was good.
          </p>
          <p>
            If you put an object inside a dark bag, can you see it? No! But if
            you shine a light inside, you will be able to see what's inside.
          </p>
          <p>God created light so we can see the things around us.</p>
        </div>
      </div>

      {/* Social Emotional Development (Needs and Provision) */}
      <div className="my-4 p-4 bg-white rounded-lg shadow flex items-center">
        <FaHandHoldingHeart className="text-3xl text-green-500 mr-4" />
        <div>
          <h2 className="text-xl font-semibold">God Provides for Our Needs</h2>
          <p>
            God gives us everything we need to live and grow. He provides us
            with food, clothes, and shelter so we can be healthy and help
            others.
          </p>
          <p className="font-semibold">Instruction:</p>
          <p>Circle the items that represent our basic needs.</p>
        </div>
      </div>

      {/* Illustration Section */}
      <div className="my-4 p-4 bg-white rounded-lg shadow grid grid-cols-3 gap-4 text-center">
        <div>
          <FaCandyCane className="text-5xl text-red-500 mx-auto" />
          <p className="mt-2">Candy</p>
        </div>
        <div>
          <FaTshirt className="text-5xl text-blue-500 mx-auto" />
          <p className="mt-2">Clothes</p>
        </div>
        <div>
          <FaHome className="text-5xl text-brown-500 mx-auto" />
          <p className="mt-2">Home</p>
        </div>
      </div>

      {/* Discussion Section */}
      <div className="my-4 p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold flex items-center">
          <FaSun className="text-3xl text-yellow-700 mr-4" /> Discussion
        </h2>
        <p>Why do we need light to see?</p>
        <p>What are the things that God has provided for us?</p>
        <p>How can we show gratitude for God's blessings?</p>
      </div>
    </div>
  );
}
