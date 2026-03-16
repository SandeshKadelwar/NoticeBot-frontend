import React, { useEffect, useRef, useState } from "react";

const locations = {
  CABIN: { x: 50, y: 50 },
  CLASS1: { x: 300, y: 60 },
  CLASS2: { x: 260, y: 260 },
  CLASS3: { x: 100, y: 320 },
};

const Hero = () => {
  const [robotPosition, setRobotPosition] = useState(locations.CABIN);
  const [status, setStatus] = useState("Idle");
  const intervalRef = useRef(null);

  const moveTo = (destination) => {
    if (intervalRef.current) {
      cancelAnimationFrame(intervalRef.current);
    }

    const startX = robotPosition.x;
    const startY = robotPosition.y;
    const target = locations[destination];

    const duration = 1500; // animation time in ms
    let startTime = null;

    setStatus("Moving to " + destination);

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const progress = timestamp - startTime;
      const percent = Math.min(progress / duration, 1);

      const newX = startX + (target.x - startX) * percent;
      const newY = startY + (target.y - startY) * percent;

      setRobotPosition({ x: newX, y: newY });

      if (percent < 1) {
        intervalRef.current = requestAnimationFrame(animate);
      } else {
        setStatus("Reached " + destination);
      }
    };

    intervalRef.current = requestAnimationFrame(animate);
  };


  const stopRobot = () => {
    if (intervalRef.current) {
      cancelAnimationFrame(intervalRef.current);
    }
    setStatus("Robot Stopped");
  };


  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-blue-50 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-8">
        Web Enabled Indoor Notice Delivery Robot
      </h1>

      <div className="flex gap-10">

        {/* MAP AREA */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Robot Location</h3>

          <div className="relative w-100 h-100 bg-white border rounded shadow">

            {/* Robot */}
            <div
              className="absolute w-6 h-6 bg-red-500 rounded-full transition-all duration-75"
              style={{
                left: robotPosition.x + "px",
                top: robotPosition.y + "px",
              }}
            />

            {/* Points */}
            <div className="absolute left-12.5 top-12.5 text-sm font-bold">
              CABIN
            </div>
            <div className="absolute left-75 top-15 text-sm font-bold">
              CLASS 1
            </div>
            <div className="absolute left-65 top-65 text-sm font-bold">
              CLASS 2
            </div>
            <div className="absolute left-25 top-80 text-sm font-bold">
              CLASS 3
            </div>
          </div>
        </div>

        {/* CONTROL PANEL */}
        <div className="bg-white p-6 rounded shadow w-62.5">
          <h3 className="text-lg font-semibold mb-4">Control Panel</h3>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => moveTo("CABIN")}
              className="bg-blue-600 text-white py-2 rounded hover:bg-blue-500"
            >
              CABIN
            </button>

            <button
              onClick={() => moveTo("CLASS1")}
              className="bg-blue-600 text-white py-2 rounded hover:bg-blue-500"
            >
              CLASS 1
            </button>

            <button
              onClick={() => moveTo("CLASS2")}
              className="bg-blue-600 text-white py-2 rounded hover:bg-blue-500"
            >
              CLASS 2
            </button>

            <button
              onClick={() => moveTo("CLASS3")}
              className="bg-blue-600 text-white py-2 rounded hover:bg-blue-500"
            >
              CLASS 3
            </button>

            <button
              onClick={stopRobot}
              className="bg-red-600 text-white py-2 rounded hover:bg-red-500"
            >
              STOP
            </button>
          </div>

          {/* STATUS BOX */}
          <div className="mt-6 p-3 border rounded bg-gray-100">
            <h4 className="font-semibold">Status</h4>
            <p className="text-blue-700">{status}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
