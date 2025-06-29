import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const FinalResult13 = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathA = ["level1Result", "level2Result", "level3Result", "level4Result", "level6Result", "level7Result", "level9Result", "level13Result"];
  const pathB = ["level1Result", "level2Result", "level3Result", "level4Result", "level6Result", "level7Result", "level10Result", "level9Result", "level13Result"];
  const pathC = ["level1Result", "level2Result", "level3Result", "level4Result", "level6Result", "level7Result", "level10Result", "level9Result", "level14Result", "level13Result"];

  const [allResults, setAllResults] = useState({});
  
  const isPathB = location.state?.isPathB ?? false;
  const isPathC = location.state?.isPathC ?? false;
  // const isPathA = location.state?.isPathA ?? false;

  const useDisplayPath = (isPathB, isPathC) => {
    return React.useMemo(() => {
      if (isPathC) return pathC;
      if (isPathB) return pathB;
      return pathA;
    }, [isPathB, isPathC]);
  };
  
  // Usage in the component
  const displayPath = useDisplayPath(isPathB, isPathC);
  
  
  

  

  const levelTitles = {
    level1Result: "You have come across a patient of Snake bite",
    level2Result: "Initial Management",
    level3Result: "Various findings related to Snake bite considering one type of envenomation",
    level4Result: "Options available for management",
    level6Result: "5 mins after starting AVS, patient develops Anaphylactoid. Options available for management",
    level7Result: "Neurological signs",
    level9Result: "Improving after 30 min",
    level10Result: "Not improving after 30 min",
    level13Result: "Improving",
    level14Result: "Not improving",
  };

  useEffect(() => {
    const results = {
      level1Result: JSON.parse(localStorage.getItem("level1Result")),
      level2Result: JSON.parse(localStorage.getItem("level2Result")),
      level3Result: JSON.parse(localStorage.getItem("level3TextResult")),
      level4Result: JSON.parse(localStorage.getItem("level4Result")),
      level6Result: JSON.parse(localStorage.getItem("level6Result")),
      level7Result: JSON.parse(localStorage.getItem("level7Result")),
      level9Result: JSON.parse(localStorage.getItem("level9Result")),
      level10Result: JSON.parse(localStorage.getItem("level10Result")),
      level13Result: JSON.parse(localStorage.getItem("level13Result")),
      level14Result: JSON.parse(localStorage.getItem("level14Result")),
    };

    console.log("Results from localStorage:", results);
    setAllResults(results);
  }, []);

  const handleHomeClick = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleExitClick = () => {
    localStorage.clear();
    window.location.href = "https://google.com";
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h2 className="text-2xl font-bold text-blue-500 mb-6">Final Results</h2>
      <p className="text-lg text-gray-600 mb-4 font-semibold">
        The options you selected since Level 1
      </p>

      <div className="w-full max-w-lg bg-white p-4 rounded-lg shadow-lg">
        <ul>
          {displayPath.map((levelKey, index) => (
            <li key={index} className="mb-4">
              <h3 className="text-xl font-semibold text-gray-700">
                {levelTitles[levelKey] || levelKey.replace("Result", "")}:
              </h3>
              {allResults[levelKey] ? (
                <p className="text-gray-600">{allResults[levelKey].join(", ")}</p>
              ) : (
                <p className="text-gray-400">No result found</p>
              )}
            </li>
          ))}
        </ul>
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

export default FinalResult13;
