import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const FinalResult12 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const origin = location.state?.origin || "level6"; // Default to "level6" to ensure correct path
  const [allResults, setAllResults] = useState({});
  const [showStarPopup, setShowStarPopup] = useState(false); // Triggered on Home click
  const [showWarningPopup, setShowWarningPopup] = useState(false);
  const [showCompletionPopup, setShowCompletionPopup] = useState(false);

  const levelTitles = {
    level1Result: "You have come across a patient of Snake bite",
    level2Result: "Initial Management",
    level3Result: "Various findings related to Snake bite considering one type of envenomation",
    level4Result: "Options available for management",
    level6Result: "5 mins after starting AVS, patient develops Anaphylactoid. Options available for management",
    level11Result: "Options available when initial WBCT 20 comes clotted",
    level12Result: "Not clotted",
  };

  const getCompletedPathsCount = () => {
    const pathData = JSON.parse(localStorage.getItem("path")) || {};
    return Object.values(pathData).filter((value) => value === true).length;
  };

  const getUnawardedPaths = () => {
    const pathData = JSON.parse(localStorage.getItem("path")) || {};
    const awardedPaths = JSON.parse(localStorage.getItem("awardedPaths")) || {};
    return ["1-2-3-4-6-12", "1-2-3-4-6-11-12"].filter(path => pathData[path] && !awardedPaths[path]);
  };

  const handlepopup = () => {
    setShowStarPopup(false);
  };

  useEffect(() => {
    const results = {
      level1Result: JSON.parse(localStorage.getItem("level1Result")) || [],
      level2Result: JSON.parse(localStorage.getItem("level2Result")) || [],
      level3Result: JSON.parse(localStorage.getItem("level3TextResult")) || [],
      level4Result: JSON.parse(localStorage.getItem("level4Result")) || [],
      level6Result: JSON.parse(localStorage.getItem("level6Result")) || [],
      level11Result: JSON.parse(localStorage.getItem("level11Result")) || [],
      level12Result: JSON.parse(localStorage.getItem("level12Result")) || [],
    };

    // Exclude level11Result for path 1-2-3-4-6-12 if no Level 11 data
    if (origin === "level6" && (!results.level11Result || results.level11Result.length === 0)) {
      delete results.level11Result;
    }
    setAllResults(results);

    // Determine and update the current path
    const currentPath = results.level11Result && results.level11Result.length > 0 ? "1-2-3-4-6-11-12" : "1-2-3-4-6-12";
    let prevPath = JSON.parse(localStorage.getItem("path")) || {
      "1-2-3-5": false,
      "1-2-3-4-6-11-15": false,
      "1-2-3-4-6-11-12": false,
      "1-2-3-4-6-12": false,
      "1-2-3-4-6-7-9-13": false,
      "1-2-3-4-6-7-10-13": false,
      "1-2-3-4-6-7-10-14-13": false,
      "1-2-3-4-6-7-10-14-16": false,
    };
    if (!prevPath[currentPath]) {
      prevPath[currentPath] = true;
      localStorage.setItem("path", JSON.stringify(prevPath));
    }
    console.log("Origin:", origin);
    console.log("Current Path:", currentPath);
    console.log("Level11 Result:", results.level11Result);
  }, [origin]);

  const handleHomeClick = () => {
    const unawardedPaths = getUnawardedPaths();
    if (unawardedPaths.length > 0) {
      // Award a star for the first unawarded path
      const awardedPaths = JSON.parse(localStorage.getItem("awardedPaths")) || {};
      awardedPaths[unawardedPaths[0]] = true;
      localStorage.setItem("awardedPaths", JSON.stringify(awardedPaths));
      setShowStarPopup(true); // Show star popup
    } else if (getCompletedPathsCount() >= 8) {
      setShowCompletionPopup(true); // Show completion if all 8 paths done
    } else {
      // Continue game
      const pathData = localStorage.getItem("path");
      localStorage.clear();
      if (pathData !== null) {
        localStorage.setItem("path", pathData);
      }
      const level2Result = JSON.parse(localStorage.getItem("level2Result")) || [];
      navigate("/level2", {
        state: {
          prev: "1-2",
          triggerSuccess: true,
          ...level2Result.reduce((acc, text, index) => ({
            ...acc,
            [`selectedCards${index + 1}`]: { text },
          }), {}),
        },
      });
    }
  };

  const handleExitClick = () => {
    const completedPaths = getCompletedPathsCount();
    if (completedPaths >= 8) {
      setShowCompletionPopup(true);
    } else {
      setShowWarningPopup(true);
    }
  };

  const confirmExit = () => {
    localStorage.clear();
    const resetData = {
      "1-2-3-5": false,
      "1-2-3-4-6-11-15": false,
      "1-2-3-4-6-11-12": false,
      "1-2-3-4-6-12": false,
      "1-2-3-4-6-7-9-13": false,
      "1-2-3-4-6-7-10-13": false,
      "1-2-3-4-6-7-10-14-13": false,
      "1-2-3-4-6-7-10-14-16": false,
    };
    localStorage.setItem("path", JSON.stringify(resetData));
    window.location.href = "https://google.com";
  };

  return (
    <>
      {showStarPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-sm text-center">
            <h2 className="text-lg sm:text-2xl font-bold text-amber-600 mb-4">
              You completed the path and achieved one star!
            </h2>
            <button
              className="bg-amber-950 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md"
              onClick={handlepopup}
            >
              Got it!
            </button>
          </div>
        </div>
      )}
      {!showStarPopup && (
        <>
          <div className="p-6 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-amber-800 mb-6">Game Results</h2>
            <p className="text-lg text-amber-600 mb-4 font-semibold">
              The options you selected since Level 1
            </p>
            <div className="w-full max-w-lg bg-white p-4 rounded-lg shadow-lg">
              <ul>
                {Object.entries(allResults)
                  .filter(([_, result]) => result && result.length)
                  .map(([level, result], index) => (
                    <li key={index} className="mb-4">
                      <h3 className="text-xl font-semibold text-gray-700">
                        {levelTitles[level] || level.replace("Result", "")}:
                      </h3>
                      <p className="text-gray-600">{result.join(", ")}</p>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleHomeClick}
                className="bg-amber-800 text-white px-4 py-2 mt-6 rounded-md hover:bg-amber-900 transition"
              >
                Home
              </button>
              <button
                onClick={handleExitClick}
                className="bg-amber-800 text-white px-4 py-2 mt-6 rounded-md hover:bg-amber-900 transition"
              >
                Exit
              </button>
            </div>
          </div>
          {showWarningPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
                <h2 className="text-lg font-bold text-red-600 mb-4">
                  You'll lose all your stars you collected if you press Exit now!
                </h2>
                <div className="flex justify-center space-x-4">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                    onClick={confirmExit}
                  >
                    Confirm Exit
                  </button>
                  <button
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
                    onClick={() => setShowWarningPopup(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      {showCompletionPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
            <h2 className="text-lg font-bold text-amber-600 mb-4">
              Congratulations! You have collected all 8 stars and successfully completed the game.
            </h2>
            <p className="text-gray-600 mb-4">
              Now you can exit or start over again.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-amber-800 text-white px-4 py-2 rounded-md hover:bg-amber-900 transition"
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "https://google.com";
                }}
              >
                Exit
              </button>
              <button
                className="bg-amber-800 text-white px-4 py-2 rounded-md hover:bg-amber-900 transition"
                onClick={() => {
                  const resetData = {
                    "1-2-3-5": false,
                    "1-2-3-4-6-11-15": false,
                    "1-2-3-4-6-11-12": false,
                    "1-2-3-4-6-12": false,
                    "1-2-3-4-6-7-9-13": false,
                    "1-2-3-4-6-7-10-13": false,
                    "1-2-3-4-6-7-10-14-13": false,
                    "1-2-3-4-6-7-10-14-16": false,
                  };
                  localStorage.clear();
                  localStorage.setItem("path", JSON.stringify(resetData));
                  navigate("/rules");
                }}
              >
                Start Over
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FinalResult12;
