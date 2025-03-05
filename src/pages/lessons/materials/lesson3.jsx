import React from "react";
import {
  FaCloud,
  FaWater,
  FaWind,
  FaPrayingHands,
  FaPalette,
} from "react-icons/fa";

export default function Lesson3() {
  return (
    <div className="p-4 bg-blue-100 text-gray-800">
      {/* Memory Verse */}
      <div className="my-4 p-4 bg-white rounded-lg shadow flex items-center">
        <FaCloud className="text-3xl text-blue-500 mr-4" />
        <div>
          <h2 className="text-xl font-semibold">Memory Verse</h2>
          <p className="italic">
            "The heavens declare the glory of God; the skies proclaim the work
            of His hands." (Psalm 19:1)
          </p>
        </div>
      </div>

      {/* Second Day of Creation (Reading Section) */}
      <div className="my-4 p-4 bg-white rounded-lg shadow flex items-center">
        <FaWater className="text-3xl text-blue-700 mr-4" />
        <div>
          <h2 className="text-xl font-semibold">Second Day of Creation</h2>
          <p>
            On the second day of creation, God made something very important. He
            **separated the waters from the waters**. He **created the sky and
            air** to divide the water below from the water above.
          </p>
          <p>
            We need air to breathe. All day and night, we breathe air—we breathe
            in and out. God put air between the waters below and the waters
            above.
          </p>
          <p>
            God created the sky, water, and air on the second day. When He
            looked at everything He had made, He saw that it was good.
          </p>
        </div>
      </div>

      {/* Social Emotional Development (Reflection and Creativity) */}
      <div className="my-4 p-4 bg-white rounded-lg shadow flex items-center">
        <FaPalette className="text-3xl text-green-500 mr-4" />
        <div>
          <h2 className="text-xl font-semibold">Learning Activity</h2>
          <p>
            Appreciate God's creation by coloring and tracing different shapes
            and pictures. Observe the beauty of the sky and water around you.
          </p>
        </div>
      </div>

      {/* Materials Needed */}
      <div className="my-4 p-4 bg-white rounded-lg shadow flex items-center">
        <FaWind className="text-3xl text-gray-500 mr-4" />
        <div>
          <h2 className="text-xl font-semibold">Materials</h2>
          <ul className="list-disc ml-6">
            <li>Cotton</li>
            <li>Glue</li>
            <li>Paint brushes</li>
            <li>Bond paper</li>
            <li>Paper plates</li>
            <li>Scissors</li>
            <li>Watercolor</li>
            <li>Crayons</li>
            <li>Blue colored paper</li>
          </ul>
        </div>
      </div>

      {/* Reflection / Prayer */}
      <div className="my-4 p-4 bg-white rounded-lg shadow flex items-center">
        <FaPrayingHands className="text-3xl text-purple-500 mr-4" />
        <div>
          <h2 className="text-xl font-semibold">My Moment With God</h2>
          <p className="italic">
            "Dear God, thank You for making water and air. Thank You for Your
            love and care. In Jesus' name, I pray. Amen."
          </p>
        </div>
      </div>

      {/* Discussion Section */}
      <div className="my-4 p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold flex items-center">
          <FaCloud className="text-3xl text-blue-700 mr-4" /> Discussion
        </h2>
        <p>Why do we need air to live?</p>
        <p>How did God create the sky and air?</p>
        <p>How can we take care of the air and water?</p>
      </div>
    </div>
  );
}
