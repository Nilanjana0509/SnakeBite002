import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FinalResult15 = () => {
  const [allResults, setAllResults] = useState({});
  const navigate = useNavigate();

  // Map of level results to their display titles
  const levelTitles = {
    level1Result: "You have come across a patient of Snake bite",    
    level2Result: "Initial Management", 
    level3Result: "Various findings related to Snake bite considering one type of envenomation",
    level4Result: "Options available for management",
    level6Result: "5 mins after starting AVS, patient develops Anaphylactoid. Options available for management",
    // level8Result: "Signs of bleeding",
    level11Result: "Options available when initial WBCT 20 comes clotted",
    level15Result: "Options available when WBCT comes clotted in all occations",
  };

  useEffect(() => {
    // Retrieve each level's result from localStorage
    const results = {
      level1Result: JSON.parse(localStorage.getItem("level1Result")),      
      level2Result: JSON.parse(localStorage.getItem("level2Result")),
      level3Result: JSON.parse(localStorage.getItem("level3TextResult")),
      level4Result: JSON.parse(localStorage.getItem("level4Result")),
      level6Result: JSON.parse(localStorage.getItem("level6Result")),
      // level8Result: JSON.parse(localStorage.getItem("level8Result")),
      level11Result: JSON.parse(localStorage.getItem("level11Result")),
      level15Result: JSON.parse(localStorage.getItem("level15Result")),
    };

    setAllResults(results);
  }, []);

  // Function to handle Home button click
  const handleHomeClick = () => {
    localStorage.clear(); // Clear all data from localStorage
    navigate("/level1"); // Navigate to the Level1 page
  };

  const handleExitClick = () => {
    localStorage.clear(); // Clear all data from localStorage
    // Redirects to the browser's home page
    window.location.href = "https://google.com";;
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h2 className="text-2xl font-bold text-blue-500 mb-6">Game Results</h2>
      <p className="text-lg text-gray-600 mb-4 font-semibold" >
        The options you selected since Level 1
      </p>
      <div className="w-full max-w-lg bg-white p-4 rounded-lg shadow-lg">
        {Object.entries(allResults).map(([level, result], index) => (
          <div key={index} className="mb-4">
            <h3 className="text-xl font-semibold text-gray-700">
              {levelTitles[level] || level.replace("Result", "")}:
            </h3>
            {result ? (
              <p className="text-gray-600">{result.join(", ")}</p>
            ) : (
              <p className="text-gray-400">No selection</p>
            )}
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <button
          onClick={handleHomeClick}
          className="bg-blue-500 text-white px-4 py-2 mt-6 rounded-md hover:bg-blue-600 transition"
        >
          Home
        </button>
        <button
          onClick={handleExitClick}
          className="bg-blue-500 text-white px-4 py-2 mt-6 rounded-md hover:bg-blue-600 transition"
        >
          Exit
        </button>
      </div>
    </div>
  );
};

export default FinalResult15;
