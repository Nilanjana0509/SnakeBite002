import React, { useState, useEffect } from "react";
import CustomAlert from "./CustomAlert"; // Importing the CustomAlert component
import { useLocation, useNavigate } from "react-router-dom";
import { FaClock, FaStar, FaQuestionCircle } from "react-icons/fa";
import backgroundImage from "../assets/images/snake11.png";

const Level10 = ({ setCompletedLevels }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [deck, setDeck] = useState([]); // Deck of cards
  const [deckIndex, setDeckIndex] = useState(null); // Track the current deck index
  const [selectedCards1, setSelectedCards1] = useState({});
  const [selectedCards2, setSelectedCards2] = useState({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showWrongPopup, setShowWrongPopup] = useState(false);
  const [result, SetResult] = useState([]);
  const [starCount, setStarCount] = useState(0);

  const handleCompleteLevel10 = () => {
    const completedLevels = {
      level1: true,
      level2: true,
      level3: true,
      level4: true,
      level5: true,
      level6: true,
      level7: true,
      level8: true,
      level9: true,
      level10: true,
      level11: false,
    };
    localStorage.setItem("completedLevels", JSON.stringify(completedLevels));
    const array = [];
    array.push(selectedCards1.text);
    array.push(selectedCards2.text);
    console.log(array);
    localStorage.setItem("level10Result", JSON.stringify(array));
    setCompletedLevels(completedLevels);
  };

  useEffect(() => {
    // Only redirect to /level1 if no valid previous state and not on level10
    if (!location.state?.prev && location.pathname !== "/level10") {
      alert("You are not allowed to access Level 10!");
      navigate("/level1");
      return;
    }

    // Save the current level path to localStorage only if not from popup
    if (!location.state?.fromPopup) {
      localStorage.setItem('currentLevel', location.pathname);
    }
  }, [location, navigate]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("path")) || {};
    const trueCount = Object.values(data).filter(value => value === true).length;
    setStarCount(trueCount);
  }, []);

  const initialDeck = [
    { id: 1, text: "AN maintenance dose" },
    { id: 2, text: "Wait for another 30 min for improvement" },
    { id: 3, text: "AN loading dose" },
    { id: 4, text: "Wait for 1 hour" },
    { id: 5, text: "Transfer to referral hospital" },
    { id: 6, text: "Ventilator Support" },
  ];

  const correctSequence = [
    { id: 3, text: "AN loading dose" },
    { id: 2, text: "Wait for another 30 min for improvement" },
  ];

  useEffect(() => {
    const shuffledDeck = shuffle(initialDeck);
    setDeck(shuffledDeck);
  }, []);

  useEffect(() => {
    if (selectedCards1.text !== undefined && selectedCards2.text !== undefined) {
      res();
    }
  }, [selectedCards1, selectedCards2]);

  const shuffle = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const selectCard = (card, boxSetter) => {
    if (!card || !card.text) return;
    boxSetter(card);
    const newDeck = deck.filter((c) => c.id !== card.id);
    setDeck(newDeck);
    if (newDeck.length > 0) {
      setDeckIndex(0);
    } else {
      setDeckIndex(null);
    }
  };

  const res = () => {
    const selectedCards = [selectedCards1.text, selectedCards2.text];
    const correctCards = correctSequence.map((card) => card.text);
    const isCorrect = selectedCards.every((selectedCard) =>
      correctCards.includes(selectedCard)
    );
    if (isCorrect) {
      console.log("correct");
      setShowSuccessPopup(true);
      localStorage.setItem("level10Result", JSON.stringify(selectedCards));
    } else {
      console.log("incorrect");
      setShowWrongPopup(true);
    }
  };

  const handleBoxClick = () => {
    if (selectedCards1 && selectedCards2) {
      const userSequence = [selectedCards1, selectedCards2];
      const correctSequenceIds = correctSequence.map((card) => card.id);
      const userSequenceIds = userSequence.map((card) => card.id);
      if (userSequenceIds.join(",") === correctSequenceIds.join(",")) {
        setShowSuccessPopup(true);
      } else {
        setShowWrongPopup(true);
      }
    }
  };

  const handleSuccessClose = (nextLevel) => {
    setShowSuccessPopup(false);
    handleCompleteLevel10();
    const completedLevels = JSON.parse(localStorage.getItem("completedLevels")) || {};
    completedLevels.level10 = true;
    localStorage.setItem("completedLevels", JSON.stringify(completedLevels));
    setCompletedLevels(completedLevels);
    // Use a flag to indicate popup navigation and clear currentLevel if from popup
    localStorage.removeItem('currentLevel'); // Clear to prevent override
    navigate(nextLevel, { state: { prev: location.state?.prev + '-' + 10, fromPopup: true } });
  };

  const resetGame = () => {
    setSelectedCards1({});
    setSelectedCards2({});
    setDeck(initialDeck);
    setDeckIndex(0);
  };

  const res1 = (card) => {
    console.log(card);
    setSelectedCards1({});
    let newSelectedCards = [];
    const newCards = [...deck, card];
    setDeck(newCards);
  };

  return (
    <div
      className="p-4 sm:p-6 flex flex-col items-center relative w-full h-full overflow-auto"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover" }}
    >
      <div className="absolute top-4 left-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <FaStar className="text-yellow-500 text-xl sm:text-2xl" />
          <span className="text-slate-50 text-sm sm:text-base">{starCount}</span>
        </div>
      </div>

      <div className="absolute top-4 right-4 flex items-center gap-4">
        <div className="flex items-center gap-2 cursor-pointer">
          <FaQuestionCircle className="text-slate-50 text-xl sm:text-2xl" />
          <span className="text-slate-50 text-sm sm:text-base">Help</span>
        </div>
      </div>
      <div className="flex items-center justify-between w-full my-6">
        <h2 className="text-2xl font-bold text-slate-50 mx-auto mr-50 mb-6">
          Not improving after 30 min:
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-x-4 gap-y-4 mb-20 items-center mx-auto">
        {deck.map((card) => (
          <div
            key={card.id}
            className="border w-40 h-24 border-blue-500 p-4 bg-gray-100 rounded-lg text-center cursor-pointer hover:bg-gray-200" // Reduced from w-48 h-32 to w-40 h-24
            onClick={() => {
              if (!selectedCards1.text) {
                selectCard(card, setSelectedCards1);
              }
              else if (!selectedCards2.text) {
                selectCard(card, setSelectedCards2);
              }
              else {
                console.log("Both selections are filled.");
              }
            }}
          >
            <p>{card.text}</p>
          </div>
        ))}
      </div>

      <div className="text-xl w-full h-30">
        <div>
          <h2 className="text-slate-50 text-center text-lg font-bold">
            Select Correct options
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mt-4">
          <div
            className="border-2 border-blue-400 w-40 h-24 flex items-center justify-center bg-gray-100 rounded-lg shadow-md text-gray-700 transition-transform transform hover:scale-105" // Reduced from w-60 h-32 to w-40 h-24
            onClick={() => res1(selectedCards1)}
          >
            <p className="text-md text-center">{selectedCards1.text}</p>
          </div>
          <div
            className="border-2 border-blue-400 w-40 h-24 flex items-center justify-center bg-gray-100 rounded-lg shadow-md text-gray-700 transition-transform transform hover:scale-105" // Reduced from w-60 h-32 to w-40 h-24
          >
            <p className="text-md text-center">{selectedCards2.text}</p>
          </div>
        </div>
      </div>

      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
            <h2 className="text-2xl font-bold text-amber-600 mb-4">
              You have made correct choice
            </h2>
            <button
              className="mt-4 bg-amber-950 text-white px-4 py-2 rounded-md "
              onClick={() => handleSuccessClose("/level13")}
            >
              Situation 1: Improvement seen after 1 hour
            </button>
            <button
              className="mt-4 bg-amber-950 text-white px-4 py-2 rounded-md "
              onClick={() => handleSuccessClose("/level14")}
            >
              Situation 2: No improvement seen after 1 hour
            </button>
          </div>
        </div>
      )}

      {showWrongPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
            <h2 className="text-2xl font-bold text-red-400 mb-4">
              Your choices are incorrect
            </h2>
            <button
              className="bg-red-400 text-white px-4 py-2 rounded-md"
              onClick={() => {
                setShowWrongPopup(false);
                resetGame();
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Level10;
