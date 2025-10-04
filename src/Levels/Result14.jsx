import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const FinalResult14 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showStarPopup, setShowStarPopup] = useState(true);
  const [showWarningPopup, setShowWarningPopup] = useState(false);
  const [showCompletionPopup, setShowCompletionPopup] = useState(false);

  const [allResults, setAllResults] = useState({});

  // const isPathA = location.state?.isPathA;
  // const isPathB = location.state?.isPathB;
  // const isPathC = location.state?.isPathC;

  // const useDisplayPath = (isPathA, isPathB, isPathC) => {
  //   return React.useMemo(() => {
  //     if (isPathC) return pathC;
  //     if (isPathB) return pathB;
  //     if (isPathA) return pathA;
  //   }, [isPathA, isPathB, isPathC]);
  // };

  // const displayPath = useDisplayPath(isPathA, isPathB, isPathC);

   const levelTitles = {
    level1Result: "You have come across a patient of Snake bite",    
    level2Result: "Initial Management", 
    level3Result: "Various findings related to Snake bite considering one type of envenomation",
    level4Result: "Options available for management, Select from below options (Haemotoxic envenomation selected)",
    level6Result: "5 mins after starting AVS, patient develops Anaphylactoid reactions.",
    level7Result: "Persistent Neurological signs despite 10 vials of AVS. Options available for management (Neurotoxic Envenomation).",
    level10Result: "Not improving after 30 min.",
    level14Result: "No improvement at 1 hour."
  };

  const getCompletedPathsCount = () => {
    const pathData = JSON.parse(localStorage.getItem("path")) || {};
    return Object.values(pathData).filter(value => value === true).length;
  };

  const handlepopup = () => {
    setShowStarPopup(false);
  };

  useEffect(() => {
     const results = {
      level1Result: JSON.parse(localStorage.getItem("level1Result")),     
      level2Result: JSON.parse(localStorage.getItem("level2Result")),
      level3Result: JSON.parse(localStorage.getItem("level3TextResult")),
      level4Result: JSON.parse(localStorage.getItem("level4Result")),
      level6Result: JSON.parse(localStorage.getItem("level6Result")),
      level7Result: JSON.parse(localStorage.getItem("level7Result")),
      level10Result: JSON.parse(localStorage.getItem("level10Result")),
      level14Result: JSON.parse(localStorage.getItem("level14Result"))
    };


    console.log("Results from localStorage:", results);
    setAllResults(results);

    // Mark the current path as completed
    // const currentPath = isPathC ? "1-2-3-4-6-7-10-14-13" : isPathB ? "1-2-3-4-6-7-10-13" : "1-2-3-4-6-7-9-13";
    // console.log("current path in level 13:", currentPath);
    // const prevPath = JSON.parse(localStorage.getItem("path")) || {};
    // if (!prevPath[currentPath]) {
    //   prevPath[currentPath] = true;
    //   localStorage.setItem("path", JSON.stringify(prevPath));
    // }

    const currentPath = "1-2-3-4-6-7-10-14";
    const prevPath = JSON.parse(localStorage.getItem("path")) || {};
    if (!prevPath[currentPath]) {
      prevPath[currentPath] = true;
      localStorage.setItem("path", JSON.stringify(prevPath));
    }
  }, []);

  const handleHomeClick = () => {
    const completedPaths = getCompletedPathsCount();
    if (completedPaths === 8) {
      setShowCompletionPopup(true);
    } else {
      const pathData = localStorage.getItem("path");
      console.log("completed path: ",pathData);
      localStorage.clear();
      if (pathData !== null) {
        localStorage.setItem("path", pathData);
      }
      // Navigate to Level 2 with state to trigger the success popup
      const level2Result = JSON.parse(localStorage.getItem("level2Result")) || [];
      navigate("/level2", { 
        state: { 
          prev: "1-2", 
          triggerSuccess: true,
          ...level2Result.reduce((acc, text, index) => ({
            ...acc,
            [`selectedCards${index + 1}`]: { text }
          }), {})
        }
      });
    }
  };

  const handleExitClick = () => {
    const completedPaths = getCompletedPathsCount();
    if (completedPaths === 8) {
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
      "1-2-3-4-6-7-10-14-16": false
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
              You completed one path and achieved one star.
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
            <h2 className="text-2xl font-bold text-amber-800 mb-6">Final Results</h2>
            <p className="text-lg text-amber-600 mb-4 font-semibold">
              The options you selected since Level 1
            </p>
            <div className="w-full max-w-lg bg-amber-50/40 p-4 rounded-lg shadow-lg">
              {/* <ul>
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
              </ul> */}
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
          {/* {showWarningPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
                <h2 className="text-lg font-bold text-red-600 mb-4">
                  You'll lose all your stars you collected, if you press Exit now!
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
          )} */}
        </>
      )}
      {showCompletionPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
            <h2 className="text-lg font-bold text-amber-600 mb-4">
              Congratulations! You have collected all the 8 stars and successfully completed the game.
            </h2>
            <p className="text-gray-600 mb-4">
              Now you can exit or you can start over again.
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
                    "1-2-3-4-6-7-10-14-16": false
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

export default FinalResult14;
